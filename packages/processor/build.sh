#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

rm -rf dist

for target in processor generate; do
  echo "Building $target..."
  BUILD_TARGET="$target" pnpm tsdown
done

for version in ../generated/*/; do
  version=$(basename "$version")
  echo "Building $version..."
  BUILD_TARGET="$version" pnpm tsdown
done

echo "Build complete"
