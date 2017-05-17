const dummyHttpServer = require("../dummyHttpServer.js");

describe("HTTP keywords", () => {
  return it("should send get, post and delete requests", () => {
    return testx.run("test/scripts/test.testx");
  });
});
