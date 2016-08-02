runner = require 'testx'

describe 'HTTP keywords', ->
  it 'should send get and post requests', ->
    runner.runExcelSheet 'test/xls/test.xlsx', 'Sheet1'
