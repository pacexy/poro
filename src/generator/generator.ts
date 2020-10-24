import fs from 'fs'
import path from 'path'
import njk = require('nunjucks')
import prettier = require('prettier')

import { PascalCase } from './filters'

import tables from '../leaguepedia/tables'

const prettierrc = {
  singleQuote: true,
  semi: false,
  htmlWhitespaceSensitivity: 'ignore' as const,
  trailingComma: 'all' as const,
}

const srcPath = path.join(__dirname, '../../src')
const TEMPLATES_DIR = path.join(srcPath, 'generator/templates')
const RIOT_DIR = path.join(srcPath, 'riot')
const LEAGUEPEDIA_DIR = path.join(srcPath, 'leaguepedia')

const env = njk.configure(TEMPLATES_DIR, { trimBlocks: true })
env.addFilter('PascalCase', PascalCase)

/**
 * Render a nunjucks template, format it, and write to disk
 */
function render(templatePath: any, data: any, outputPath: any) {
  let output = env.render(templatePath, data)
  output = prettier.format(output, prettierrc)
  fs.writeFileSync(outputPath, output)
}

function ignoreConfiguration(files: any) {
  return files.filter((file: any) => file !== 'config.js')
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
  renderRiotIndex()
  renderLeaguePediaIndex()
}

if (require.main === module) {
  main()
}
