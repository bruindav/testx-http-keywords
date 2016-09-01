runner = require 'testx'
dummyHttpServer = require '../dummyHttpServer.js'

describe 'HTTP keywords', ->
  it 'should send get, post and delete requests', ->
    runner.runExcelSheet 'test/xls/test.xlsx', 'Sheet1'
