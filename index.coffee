http = require './http'
JSONPath = require 'jsonpath-plus'
_ = require 'underscore'
parseHeaders = require 'parse-key-value'

namedParams = [
  'url'
  'json'
  'headers'
  'expected status code'
  'expected response'
  'expected response regex'
  'expected headers'
]

stringifyAll = (values) ->
  String(v) for v in values

send = (method) -> (args) ->
  (http[method] args.url, args.json, args.headers).then (response) ->
    jsonPathParams = _.omit args, namedParams
    protractor.promise.controlFlow().execute -> #this is needed to execute multiple expects
      expect(response.statusCode).toEqual(parseInt(args['expected status code']) or 200)
      if args['expected response']
        expect(response.body).toEqual args['expected response']
      if args['expected response regex']
        expect(response.body).toMatch args['expected response regex']
      if args['expected headers']
        expectedHeaders = parseHeaders args['expected headers']
        for expHeaderName, expHeaderValue of expectedHeaders
          expect(response.headers[expHeaderName]).toMatch expHeaderValue, "Expected response header '#{expHeaderName}' to match '#{expHeaderValue}', but it was '#{response.headers[expHeaderName]}'"
      if Object.keys(jsonPathParams)?.length
        try
          parsedBody = if typeof response.body is 'object'
            response.body
          else
            JSON.parse response.body

          for path, expected of jsonPathParams
            values = JSONPath
              path: path
              json: parsedBody
            expect(stringifyAll values).toContain expected
        catch ex
          if ex instanceof SyntaxError
            throw new Error """
                It seems, that you are trying to use JSONPath on a non-json response.
                The response I received was:

                #{response.body}
              """
          else
            throw ex

module.exports =
  'send http get request': send 'get'
  'send http post request': send 'post'
