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

  describe('raml.reporter(fail)', function(){
    it('should emit error on failure', function(done) {
      var fakeFile = new gutil.File({
        path: './test/fixture/file.js',
        cwd: './test/',
        base: './test/fixture/',
        contents: new Buffer('doe =')
      });

      var stream = raml();
      var failStream = raml.reporter('fail');
      stream.pipe(failStream);

      failStream.on('error', function (err) {
        expect(err).to.exist;
        expect(err.message.indexOf(fakeFile.relative)).to.not.equal(-1, 'should say which file');
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });
  });

  describe('raml.reporter()', function() {
    it('file should pass through', function(done) {
      var a = 0;

      var fakeFile = new gutil.File({
        path: './test/fixture/file.js',
        cwd: './test/',
        base: './test/fixture/',
        contents: new Buffer('wadup();')
      });

      var stream = raml.reporter();
      stream.on('data', function(newFile){
        expect(newFile).to.exist;
        expect(newFile.path).to.exist;
        expect(newFile.relative).to.exist;
        expect(newFile.contents).to.exist;
        expect(newFile.path).to.equal('./test/fixture/file.js');
        expect(newFile.relative).to.equal('file.js');
        ++a;
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