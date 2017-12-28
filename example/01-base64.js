const base2pn = require('../index.js')

let data = 'Man is distinguished, not only by his reason, but by this singular passion from \
other animals, which is a lust of the mind, that by a perseverance of delight \
in the continued and indefatigable generation of knowledge, exceeds the short \
vehemence of any carnal pleasure.'

let encoded = null
let decoded = null

const b64 = base2pn(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''),
  '='
)

console.log('Encoding')
console.log(data)
console.log('')
encoded = b64.encode(data)

console.log('Result')
console.log(encoded)
console.log('')

console.log('Decoding')
console.log(encoded)
console.log('')
decoded = b64.decode(encoded)

console.log('Result')
console.log(decoded)
console.log('')

