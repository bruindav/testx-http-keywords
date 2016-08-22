q = require 'q'
request = require 'request'
parseHeaders = require 'parse-key-value'

isFullUrl = (str) ->
  str.match /^https?:\/\//i

send = (method) -> (url, payload, headers) ->
  fullUrl = if isFullUrl(url)
    url
  else if browser?.baseUrl
    browser.baseUrl + url
  else url
  options =
    method: method
    url: fullUrl
  if payload then options.json = JSON.parse payload
  if headers then options.headers = parseHeaders headers
  deferred = q.defer()
  request options, (error, response, body) ->
    deferred.reject error if error
    deferred.resolve
      statusCode: response.statusCode
      body: body
      headers: response.headers
  deferred.promise

module.exports =
  get: send "GET"
  post: send "POST"
