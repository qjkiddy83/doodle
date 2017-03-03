let opts = require('./options.js');
let ercode = require('./ercode.js');
let tools = require('./canvasTools.js');

module.exports = function() {
	tools.drawImg(ercode);
    opts.showImg.src = opts.canvas.toDataURL('image/jpeg',1.0);
    opts.showImg.parentNode.style.display = 'block'
    opts.canvas.style.opacity = '0.1';
};
