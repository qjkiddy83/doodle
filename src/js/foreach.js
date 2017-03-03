if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback) {
        let i = 0;
        for (; i < this.length; i++) {
            callback(this[i],i)
        }
    };
}

module.exports = {};