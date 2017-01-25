var colors = require('./colors.js');

var opts = {
    canvas: document.querySelector('#canavs'),
    getColor: colors.getColor,
    lineWidth: document.querySelector('#lineWidth'),
    lineData: [],
    btnSave: document.querySelector('#savetoimg'),
    showImg: document.querySelector('#savedImg img'),
    btnredraw: document.querySelector('#redraw')
}
module.exports = opts;
