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
testx.addKeywords(require('testx-http-keywords'))
```

## Keywords

| Keyword                | Argument name | Argument value  | Description | Supports repeating arguments |
| ---------------------- | ------------- | --------------- |------------ | ---------------------------- |
| send http get request     |               |                 | send a http get request and check if the response status code is 200 |  |
|                        | url           | relative url to which the request will be sent || No |
|                        | expected status code   | expected status code of the response, the test will fail if the actual status code is different; defaults to 200 || No |
