var jade = require('jade')
  , fs = require('fs')

if (!fs.existsSync(__dirname + '/dist/dist.js')) {
  console.log('dist.js does not exist! Please check the output for build errors and try again.')
  process.exit(1)
}

var bookmarkletCode = fs.readFileSync(__dirname + '/dist/dist.js')
  , jadeCode = fs.readFileSync(__dirname + '/page.jade')
  , compiled = jade.compile(jadeCode)
  , html = compiled({ bookmarkletCode: bookmarkletCode })

fs.writeFileSync(__dirname + '/dist/dist.html', html)
console.log('finished building dist/dist.html')
