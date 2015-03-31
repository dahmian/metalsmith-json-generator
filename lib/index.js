
var basename = require('path').basename;
var clone = require('clone');
var dirname = require('path').dirname;
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to generate JSON files
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];
  var pattern = options.pattern || /\.html$/;

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if (file.search(pattern) === -1) {
        return
      }
      var data = files[file];
      var dir = dirname(file);
      var json = basename(file, extname(file)) + '.json';
      if ('.' != dir) json = dir + '/' + json;

      //var str = data.contents.toString();
      //data.contents = new Buffer(str);
      var output = clone(data);
      output.contents = data.contents.toString();
      delete output.mode;
      delete output.stats;

      files[json] = {contents: JSON.stringify(output)};
    });
  };
}
