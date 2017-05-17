const dummyHttpServer = require("../dummyHttpServer.js");

describe("HTTP keywords", function() {
  return it("should send get, post and delete requests", function() {
    return testx.run("test/scripts/test.testx");
  });
});
