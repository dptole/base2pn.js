
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

describe('Base2pn class', () => {
  it('#is a function', () => {
    base2pn.should.be.a.Function()
  })

  base2pn_instances_arguments.forEach(base2pn_instance_argument =>
    describe('#base2pn instantiation (table, padding)/table length: ' + base2pn_instance_argument.table.length, () => {
      it('#argument "table" should be an array whose length is a power of 2', () => {
        base2pn_instance_argument.table.should.be.an.Array()

        Number.isInteger(
          Math.log2(base2pn_instance_argument.table.length)
        ).should.be.eql(true)
      })

      it('#argument "padding" should be a string and not be an item of "table"', () => {
        base2pn_instance_argument.padding.should.be.a.String()
        base2pn_instance_argument.table.indexOf(base2pn_instance_argument.padding).should.be.eql(-1)
      })
    })
  )
})
