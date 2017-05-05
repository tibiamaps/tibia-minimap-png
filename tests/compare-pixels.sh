#!/usr/bin/env bash

# Navigate to the root of the repository.
cd "$(dirname "${BASH_SOURCE}")/..";

for file in tests/actual/*.png; do
	result=$(compare -metric AE "${file}" "${file/actual/fixtures}" /tmp/diff.png 2>&1);
	if [ "${result}" != '0' ]; then
		echo "${result} incorrect pixels in ${file}";
		exit 1;
	fi;
done;
