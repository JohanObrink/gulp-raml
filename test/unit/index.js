/*jshint expr: true*/

var raml = require('../../src'),
  chai = require('chai'),
  expect = chai.expect,
  gutil = require('gulp-util'),
  path = require('path');

describe('gulp-raml', function() {

  var ramlExample;

  beforeEach(function () {
    ramlExample = [
      '#%RAML 0.8',
      '',
      'title: World Music API',
      'baseUri: http://example.api.com/{version}',
      'version: v1'
    ].join('\n');
  });

  describe('raml()', function() {
    it('file should pass through', function(done) {
      var a = 0;

      var fakeFile = new gutil.File({
        path: './test/fixtures/example.raml',
        cwd: './test/',
        base: './test/fixtures/',
        contents: new Buffer(ramlExample)
      });

      var stream = raml();
      stream.on('data', function(newFile){
        expect(newFile).to.exist;
        expect(newFile.path).to.exist;
        expect(newFile.relative).to.exist;
        expect(newFile.contents).to.exist;
        expect(newFile.path).to.equal('./test/fixtures/example.raml');
        expect(newFile.relative).to.equal('example.raml');
        ++a;
      });

      stream.once('end', function () {
        expect(a).to.equal(1);
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should parse two files', function(done) {
      var a = 0;

      var fakeFile = new gutil.File({
        path: './test/fixtures/example.raml',
        cwd: './test/',
        base: './test/fixtures/',
        contents: new Buffer(ramlExample)
      });

      var fakeFile2 = new gutil.File({
        path: './test/fixtures/example2.raml',
        cwd: './test/',
        base: './test/fixtures/',
        contents: new Buffer(ramlExample)
      });

      var stream = raml();
      stream.on('data', function(newFile){
        ++a;
      });

      stream.once('end', function () {
        expect(a).to.equal(2);
        done();
      });

      stream.write(fakeFile);
      stream.write(fakeFile2);
      stream.end();
    });

    it('should send success status', function(done) {
      var a = 0;

      var fakeFile = new gutil.File({
        path: './test/fixtures/example.raml',
        cwd: './test/',
        base: './test/fixtures/',
        contents: new Buffer(ramlExample)
      });

      var stream = raml();
      stream.on('data', function (newFile) {
        ++a;
        expect(newFile.raml.success).to.exist;
        expect(newFile.raml.success).to.be.true;
        expect(newFile.raml.data).to.exist;
        expect(newFile.raml.message).to.not.exist;
      });
      stream.once('end', function () {
        expect(a).to.equal(1);
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should send failure status', function(done) {
      var a = 0;

      var fakeFile = new gutil.File({
        path: './test/fixture/example.raml',
        cwd: './test/',
        base: './test/fixture/',
        contents: new Buffer('foo')
      });

      var stream = raml();
      stream.on('data', function (newFile) {
        ++a;
        expect(newFile.raml.success).to.exist;
        expect(newFile.raml.success).to.be.false;
        expect(newFile.raml.data).to.not.exist;
        expect(newFile.raml.message).to.exist;
      });
      stream.once('end', function () {
        expect(a).to.equal(1);
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

  });
});