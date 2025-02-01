const url = require('url')
const fs = require('fs')
const Utils = require('./utils')

class RouteHandler {

    constructor() {
        this.utils = new Utils()
        this.messages = JSON.parse(fs.readFileSync('./lang/en/en.json'))
    }

    getDate = (req, res) => {
        const urlParts = url.parse(req.url)
        const params = new URLSearchParams(urlParts.query)
        const greeting = `<p style='color: #00f'>${this.utils.formatUserString(this.messages.hello, params.get('name'))} ${this.utils.getDate()}</p>`
        this.utils.sendResponse(res, 200, 'text/html', greeting)
    }

    writeFile = (req, res) => {
        const urlParts = url.parse(req.url)
        const params = new URLSearchParams(urlParts.query)
        const writeText = params.get('text')
    
        if (writeText === null) {
            this.utils.sendResponse(res, 200, 'text/plain', `${this.messages.writeNull}`)
            return
        }
        
        try {
            fs.appendFileSync('./text/file.txt', writeText + '\n')
            this.utils.sendResponse(res, 200, 'text/plain', `${this.messages.wroteFile}${writeText}`)
        } catch (err) {
            this.utils.sendResponse(res, 500, 'text/plain', `${this.messages.writeError}${err}`)
        }
        
    }

    readFile = (req, res) => {
        const urlParts = req.url.split('/')
        const filename = urlParts[2]
    
        if (!filename || filename === null || filename === '') {
            this.utils.sendResponse(res, 200, 'text/plain', `${this.messages.readNull}`)
            return
        }
    
        if (!fs.existsSync(`./text/${filename}`)) {
            this.utils.sendResponse(res, 404, 'text/plain', `${this.utils.formatUserString(this.messages.fileNotFound, filename)}`)
            return
        }
        
        try {
            const fileText = fs.readFileSync(`./text/${filename}`, 'utf8')
            this.utils.sendResponse(res, 200, 'text/plain', `${this.messages.readFile}${filename}\n${fileText}`)
        } catch (err) {
            this.utils.sendResponse(res, 500, 'text/plain', `${this.messages.readError}${err}`)
        }
    }
}

module.exports = RouteHandler
