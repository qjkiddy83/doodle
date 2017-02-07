var opts = require('./options'),
    save = require('./save.js'),
    tools = require('./canvasTools.js');
var start = {},
    end = {};

function bind() {
    opts.canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        opts.lineData.push([{ x: touch.clientX, y: touch.clientY }]);
    }, false)
    opts.canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var touch = e.changedTouches[0];
        opts.lineData[opts.lineData.length - 1].push({ x: touch.clientX, y: touch.clientY });
        tools.draw();
    }, false)

    opts.btnSave.addEventListener('click', function() {
        save();
    }, false)

    opts.btnredraw.addEventListener('click', function() {
        tools.clear();
        opts.showImg.parentNode.style.display = 'none'
        opts.canvas.style.opacity = '1';
    }, false)
}
module.exports = bind;
