const fs = require('fs')
const path = require('path')
const njk = require('nunjucks')
const prettier = require('prettier')

const { PascalCase } = require('./filters')

const tables = require('../leaguepedia/tables')
const prettierrc = require('../../.prettierrc')

const srcPath = path.join(__dirname, '../../src')
const TEMPLATES_DIR = path.join(srcPath, 'generator/templates')
const RIOT_DIR = path.join(srcPath, 'riot')
const LEAGUEPEDIA_DIR = path.join(srcPath, 'leaguepedia')

const env = njk.configure(TEMPLATES_DIR, { trimBlocks: true })
env.addFilter('PascalCase', PascalCase)

/**
 * Render a nunjucks template, format it, and write to disk
 */
function render(templatePath, data, outputPath) {
  let output = env.render(templatePath, data)
  output = prettier.format(output, prettierrc)
  fs.writeFileSync(outputPath, output)
}

function renderRootIndex() {
  const rootIndexPath = path.join(srcPath, 'index.js')

  const venders = []
  const files = fs.readdirSync(srcPath)
  for (const file of files) {
    const filePath = path.join(srcPath, file)
    if (fs.statSync(filePath).isDirectory() && file !== 'generator') {
      venders.push(file)
    }
  }
  render('index.njk', { venders }, rootIndexPath)
}

function ignoreConfiguration(files) {
  return files.filter((file) => file !== 'config.js')
}

function renderRiotIndex() {
  const riotApisPath = path.join(RIOT_DIR, 'apis')
  const riotIndexPath = path.join(RIOT_DIR, 'index.js')

  const riotApis = []
  const apiFiles = ignoreConfiguration(fs.readdirSync(riotApisPath))
  for (const file of apiFiles) {
    const basename = path.basename(file, '.js')
    riotApis.push(basename)
  }
  render('riot.index.njk', { apis: riotApis }, riotIndexPath)
}

function renderLeaguePediaIndex() {
  const leaguepediaIndexPath = path.join(LEAGUEPEDIA_DIR, 'index.js')

  render('leaguepedia.index.njk', { tables }, leaguepediaIndexPath)
}

function main() {
  renderRootIndex()
  renderRiotIndex()
  renderLeaguePediaIndex()
}

if (require.main === module) {
  main()
}
