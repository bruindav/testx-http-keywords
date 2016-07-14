q = require 'q'
request = require 'request'

send = (method) -> (url, payload) ->
  fullUrl = if browser?.baseUrl then browser.baseUrl + url else url
  options =
    method: method
    url: fullUrl
  if payload then options.json = JSON.parse payload
  deferred = q.defer()
  request options, (error, response, body) ->
    deferred.reject error if error
    deferred.resolve
      statusCode: response.statusCode
      body: body
  deferred.promise

module.exports =
  get: send "GET"
  post: send "POST"
