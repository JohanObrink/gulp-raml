gulp-raml
=========
[![Build Status](https://travis-ci.org/JohanObrink/gulp-raml.svg?branch=master)](https://travis-ci.org/JohanObrink/gulp-raml)

A gulp plugin for parsing raml using [RAML Parser](https://github.com/raml-org/raml-js-parser)

*If you think you recognize the structure of the files, tests, code and README, it is because I used [gulp-jshint](https://github.com/spenceralger/gulp-jshint) as a template. All credit for this plug-in goes to [Spencer](https://github.com/spenceralger).*

##Install

    npm install gulp-raml

##Usage

```javascript
var raml = require('gulp-raml');
var gulp = require('gulp');

gulp.task('raml', function() {
  gulp.src('./raml/*.raml')
    .pipe(raml())
    .pipe(raml.reporter('default'));
});
```

##Results
Adds the following properties to the file object

```javascript
file.raml.success = true; // or false
file.raml.message = {}; // RAML Parser error
file.raml.data = {}; // Parsed RAML object
```

##Reporters

###Default
Will console.log pretty, pretty errors

###Fail
Do you want the task to fail when a RAML Parse error happens? gulp-raml includes a simple utility for this.

This example will log the errors using the default reporter, then fail if RAML Parse was not a success.

```javascript
stuff
  .pipe(raml())
  .pipe(raml.reporter('default'))
  .pipe(raml.reporter('fail'))
```

##LICENCE
The MIT License (MIT)

Copyright (c) 2014 Johan Öbrink

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
