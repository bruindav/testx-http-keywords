http = require './http'

module.exports =
  'send http get request': (args) ->
    expect(http.get args.url).toEqual parseInt(args['expected status code']) || 200
  'send http post request': (args) ->
    expect(http.get args.url, args.json).toEqual parseInt(args['expected status code']) || 200
