const http = require('http')
const fs = require('fs')
const Utils = require('./modules/utils')

const utils = new Utils()
const messages = JSON.parse(fs.readFileSync('./lang/en/en.json'))

http.createServer((req, res) => {
    getDate(req, res)
}).listen(8088)

console.log('Server listening...')

function getDate(req, res) {
    console.log(req.url)
    const params = new URLSearchParams(req.url.substring(1))
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(`<p style='color: #00f'>MAIN: ${utils.formatUserString(messages.hello, params.get('name'))} ${utils.getDate()}</p>`)
    res.end()
}
