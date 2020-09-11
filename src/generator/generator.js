const fs = require('fs')
const path = require('path')
const njk = require('nunjucks')
const prettier = require('prettier')

const { PascalCase } = require('./filters')
const prettierrc = require('../../.prettierrc.js')

const srcPath = path.join(__dirname, '../../src')
const TEMPLATES_DIR = path.join(srcPath, 'generator/templates')
const RIOT_DIR = path.join(srcPath, 'riot')

const env = njk.configure(TEMPLATES_DIR, { trimBlocks: true })
env.addFilter('PascalCase', PascalCase)

function render(templatePath, data, outputPath) {
  let output = env.render(templatePath, data)
  output = prettier.format(output, prettierrc)
  fs.writeFileSync(outputPath, output)
}

function main() {
  const riotApis = {}
  const riotApisPath = path.join(RIOT_DIR, 'apis')
  const riotIndexPath = path.join(RIOT_DIR, 'index.js')

  const files = fs.readdirSync(riotApisPath)
  for (const file of files) {
    const basename = path.basename(file, '.js')
    riotApis[basename] = {}
  }
  render('riot.index.njk', { apis: riotApis }, riotIndexPath)
}

if (require.main === module) {
  main()
}
