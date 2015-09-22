http = require './http'

module.exports =
  'send http get request': (args) ->
    expect(http.get args.url).toEqual args['expected status code'] || 200
