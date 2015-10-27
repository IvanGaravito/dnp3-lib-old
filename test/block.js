var assert = require('assert')

describe('Block', function () {
  var Block

  before(function () {
    Block = require('../lib/Block')
  })

  it('should have dataSize equal to initial size', function () {
    var block

    block = new Block(8)
    assert(block.dataSize === 8)
  })

  it('should have buffer size equal to dataSize + 2', function () {
    var block

    block = new Block(16)
    assert(block._data.length === 18)
  })

  it('should reject data with wrong size', function () {
    var block

    block = new Block(8)
    assert.equal(block.data('056405C0FD02BC028B4F'), Block.Error.WrongDataSize)
  })

  it('should accept data with dataSize length', function () {
    var block

    block = new Block(8)
    assert(block.data('056405C0FD02BC02'))
  })

  it('should accept data and generate correct CRC', function () {
    var block

    block = new Block(8)
    block.data('056405C0FD02BC02')
    assert.equal(block.crc().toString(16).toUpperCase(), '4F8B')
  })

  it('should return data when calling .data without arguments', function () {
    var block

    block = new Block(8)
    block.data('056405C0FD02BC02')
    assert.equal(block.data().toString('hex').toUpperCase(), '056405C0FD02BC02')
  })

  it('should reject load raw data not equal to dataSize + 2', function () {
    var block

    block = new Block(8)
    assert.equal(block.load('056405C0FD02BC02'), Block.Error.WrongBlockSize)
  })

  it('should load raw data and check CRC is correct', function () {
    var block

    block = new Block(8)
    assert(block.load('056405C0FD02BC028B4F'))
  })

  it('should load raw data and check CRC is incorrect', function () {
    var block

    block = new Block(8)
    assert.equal(block.load('056405C0000001008B4F'), false)
  })
})
