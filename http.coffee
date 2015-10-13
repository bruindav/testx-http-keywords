q = require 'q'
request = require 'request'

send = (method) -> (url, payload) ->
  fullUrl = if browser?.baseUrl then browser.baseUrl + url else url
  options =
    method: method
    url: fullUrl
  if payload then options.json = JSON.parse payload
  console.log "make http request with options", options
  deferred = q.defer()
  request options, (error, response, body) ->
    deferred.reject error if error
    deferred.resolve response.statusCode
  deferred.promise

module.exports =
  get: send "GET"
  post: send "POST"
