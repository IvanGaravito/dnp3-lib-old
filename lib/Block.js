var crc = require('dnp3-crc')

var Block

Block = function (dataSize) {
  if (!(this instanceof Block)) {
    return new Block(dataSize)
  }

  this.dataSize = dataSize > 16 ? 16 : dataSize
  this._data = new Buffer(this.dataSize + 2, 'hex')
}

Block.Error = {
  WrongBlockSize: new Error('Block: Wrong block size'),
  WrongDataSize: new Error('Block: Wrong data size')
}

Block.isBlock = function (obj) {
  return obj instanceof Block
}

Block.prototype.check = function () {
  return crc.check(this._data)
}

Block.prototype.crc = function () {
  return this._data.readUInt16LE(this.dataSize)
}

Block.prototype.data = function (data) {
  if (data === undefined) {
    return this._data.slice(0, this.dataSize)
  }

  var _data

  _data = new Buffer(data, 'hex')
  if (_data.length !== this.dataSize) {
    return Block.Error.WrongDataSize
  }

  _data.copy(this._data)
  this._data.writeUInt16LE(crc.calculate(this._data.slice(0, this.dataSize)), this.dataSize)
  return true
}

Block.prototype.load = function (raw) {
  var _raw

  _raw = new Buffer(raw, 'hex')
  if (_raw.length !== (this.dataSize + 2)) {
    return Block.Error.WrongBlockSize
  }

  _raw.copy(this._data)
  return this.check()
}

module.exports = Block
