/* global before, describe, it */

var assert = require('assert')

describe('FT3', function () {
  var FT3

  before(function () {
    FT3 = require('../lib/FT3')
  })

  describe('#initialization', function () {
    it('should have empty block0 initially', function () {
      var ft3

      ft3 = new FT3()
      assert(ft3.block0 === null)
    })

    it('should have empty blocks initially', function () {
      var ft3

      ft3 = new FT3()
      assert(ft3.blocks.length === 0)
    })
  })

  describe('#load()', function () {
    it('should reject load raw data with length < 10 octets', function () {
      var ft3

      ft3 = new FT3()
      assert.equal(ft3.load('056405C0FD02BC028B'), FT3.Error.FrameTooSmall)
    })

    it('should load raw data "056405C0FD02BC028B4F"', function () {
      var ft3

      ft3 = new FT3()
      assert.equal(ft3.load('056405C0FD02BC028B4F'), true)
    })

    it('should have loaded only block0 for "056405C0FD02BC028B4F"', function () {
      var Block = require('../lib/Block')
      var ft3

      ft3 = new FT3()
      ft3.load('056405C0FD02BC028B4F')
      assert(Block.isBlock(ft3.block0) && ft3.blocks.length === 0)
    })
  })

  describe('#clear()', function () {
    it('should have emptied blocks after calling .clear()', function () {
      var ft3

      ft3 = new FT3()
      ft3.load('056405C0FD02BC028B4F')
      ft3.clear()
      assert(ft3.block0 === null && ft3.blocks.length === 0)
    })
  })
})
