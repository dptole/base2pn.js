Base2<sup>n</sup>
=================

Base2pn.js provides a customizable base 2, 4, 8, [16](https://en.wikipedia.org/wiki/Base16), [32](https://en.wikipedia.org/wiki/Base32), [64](https://en.wikipedia.org/wiki/Base64) and 128 encoding/decoding in just one file.

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
