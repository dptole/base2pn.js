Base2<sup>n</sup>
=================

  [![Build status][circle-ci-badge]][circle-ci]
  [![Issue status][gh-issues-badge]][gh-issues]
  [![NPM Version][npm-module-version-badge]][npm-module]
  [![Downloads][npm-downloads-total-badge]][npm-module]
  [![Say thanks][saythanks-badge]][saythanks-to]

Base2pn.js provides a customizable base 2, 4, 8, [16][base16-url], [32][base32-url], [64][base64-url] and 128 encoding/decoding in just one file.

Backend
=======

```
$ npm i base2pn.js
$ node
> const Base2pn = require('@dptole/base2pn.js')
// It works the same as the frontend example.
```

Frontend
========

```html
<script src="base2pn.js"></script>
<script>
var table = [
      "q", "a", "z", "w", "s", "x", "e", "d", "c", "r", "f", "v", "t", "g",
      "b", "y", "h", "n", "u", "j", "m", "k", "i", "o", "l", "p", "Q", "W",
      "E", "D", "S", "F", "A", "C", "Z", "X", "V", "G", "R", "T", "H", "B",
      "N", "J", "Y", "U", "K", "M", "L", "I", "O", "P", "0", "9", "8", "7",
      "6", "5", "4", "3", "2", "1", "!", "="
    ]
  , padding = "-"
  , custom_base64 = new Base2pn(table, padding)
  , message = "Custom base 2, 4, 8, 16, 32, 64 and 128 encoding/decoding in just one file"
  
    // "h7kPDe1UcerCE8mAtZLAgzLAbzLAtjlYcwtOvzq8gzaCWRhAtjc6cekKl81VQi5Tv8nGl81VQi5TceGKceB9E7hAW85GcepBWem-"
  , encoded = custom_base64.encode(message)
  
    // "Custom base 2, 4, 8, 16, 32, 64 and 128 encoding/decoding in just one file"
  , decoded = custom_base64.decode(encoded)
;
</script>
```

License
=======

[MIT][LICENSE]

[circle-ci]: https://circleci.com/gh/dptole/base2pn.js
[circle-ci-badge]: https://img.shields.io/circleci/project/dptole/base2pn.js.svg
[gh-issues-badge]: https://img.shields.io/github/issues-raw/dptole/base2pn.js.svg
[gh-issues]: https://github.com/dptole/base2pn.js/issues
[npm-module-version-badge]: https://img.shields.io/npm/v/@dptole/base2pn.js.svg
[npm-module]: https://www.npmjs.org/package/@dptole/base2pn.js
[npm-downloads-total-badge]: https://img.shields.io/npm/dt/@dptole/base2pn.js.svg
[saythanks-badge]: https://img.shields.io/badge/say%20thanks-%E3%83%84-44cc11.svg
[saythanks-to]: https://saythanks.io/to/dptole
[base16-url]: https://en.wikipedia.org/wiki/Base16
[base32-url]: https://en.wikipedia.org/wiki/Base32
[base64-url]: https://en.wikipedia.org/wiki/Base64
[LICENSE]: LICENSE
