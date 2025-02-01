const url = require('url')
const fs = require('fs')
const Utils = require('./utils')

const utils = new Utils()
const messages = JSON.parse(fs.readFileSync('./lang/en/en.json'))

exports.getDate = (req, res) => {
    const urlParts = url.parse(req.url)
    const params = new URLSearchParams(urlParts.query)
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(`<p style='color: #00f'>${utils.formatUserString(messages.hello, params.get('name'))} ${utils.getDate()}</p>`)
    res.end()
}
