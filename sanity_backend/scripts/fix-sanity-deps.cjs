const fs = require('fs')
const path = require('path')

const root = __dirname ? path.resolve(__dirname, '..') : process.cwd()

function patchJson(relativePath, mutate) {
  const fullPath = path.join(root, relativePath)

  if (!fs.existsSync(fullPath)) {
    console.warn(`Skipping missing file: ${relativePath}`)
    return
  }

  const original = fs.readFileSync(fullPath, 'utf8')
  const json = JSON.parse(original)
  const updated = mutate(json) || json

  fs.writeFileSync(fullPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8')
  console.log(`Patched ${relativePath}`)
}

patchJson('node_modules/@tanstack/table-core/package.json', (json) => {
  if (json.exports?.['.']?.import === './build/lib/index.mjs') {
    json.exports['.'].import = './build/lib/index.esm.js'
  }

  return json
})

patchJson('node_modules/@mux/playback-core/package.json', (json) => {
  if (json.exports?.['.']?.import === './dist/index.mjs') {
    json.exports['.'].import = './dist/index.cjs.js'
  }

  return json
})

patchJson('node_modules/@mux/mux-video/package.json', (json) => {
  if (json.exports?.['.']?.import === './dist/index.mjs') {
    json.exports['.'].import = './dist/index.cjs.js'
  }

  if (json.exports?.['./*']?.import === './dist/*.mjs') {
    json.exports['./*'].import = './dist/*.cjs.js'
  }

  if (json.exports?.['./*.js']?.import === './dist/*.js') {
    json.exports['./*.js'].import = './dist/*.cjs.js'
  }

  return json
})
