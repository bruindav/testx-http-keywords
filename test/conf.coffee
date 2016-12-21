exports.config =
  directConnect: true
  specs: ['spec/spec*']

  capabilities:
    browserName: 'chrome'
    shardTestFiles: false
    maxInstances: 5


  framework: 'jasmine'
  jasmineNodeOpts:
    silent: true
    defaultTimeoutInterval: 300000
    includeStackTrace: false

  baseUrl: 'http://elasticsearch.ivs-graylog.rws.ictu:9200/'
  rootElement: 'html'

  params:
    testx:
      logScript: false
      actionTimeout: 4000

  onPrepare: ->
    require 'testx'
    testx.keywords.add require('../')
    beforeEach -> browser.ignoreSynchronization = true
