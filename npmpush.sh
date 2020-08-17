#!/bin/bash

npm version patch
cp package.json dist/
cp README.md dist/
cp LICENSE.md dist/
cp CHANGELOG.md dist/
cd dist/
npm publish --access=public