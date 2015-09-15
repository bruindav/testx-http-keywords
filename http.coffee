q = require 'q'
request = require 'request'

module.exports =
  get: (url) ->
    deferred = q.defer()
    fullUrl = browser.baseUrl + url
    request fullUrl, (error, response, body) ->
      deferred.reject error if error
      deferred.resolve response.statusCode
    deferred.promise
