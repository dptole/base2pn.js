
const assert = require('assert')
    , base2pn = require('../index.js')
    , should = require('should')
    , base2pn_instances_arguments = []

for(let i = 1; i < 8; i++) {
  const j_max = Math.pow(2, i)
      , table = []
  let padding = ''

  for(var j = 1; j <= j_max; j++)
    table.push(String.fromCharCode(j))
  padding = String.fromCharCode(j)

  base2pn_instances_arguments.push({
    table: table,
    padding: padding
  })
}

describe('Base2pn instance', () => {
  base2pn_instances_arguments.forEach(base2pn_instance_argument => {
    const data = Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36)
    let encoded = null
    let decoded = null
    let instance = null

    describe('table size: ' + base2pn_instance_argument.table.length, () => {
      it('#should not throw when instantiating', () => {
        should.doesNotThrow(() =>
          instance = base2pn(
            base2pn_instance_argument.table,
            base2pn_instance_argument.padding
          )
        )
      })

      it('#should have "encode" as a function', () => {
        instance.encode.should.be.a.Function()
      })

      it('#should have "decode" as a function', () => {
        instance.decode.should.be.a.Function()
      })

      it('#should encode: "' + data + '"', () => {
        should.doesNotThrow(() =>
          encoded = instance.encode(data)
        )
      })

      it('#should decode', () => {
        should.doesNotThrow(() =>
          decoded = instance.decode(encoded)
        )
      })

      it('#should "decoded" be equal "data"', () => {
        data.should.be.eql(decoded)
      })
    })
  })
})
