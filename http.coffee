q = require 'q'
request = require 'request'

send = (method) -> (url, payload) ->
  options =
    method: method
    url: url
  if payload then options.json = JSON.parse payload
  console.log 'options', options
  deferred = q.defer()
  fullUrl = browser?.baseUrl + url
  request.post options, (error, response, body) ->
    deferred.reject error if error
    deferred.resolve response.statusCode
  deferred.promise

module.exports =
  get: send "GET"
  post: send "POST"
