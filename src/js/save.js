var opts = require('./options.js');

module.exports = function() {
    opts.showImg.src = opts.canvas.toDataURL('image/jpeg',1.0);
    opts.showImg.parentNode.style.display = 'block'
    opts.canvas.style.opacity = '0.1';
};
