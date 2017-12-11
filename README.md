# NAME
`file-find` - Recursively chdir through directories and invokes a function once
per file

# SYNOPSIS
```js
const { find } = require('file-find');

find((file) => {
  console.log('Found this file:', file);
}, './some-dir');
```

# DESCRIPTION
Recursively changes directories starting at the provided directoy. Upon entering
a directory the contents are listed and the callback provided to `find` is
called once per file with the name of the file as the only argument.
