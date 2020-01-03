#!/bin/bash

cat <<EOF > .git/hooks/pre-commit 
eslint ./src ./test *.js && npm test
if [ \$? != 0 ]; then 
    exit 1
fi
EOF



chmod +x .git/hooks/pre-commit  

cat <<EOF > .git/hooks/pre-push  
eslint ./src ./test *.js && npm test
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-push  