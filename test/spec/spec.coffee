runner = require 'testx'
dummyHttpServer = require '../dummyHttpServer.js'

describe 'HTTP keywords', ->
  it 'should send get, post and delete requests', ->
    runner.run 'test/scripts/test.testx'
