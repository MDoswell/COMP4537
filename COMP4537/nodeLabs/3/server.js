const http = require('http')
const url = require('url')
const fs = require('fs')
const RouteHandler = require('./modules/routeHandler')

class Server {

    constructor() {
        this.routeHandler = new RouteHandler();
        const messages = JSON.parse(fs.readFileSync('./lang/en/en.json'))
        this.notFound = messages.notFound
        this.routes = [
            {pathRegex: /^\/getdate\/?$/, action: this.routeHandler.getDate},
            {pathRegex: /^\/writefile\/?$/, action: this.routeHandler.writeFile},
            {pathRegex: /^\/readfile(?:\/[^\/]*[\/]?)?$/, action: this.routeHandler.readFile}
        ]
    }

    start() {
        http.createServer((req, res) => {
            const urlParts = url.parse(req.url)
            for (let i = 0; i < this.routes.length; i++) {
                if (this.routes[i].pathRegex.test(urlParts.pathname.toLowerCase())) {
                    return this.routes[i].action(req, res)
                }
            }
            res.writeHead(404, { 'content-type': 'text/html' })
            res.end(this.notFound)
        }).listen(8088)
        
        console.log('Server listening...')
    }
}

const server = new Server();
server.start();
