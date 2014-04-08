
var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  chalk = require('chalk'),
  reporter = require(process.cwd() + '/src/reporters/default').reporter;

chai.use(require('sinon-chai'));

describe('default reporter', function () {

  var error;

  beforeEach(function () {
    error = {
      context: 'while parsing a block mapping',
      context_mark: {
        name: './test/fixtures/example.raml',
        line: 25,
        column: 14,
        buffer: '#%RAML 0.8\n\ntitle: World Music API\nbaseUri: http://example.api.com/{version}\nversion: v1\ntraits:\n  - paged:\n    queryParameters:\n      pages:\n        description: The number of pages to return\n        type: number\n  - secured: !include http://raml-example.com/secured.yml\n/songs:\n  is: [ paged, secured ]\n  get:\n    queryParameters:\n      genre:\n        description: filter the songs by genre\n  post:\n  /{songId}:\n    get:\n      responses:\n        200:\n          body:\n            application/json:\n              schema: |\n                { "$schema": "http://json-schema.org/schema",\n                  "type": "object",\n                  "description": "A canonical song",\n                  "properties": {\n                   "title":  { "type": "string" },\n                   "artist": { "type": "string" }\n                },\n                "required": [ "title", "artist" ]\n              }\n            application/xml:\n  delete:\n    description: |\n      This method will *delete* an **individual song**\u0000',
        pointer: 513
      },
      message: 'expected <block end>, but found }',
      problem_mark: {
        name: './test/fixtures/example.raml',
        line: 34,
        column: 14,
        buffer: '#%RAML 0.8\n\ntitle: World Music API\nbaseUri: http://example.api.com/{version}\nversion: v1\ntraits:\n  - paged:\n    queryParameters:\n      pages:\n        description: The number of pages to return\n        type: number\n  - secured: !include http://raml-example.com/secured.yml\n/songs:\n  is: [ paged, secured ]\n  get:\n    queryParameters:\n      genre:\n        description: filter the songs by genre\n  post:\n  /{songId}:\n    get:\n      responses:\n        200:\n          body:\n            application/json:\n              schema: |\n                { "$schema": "http://json-schema.org/schema",\n                  "type": "object",\n                  "description": "A canonical song",\n                  "properties": {\n                   "title":  { "type": "string" },\n                   "artist": { "type": "string" }\n                },\n                "required": [ "title", "artist" ]\n              }\n            application/xml:\n  delete:\n    description: |\n      This method will *delete* an **individual song**\u0000',
        pointer: 892
      },
      note: undefined
    };
  });

  it('reports the error correctly', function () {
    sinon.stub(console, 'log');
    reporter(error);
    var expected = '\n'+
      '\u001b[4m.' + '/test/fixtures/example.raml' +
      '\u001b[24m' +
      '\n' +
      '\u001b[33m' + 'Error while parsing a block mapping. line: 25, col: 14' +
      '\u001b[39m' +
      '\n' +
      '  \u001b[90m' + 'line 34' +
      '\u001b[39m  \u001b[90m' + 'col 14' +
      '\u001b[39m  \u001b[34m' + 'expected <block end>, but found }' +
      '\u001b[39m' +
      '\n';
    expect(console.log).calledWith(expected);
    console.log.restore();
  });

  it('reports the error correctly when context_mark is null', function () {
    sinon.stub(console, 'log');
    error.context_mark = null;
    reporter(error);
    var expected = '\n'+
      '\u001b[4m.' + '/test/fixtures/example.raml' +
      '\u001b[24m' +
      '\n' +
      '\u001b[33m' + 'Error while parsing a block mapping.' +
      '\u001b[39m' +
      '\n' +
      '  \u001b[90m' + 'line 34' +
      '\u001b[39m  \u001b[90m' + 'col 14' +
      '\u001b[39m  \u001b[34m' + 'expected <block end>, but found }' +
      '\u001b[39m' +
      '\n';
    expect(console.log).calledWith(expected);
    console.log.restore();
  });

});