http = require '../http'
assert = require 'assert'

http[op]('http://localhost:1337', '{"name":"test"}').then(console.log) for op in ['get', 'post']
