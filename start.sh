#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

required_major=20
required_minor=9
local_node_dir="./.node20"
local_node_bin="$local_node_dir/bin/node"
NODE_VERSION="20.20.2"

version_major() {
  local v="$1"
  v="${v#v}"
  printf '%s' "${v%%.*}"
}

version_minor() {
  local v="$1"
  v="${v#v}"
  v="${v#*.}"
  printf '%s' "${v%%.*}"
}

is_supported_node() {
  local v="$1"
  [[ -n "$v" ]] || return 1
  local major minor
  major="$(version_major "$v")"
  minor="$(version_minor "$v")"
  [[ "$major" =~ ^[0-9]+$ ]] || return 1
  [[ "$minor" =~ ^[0-9]+$ ]] || return 1
  if (( major > required_major )); then
    return 0
  fi
  if (( major == required_major && minor >= required_minor )); then
    return 0
  fi
  return 1
}

download_node() {
  if ! command -v tar >/dev/null 2>&1; then
    echo "Error: tar is required to download Node." >&2
    return 1
  fi
  if command -v curl >/dev/null 2>&1; then
    downloader="curl -fsSL"
  elif command -v wget >/dev/null 2>&1; then
    downloader="wget -qO-"
  else
    echo "Error: curl or wget is required to download Node." >&2
    return 1
  fi

  os_type="$(uname -s)"
  arch="$(uname -m)"
  case "$os_type" in
    Linux) platform="linux" ;;
    Darwin) platform="darwin" ;;
    *) echo "Unsupported OS: $os_type" >&2; return 1 ;;
  esac
  case "$arch" in
    x86_64|amd64) arch_name="x64" ;;
    aarch64|arm64) arch_name="arm64" ;;
    *) echo "Unsupported architecture: $arch" >&2; return 1 ;;
  esac

  tarball="node-v${NODE_VERSION}-${platform}-${arch_name}.tar.xz"
  url="https://nodejs.org/dist/v${NODE_VERSION}/${tarball}"

  echo "Downloading Node $NODE_VERSION for $platform/$arch_name..."
  rm -rf "$local_node_dir"
  mkdir -p "$local_node_dir"
  tempfile="$(mktemp)"
  if ! $downloader "$url" > "$tempfile"; then
    echo "Failed to download Node from $url" >&2
    rm -f "$tempfile"
    return 1
  fi
  tar -xJf "$tempfile" -C "$local_node_dir" --strip-components=1
  rm -f "$tempfile"
  chmod +x "$local_node_bin"
}

existing_local_node=""
if [[ -x "$local_node_bin" ]]; then
  existing_local_node="$($local_node_bin -v 2>/dev/null || true)"
  if is_supported_node "$existing_local_node"; then
    node_cmd="$local_node_bin"
  else
    echo "Existing local Node is outdated: ${existing_local_node:-unknown}. Refreshing $local_node_dir."
    rm -rf "$local_node_dir"
  fi
fi

if [[ -z "${node_cmd:-}" ]]; then
  system_node="$(node -v 2>/dev/null || true)"
  if is_supported_node "$system_node"; then
    node_cmd="$(command -v node)"
  else
    echo "System Node is too old or unavailable: ${system_node:-none}."
    download_node
    node_cmd="$local_node_bin"
  fi
fi

export PATH="$(dirname "$node_cmd"):$PATH"

echo "Using Node: $($node_cmd -v)"

echo "Installing dependencies if needed..."
npm install

echo "Starting development server..."
npm run dev
