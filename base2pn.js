-function() {
  function Base2pn(table, padding) {
    Base2pn.validateConstructor.call(this, table, padding);

    this.bit_size = Base2pn.getBitSize(table);
    this.lowest_common_divisor = Base2pn.getLowestCommonDivisor(this.bit_size, Base2pn.OCTET_SIZE);
    this.padding = padding.valueOf();
    this.table = table;
    this.flipped_table = Base2pn.flipArrayAsObject(table);

    if(typeof(Object.defineProperties) === 'function')
      Object.defineProperties(this, {
        bit_size: { writable: false, configurable: false },
        lowest_common_divisor: { writable: false, configurable: false },
        padding: { writable: false, configurable: false },
        table: { writable: false, configurable: false },
        flipped_table: { writable: false, configurable: false }
      });
  }

  function escapeRegExp(a){return a.replace(/([.^()[{|+*?$\\-])/g,"\\$1")}
  function getBitSize(a){var b=a.length.toString(Base2pn.BINARY_BASE);return/^10+$/.test(b)?b.length-1:b.length}
  function isString(a){return a instanceof String||"string"==typeof a}
  function isNumber(a){return!isNaN(a)}
  function flipArrayAsObject(a){for(var b=0,c={},d=a.length;d>b;b++)c[a[b]]=b;return c}
  function getLowestCommonDivisor(a,b){if(!(Base2pn.isNumber(a)&&Base2pn.isNumber(b)&&a>0&&b>0))throw new Error("Both arguments must be integers greater than zero.");for(var c=a,d=b;a!=b;)a>b?b+=d:a+=c;return a}
  function validateConstructor(a,b){if(!(this instanceof Base2pn))throw new Error("Invalid constructor.");if(!(a instanceof Array&&a.length>0))throw new Error("Argument 1 must be a non-empty array.");var c=Math.log(a.length)/Math.LN2;if(c!==~~c)throw new Error("Argument 1 length must be a power of 2.");var x=1<<Base2pn.MAX_BASE;if(a.length>x)throw new Error("Argument 1 length cannot be higher than "+x+".");for(var d,e=0,f=a.join(""),g=a.length;g>e;e++){if(!Base2pn.isString(a[e])||1!==a[e].length)throw new Error("Argument 1 indexes must be a one-character string.");if(d=f.match(new RegExp(a[e].replace(/[.^$*+?()[{\\|]/,"\\$1"),"g")),d&&d.length>1)throw new Error("Argument 1 indexes must be unique.")}if(!Base2pn.isString(b)||1!==b.length)throw new Error("Argument 2 must be a one-character string.");if(~a.indexOf(b))throw new Error("Argument 2 cannot be contained within argument 1.");return!0}
  function validateDecode(a){return this instanceof Base2pn?Base2pn.isString(a)?new RegExp("[^"+Base2pn.escapeRegExp(this.table.join(""))+"]").test(a.replace(new RegExp(Base2pn.escapeRegExp(this.padding)+"*$"),""))||0!==a.length*this.bit_size%Base2pn.OCTET_SIZE?2:0:1:4}
  function validateEncode(a){if(!(this instanceof Base2pn))return 4;if(!Base2pn.isString(a))return 1;for(var b=0,c=a.length;c>b;b++)if(a.charCodeAt(b)>255)return 3;return 0}

  function decode(string) {
    var error_code = this.validateDecode(string);
    if(error_code > 0) throw new Error(Base2pn.error_messages[error_code - 1]);

    string = string.replace(new RegExp(Base2pn.escapeRegExp(this.padding) + '*$'), '');

    var max_bits_to_allocate = Base2pn.OCTET_SIZE;
    var allocated_byte = 0;
    var bit_block = this.bit_size;
    var allocated_bits = bit_block;
    var free_bits = Base2pn.OCTET_SIZE - bit_block;
    var result_string = [];
    var self = this;
    var buffer = string.split('').map(function(a) {
      return self.flipped_table[a];
    });

    while(buffer.length > 1) {
      allocated_byte = buffer.shift();

      if(allocated_bits + bit_block < max_bits_to_allocate)
        while(bit_block <= free_bits) {
          allocated_byte = (allocated_byte << bit_block) + buffer.shift();
          allocated_bits += bit_block;
          free_bits -= bit_block;
        }

      allocated_bits += allocated_bits === Base2pn.OCTET_SIZE ? 0 : bit_block;
      allocated_byte = (allocated_byte << free_bits) + (buffer[0] >> (bit_block - free_bits));
      result_string.push(allocated_byte);

      if(bit_block - free_bits === 0 && free_bits === bit_block) buffer.shift();
      allocated_bits = (allocated_bits % Base2pn.OCTET_SIZE) || bit_block;
      free_bits = (Base2pn.OCTET_SIZE - allocated_bits) || Base2pn.OCTET_SIZE;

      if(allocated_bits) buffer[0] &= (1 << allocated_bits) - 1;
    }

    return String.fromCharCode.apply(String, result_string);
  };

  function encode(string) {
    var error_code = this.validateEncode(string);
    if(error_code > 0) throw new Error(Base2pn.error_messages[error_code - 1]);

    var buffer = Array.prototype.map.call(string, function(a) {
          return String.prototype.charCodeAt.call(a);
        })
      , table = this.table
      , padding = this.padding
      , string_bit_length = string.length * Base2pn.OCTET_SIZE
      , table_bit_size = this.bit_size
    ;

    if(this.bit_size >= Base2pn.OCTET_SIZE)
      return buffer.map(function(v, i) {
        return string_bit_length > i * table_bit_size ? table[v] : padding;
      }).join('');

    var new_buffer = []
      , lcd_divided_by_bit_size = this.lowest_common_divisor / this.bit_size
      , shift_places = Base2pn.OCTET_SIZE - this.bit_size
      , offset = 0
      , bit_8_index_0 = 0
      , right_shift = 0
      , i = 0
    ;

    while(buffer.length) {
      offset = i++ % lcd_divided_by_bit_size;
      bit_8_index_0 = buffer.shift();
      right_shift = (shift_places * i % Base2pn.OCTET_SIZE) || Base2pn.OCTET_SIZE;

      if(!offset && Base2pn.OCTET_SIZE - this.bit_size > this.bit_size)
        buffer.unshift(bit_8_index_0 & ((1 << (offset ? right_shift : Base2pn.OCTET_SIZE - this.bit_size)) - 1));

      else if(offset + 1 === lcd_divided_by_bit_size)
        buffer.unshift(bit_8_index_0 & 255);

      else if(right_shift > this.bit_size)
        buffer.unshift(bit_8_index_0 & ((1 << right_shift) - 1));

      else if(typeof(buffer[0]) === 'number')
        buffer[0] += (bit_8_index_0 & ((1 << (offset ? right_shift : shift_places)) - 1)) << Base2pn.OCTET_SIZE;

      new_buffer.push(bit_8_index_0 >> right_shift);
    }

    var rest = (shift_places * (1 + offset)) % Base2pn.OCTET_SIZE;
    new_buffer.push((bit_8_index_0 & ((1 << rest) - 1)) << (this.bit_size - rest));

    while(((new_buffer.length * this.bit_size) % this.lowest_common_divisor) !== 0)
      new_buffer.push(0);

    return new_buffer.map(function(v, i) {
      return string_bit_length > i * table_bit_size ? table[v] : padding;
    }).join('');
  };

  Base2pn.prototype = {
    constructor: Base2pn,
    decode: decode, validateDecode: validateDecode,
    encode: encode, validateEncode: validateEncode
  };

  Base2pn.MAX_BASE = 7;
  Base2pn.OCTET_SIZE = 8;
  Base2pn.BINARY_BASE = 2;
  Base2pn.escapeRegExp = escapeRegExp;
  Base2pn.getBitSize = getBitSize;
  Base2pn.isString = isString;
  Base2pn.isNumber = isNumber;
  Base2pn.flipArrayAsObject = flipArrayAsObject;
  Base2pn.getLowestCommonDivisor = getLowestCommonDivisor;
  Base2pn.validateConstructor = validateConstructor;
  Base2pn.error_messages = [
    'The first argument must be a string.',
    'The string is not properly encoded.',
    'The string is not valid to be encoded.',
    'This function must be called from an instance of Base2pn.'
  ];

  if(typeof(Object.defineProperties) === 'function') {
    Object.defineProperties(Base2pn.prototype, {
      constructor: { writable: false, configurable: false },
      encode: { writable: false, configurable: false },
      validateEncode: { writable: false, configurable: false },
      decode: { writable: false, configurable: false },
      validateDecode: { writable: false, configurable: false }
    });

    Object.defineProperties(Base2pn, {
      OCTET_SIZE: { writable: false, configurable: false },
      BINARY_BASE: { writable: false, configurable: false },
      escapeRegExp: { writable: false, configurable: false },
      getBitSize: { writable: false, configurable: false },
      isString: { writable: false, configurable: false },
      isNumber: { writable: false, configurable: false },
      flipArrayAsObject: { writable: false, configurable: false },
      getLowestCommonDivisor: { writable: false, configurable: false },
      validateConstructor: { writable: false, configurable: false },
      error_messages: { writable: false, configurable: false }
    });
  }

  if(typeof(module) === 'object' && typeof(module.exports) === 'object') module.exports = Base2pn; else window.Base2pn = Base2pn;
}();
