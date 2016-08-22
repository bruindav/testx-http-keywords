testx-http-keywords
=====

A library that extends testx with keywords for sending basic http requests. This library is packaged as a npm package

## How does it work
From the directory of the art code install the package as follows:
```sh
npm install testx-http-keywords --save
```

After installing the package add the keywords to your protractor config file as follows:

```
testx.keywords.add(require('testx-http-keywords'))
```

## Keywords

| Keyword                | Argument name | Argument value  | Description | Supports repeating arguments |
| ---------------------- | ------------- | --------------- |------------ | ---------------------------- |
| send http get request  |               |                 | send a http GET request and check if the response status code is 200 |  |
|                        | url           | relative url to which the request will be sent || No |
|                        | headers       | custom http headers | Optional. Semicolon or new line-separated string of '='-separated key-value pairs. For example "User-Agent=testx;Something-Else='value with spaces'"| No |
|                        | expected status code   | expected status code of the response | Optional. The test will fail if the actual status code is different; defaults to 200| No |
|                        | expected response  | expected content of the response | Optional. The test will fail if the actual content (body) of the response is not equal. | No |
|                        | expected response regex | a regex to match against the response | Optional. The keyword will try to match the provided regular expression against the content (body) of the response and will fail if there is no match; currently it is not possible to provide regex matching options. | No |
|                        | expected headers | list of expected response headers | Optional. Same format as the *headers* parameter. The keyword will fail if not all of the expected response headers exist or if they have values different than the expected/specified ones. | No |
|                        | *json path* | *expected value at this json path* | Optional. The argument name should be the actual JSON path, i.e. "$.address.city". If more than one value is found using this JSON path the keyword will succeed if at least one of the values is equal to the expected (argument) value. Currently it is not possible to use the same JSON path more than once. | Yes |
| send http post request |               |                 | send a http POST request and check if the response status code is 200 |  |
|                        | url           | relative url to which the request will be sent || No |
|                        | json          | a valid JSON string that contains the body of the request | Optional. Defaults to an empty object | No |
|                        | headers       | custom headers | Optional. Semicolon or new line-separated string of '='-separated key-value pairs. For example "User-Agent=testx;Something-Else='value with spaces'"| No |
|                        | expected status code   | expected status code of the response | Optional. The test will fail if the actual status code is different; defaults to 200| No |
|                        | expected response  | expected content of the response | Optional. The test will fail if the actual content (body) of the response is not equal. | No |
|                        | expected response regex | a regex to match against the response | Optional. The keyword will try to match the provided regular expression against the content (body) of the response and will fail if there is no match; currently it is not possible to provide regex matching options. | No |
|                        | expected headers | list of expected response headers | Optional. Same format as the *headers* parameter. The keyword will fail if not all of the expected response headers exist or if they have values different than the expected/specified onesble to provide regex matching options. | No |
|                        | *json path* | *expected value at this json path* | Optional. The argument name should be the actual JSON path, i.e. "$.address.city". If more than one value is found using this JSON path the keyword will succeed if at least one of the values is equal to the expected (argument) value. Currently it is not possible to use the same JSON path more than once. | Yes |
