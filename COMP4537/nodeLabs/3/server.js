const http = require('http')
const url = require('url')
const {getDate} = require('./modules/getDate')

const routes = [
    {path: "/getdate", action: getDate},
    // {path: "/writefile", action: writeTest}
]

http.createServer((req, res) => {
    const urlParts = url.parse(req.url)
    for (let i = 0; i < routes.length; i++) {
        if (urlParts.pathname.toLowerCase() === routes[i].path || urlParts.pathname.toLowerCase() === routes[i].path + '/') {
            return routes[i].action(req, res)
        }
    }
    res.writeHead(404, { 'content-type': 'text/html' })
    res.end("404 - Not found")
}).listen(8088)

console.log('Server listening...')
