runner = require 'testx'

describe 'Google search 1', ->
  it 'should display relevant results 11', ->
    runner.runExcelSheet 'test/xls/test.xlsx', 'Sheet1'
