class Utils {
    formatUserString = (userString, name) => {
        return userString.replace('%1', name)
    }
    
    getDate = () => {
        const date = new Date();
        return date.toString();
    }

    sendResponse = (res, status, contentType, message) => {
        res.writeHead(status, { 'content-type': contentType })
        res.write(message)
        res.end()
    }
}

module.exports = Utils
