http = require './http'
JSONPath = require 'jsonpath-plus'
_ = require 'underscore'

namedParams = [
  'url'
  'json'
  'expected status code'
]

stringifyAll = (values) ->
  String(v) for v in values

send = (method) -> (args) ->
  (http[method] args.url, args.json).then (response) ->
    protractor.promise.controlFlow().execute -> #this is needed to execute multiple expects
      expect(response.statusCode).toEqual(parseInt(args['expected status code']) or 200)
      parsedBody = if typeof response.body is 'object' then response.body else JSON.parse response.body
      for path, expected of _.omit args, namedParams
        values = JSONPath
          path: path
          json: parsedBody
        expect(stringifyAll values).toContain expected

module.exports =
  'send http get request': send 'get'
  'send http post request': send 'post'
