#!/bin/bash

# Script to update the Helm values.yaml image tag
# Usage: ./retag.sh <new-tag>

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VALUES_FILE="./helm/values.yaml"

# Check if tag argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <new-tag>"
    echo "Example: $0 v1.0.0"
    exit 1
fi

NEW_TAG="$1"

# Check if values.yaml exists
if [ ! -f "$VALUES_FILE" ]; then
    echo "Error: values.yaml not found at $VALUES_FILE"
    exit 1
fi

# Update the tag value using sed
# This matches the 'tag:' line under the image section
sed -i "s/^\(  tag:\s*\).*$/\1${NEW_TAG}/" "$VALUES_FILE"

echo "Successfully updated image tag to: $NEW_TAG"
echo "File updated: $VALUES_FILE"
