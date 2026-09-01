#!/bin/zsh

set -e

script_dir="${0:A:h}"
cd "$script_dir/future-museum"

if [[ ! -d node_modules ]]; then
  npm install
fi

echo "科技馆将在浏览器中打开：http://localhost:3000"
open "http://localhost:3000"
npm run dev -- --host 0.0.0.0
