class Utils {
    formatUserString = (userString, name) => {
        return userString.replace('%1', name)
    }
    
    getDate = () => {
        const date = new Date();
        return date.toString();
    }
}

module.exports = Utils
