var Block = require('./Block')

var FT3

FT3 = function () {
  if (!(this instanceof FT3)) {
    return new FT3()
  }

  this.block0 = null
  this.blocks = []
}

FT3.Error = {
  FrameTooSmall: new Error('FT3: Frame too small')
}

FT3.prototype.clear = function () {
  this.block0 = null
  this.blocks = []
}

FT3.prototype.load = function (raw) {
  var buffer

  this.clear()
  buffer = new Buffer(raw, 'hex')
  if (buffer.length < 10) {
    return FT3.Error.FrameTooSmall
  }

  this.block0 = new Block(8)
  buffer.copy(this.block0._data)
  if (buffer.length > 10) {
    var block, blocks, len, offset

    offset = 10
    len = buffer.length - offset
    blocks = (len / 18).toFixed(0)
    console.log('blocks', blocks)

    while (blocks--) {
      block = new Block(16)
      buffer.copy(block._data, 0, offset)
      this.blocks.push(block)
      offset += 18
    }

    if (offset < buffer.length) {
      block = new Block(buffer.length - offset - 2)
      buffer.copy(block._data, 0, offset)
      this.blocks.push(block)
    }
  }

  return true
}

module.exports = FT3
