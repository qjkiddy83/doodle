var opts = require('./options.js');
var ercode = require('./ercode.js');
var tools = require('./canvasTools.js');

module.exports = function() {
	tools.drawImg(ercode);
    opts.showImg.src = opts.canvas.toDataURL('image/jpeg',1.0);
    opts.showImg.parentNode.style.display = 'block'
    opts.canvas.style.opacity = '0.1';
};
