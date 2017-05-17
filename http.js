const request = require("request");
const parseHeaders = require("parse-key-value");

function isFullUrl(str) {
  return str.match(/^https?:\/\//i);
}

const send = method => {
  return options => {
    options.method = method;
    options.url = isFullUrl(options.url)
      ? options.url
      : (typeof browser !== "undefined" && browser !== null
          ? browser.baseUrl
          : void 0)
          ? browser.baseUrl + options.url
          : options.url;
    if (options.headers) {
      options.headers = parseHeaders(options.headers);
    }
    if (options.json) {
      options.json = JSON.parse(options.json);
    }
    return new Promise((resolve, reject) => {
      return request(options, (error, response, body) => {
        if (error) {
          reject(error);
        }
        return resolve({
          statusCode: response.statusCode,
          body: body,
          headers: response.headers
        });
      });
    });
  };
};

module.exports = {
  get: send("GET"),
  post: send("POST"),
  put: send("PUT"),
  delete: send("DELETE")
};
