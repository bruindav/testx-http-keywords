const http = require("./http");
const JSONPath = require("jsonpath-plus");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const _ = require("lodash");
const parseHeaders = require("parse-key-value");

const namedParams = [
  "url",
  "method",
  "json",
  "body",
  "headers",
  "expected status code",
  "expected response",
  "expected response regex",
  "expected headers",
  "expected missing json paths"
];

if ((base = String.prototype).startsWith == null) {
  base.startsWith = function(s) {
    return this.slice(0, s.length) === s;
  };
}

const isContentType = (contentTypeHeader, contentType) => {
  if (contentType === "xml") {
    return (
      contentTypeHeader.startsWith("application/xml") ||
      contentTypeHeader.startsWith("text/xml")
    );
  } else if (contentType === "json") {
    return contentTypeHeader.startsWith("application/json");
  } else {
    return contentTypeHeader.startsWith(contentType);
  }
};

const stringifyAll = values => {
  var i, len, results, v;
  results = [];
  for ((i = 0), (len = values.length); i < len; i++) {
    v = values[i];
    results.push(String(v));
  }
  return results;
};

const printable = (obj, delimiter) => {
  var k, v;
  if (delimiter == null) {
    delimiter = ", ";
  }
  return (function() {
    var results;
    results = [];
    for (k in obj) {
      v = obj[k];
      results.push(k + ": " + v);
    }
    return results;
  })().join(delimiter);
};

const assertFailedMsg = (msg, ctx) => {
  return msg + " at " + printable(_.pick(ctx._meta, "file", "sheet", "Row"));
};

const send = method => {
  return function(args, ctx) {
    var withParsedBody;
    withParsedBody = function(body, cb) {
      var ex, parsedBody;
      try {
        parsedBody = typeof body === "object" ? body : JSON.parse(body);
        return cb(parsedBody);
      } catch (_error) {
        ex = _error;
        if (ex instanceof SyntaxError) {
          throw new Error(
            "It seems, that you are trying to use JSONPath on a non-json response at " +
              printable(_.pick(ctx._meta, "file", "sheet", "Row")) +
              ".\nThe response I received was:\n\n" +
              body
          );
        } else {
          throw ex;
        }
      }
    };
    return protractor.promise.controlFlow().execute(() => {
      return http
        [method](_.pick(args, "url", "body", "json", "headers"))
        .then(response => {
          const pathParams = _.omit(args, namedParams);
          const expectedResponseStatus = parseInt(args["expected status code"]);
          const code = response.statusCode;
          if (method === "delete") {
            failMsg = assertFailedMsg(
              "Expected response status code to be 200, 202 or 204, but it was '" +
                response.statusCode +
                "'",
              ctx
            );
            expect(
              code === expectedResponseStatus ||
                code === 200 ||
                code === 202 ||
                code === 204
            ).toBeTruthy(failMsg);
          } else {
            expected = expectedResponseStatus || 200;
            failMsg = assertFailedMsg(
              "Expected response status code to be " +
                expected +
                ", but it was " +
                response.statusCode,
              ctx
            );
            expect(response.statusCode).toEqual(expected, failMsg);
          }
          if (args["expected response"]) {
            failMsg = assertFailedMsg(
              "Expected response body to equal '" +
                args["expected response"] +
                "', but it was '" +
                response.body +
                "'",
              ctx
            );
            expect(response.body).toEqual(args["expected response"], failMsg);
          }
          if (args["expected response regex"]) {
            failMsg = assertFailedMsg(
              "Expected response body to match '" +
                args["expected response"] +
                "', but it was '" +
                response.body +
                "'",
              ctx
            );
            expect(response.body).toMatch(
              args["expected response regex"],
              failMsg
            );
          }
          if (args["expected headers"]) {
            expectedHeaders = parseHeaders(args["expected headers"]);
            for (expHeaderName in expectedHeaders) {
              expHeaderValue = expectedHeaders[expHeaderName];
              failMsg = assertFailedMsg(
                "Expected response header '" +
                  expHeaderName +
                  "' to match '" +
                  expHeaderValue +
                  "', but it was '" +
                  response.headers[expHeaderName] +
                  "'",
                ctx
              );
              expect(response.headers[expHeaderName]).toMatch(
                expHeaderValue,
                failMsg
              );
            }
          }
          if ((missingPaths = args["expected missing json paths"])) {
            var actual, failMsg, i, len, path;
            withParsedBody(response.body, parsedBody => {
              for ((i = 0), (len = missingPaths.length); i < len; i++) {
                path = missingPaths[i];
                actual = JSONPath({
                  path: path,
                  json: parsedBody,
                  wrap: false
                });
                failMsg = assertFailedMsg(
                  "Expected that JSON path '" +
                    path +
                    "' does not exist in '" +
                    JSON.stringify(parsedBody) +
                    "'",
                  ctx
                );
                expect(actual).toBeUndefined(failMsg);
              }
            });
          }
          if ((ref1 = Object.keys(pathParams)) != null ? ref1.length : void 0) {
            switch (false) {
              case !isContentType(response.headers["content-type"], "json"):
                return withParsedBody(response.body, function(parsedBody) {
                  var actual, path, results, values;
                  results = [];
                  for (path in pathParams) {
                    expected = pathParams[path];
                    values = JSONPath({
                      path: path,
                      json: parsedBody
                    });
                    actual = stringifyAll(values);
                    failMsg = assertFailedMsg(
                      "Expected the value at JSON path '" +
                        path +
                        "' to contain '" +
                        expected +
                        "', but it was '" +
                        actual +
                        "'",
                      ctx
                    );
                    results.push(expect(actual).toContain(expected, failMsg));
                  }
                  return results;
                });
              case !isContentType(response.headers["content-type"], "xml"):
                results = [];
                for (path in pathParams) {
                  expected = pathParams[path];
                  doc = new dom().parseFromString(response.body);
                  actual = xpath.select(path, doc);
                  failMsg = assertFailedMsg(
                    "Expected the value at xpath '" +
                      path +
                      "' to equal '" +
                      expected +
                      "', but it was '" +
                      actual +
                      "'",
                    ctx
                  );
                  results.push(
                    expect(actual != null ? actual.toString() : void 0).toEqual(
                      expected,
                      failMsg
                    )
                  );
                }
                return results;
                break;
              default:
                throw new Error(
                  "Error occurred in " +
                    printable(_.pick(ctx._meta, "file", "sheet", "Row")) +
                    ".\n\nIt seems, that you are trying to use JSONPath or XPath on a response\nwith a Content-Type header '" +
                    response.headers["content-type"] +
                    "'.\nI only know how to deal with 'application/json', 'application/xml' or 'text/xml'\n\nThe response I received was:\n\n" +
                    response.body
                );
            }
          }
        });
    });
  };
};

module.exports = {
  "send http request": (args, ctx) => {
    var method, ref;
    method =
      ((ref = args.method) != null ? ref.toLowerCase() : void 0) || "get";
    return send(method)(args, ctx);
  },
  "send http get request": send("get"),
  "send http post request": send("post"),
  "send http delete request": send("delete"),
  "send http put request": send("put")
};
