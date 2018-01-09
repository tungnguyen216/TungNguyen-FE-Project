#!/bin/sh
echo 'Installing git hooks...'
cp -rp git-hooks/* .git/hooks/.
echo 'Git hooks installed!'
