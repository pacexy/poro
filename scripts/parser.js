/* eslint-env jquery, browser */

function removeRedundantSpace(str) {
  return str.trim().split(' ').filter(Boolean).join(' ')
}

function transformType(type) {
  return removeRedundantSpace(
    type
      .replace('int', 'number')
      .replace('long', 'number')
      .replace('double', 'number')
      .replace('String', 'string')
      .replace(/Set\[(\w+)\]/, '$1[]')
      .replace(/List\[(\w+)\]/, '$1[]')
      .replace(/Map\[(.+)\]/, 'Record<$1>'),
  )
}

function dtoToType(element) {
  try {
    const typeName = element.firstElementChild.textContent
    const typeDesc = removeRedundantSpace(
      element.firstElementChild.nextSibling.textContent,
    )

    const propertyNodes = Array.from($('table > tbody', element).children())
    const content = propertyNodes
      .map((propertyNode) =>
        Array.from(propertyNode.children).map((child) =>
          removeRedundantSpace(child.textContent),
        ),
      )
      .map(([name, type, desc]) => {
        const property = `${name}: ${transformType(type)}`
        return desc
          ? `/** ${desc} */
${property}`
          : property
      })
      .join('\n')

    const def = `export type ${typeName} = {
  ${content}
}`
    return {
      [typeName]: typeDesc
        ? `/** ${typeDesc} */
${def}`
        : def,
    }
  } catch (err) {
    //
  }
}

function parse() {
  var apiGroups = [
    ...$(`.api_detail[style=""]`),
    ...$(`.api_detail[style="display: block;"]`),
  ]
  var dtos = {}

  var content = apiGroups
    .map((e) => {
      var name = $('.heading > h2', e).text().toUpperCase().trim()
      var operationNodes = [...$('.operation', e)]
      var endpoints = operationNodes
        .map((node) => {
          var path = $('.path', node).text().trim()
          var method = $('.http_method', node).text().trim().toLowerCase()
          var desc = $('.options', node).text().trim()

          var [returnTypeNode, ...dtoNodes] = [...$('.response_body', node)]
          var returnType = returnTypeNode.textContent
            .trim()
            .replace(/Return value: (\w+)/, '$1')

          dtoNodes.forEach((dtoNode) => {
            dtos = {
              ...dtos,
              ...dtoToType(dtoNode),
            }
          })

          return `'${path}': (path: string) => ({
/** ${desc} */
${method}() {
  return axiosInstance.${method}${
            returnType ? `<${transformType(returnType)}>` : ''
          }(PLATFORM_BASE_URL + path)
  },
}),`
        })
        .join('')

      return `// ${name}
  ${endpoints}
`
    })
    .join()

  // eslint-disable-next-line no-console
  console.log(content)
  // eslint-disable-next-line no-console
  console.log(Object.values(dtos).join('\n\n'))
}

// eslint-disable-next-line no-undef
clear()
parse()
