import axios from 'axios'
import * as cheerio from 'cheerio'

axios
  .get('https://lol.fandom.com/wiki/Special:CargoTables')
  .then(({ data }) => {
    const $ = cheerio.load(data)

    const cargoTableList = $('#mw-content-text > ul').children().toArray()
    const cargoTableNames = cargoTableList.map((tableElem) => {
      if (tableElem.type === 'tag') {
        const firstChild = tableElem.firstChild
        if (firstChild?.type === 'text') {
          return firstChild.data?.split(' ')[0]
        }
      }
    })

    console.log(cargoTableNames.map((name) => `'${name}'`).join('|'))
  })
  .catch((err) => {
    console.log(err)
  })
