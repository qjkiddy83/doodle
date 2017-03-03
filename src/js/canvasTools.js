let opts = require('./options.js');
let ww = window.innerWidth;
let bgimg = new Image;
bgimg.src = require('../images/p3-bg8.jpg');

function canvasTools() {
    this.el = document.querySelector('#canavs');
    this.el.width = ww;
    this.el.height = ww;
    bgimg.onload = function() {
        this.fillBg(bgimg);
    }.bind(this)
}

canvasTools.prototype = {
    clear: function() {
        let ctx = this.el.getContext("2d");
        ctx.clearRect(0, 0, this.el.width, this.el.height);
        opts.lineData = [];
        this.fillBg(bgimg);
    },
    draw: function() {
        let ctx = this.el.getContext("2d");
        let tmpData = opts.lineData[opts.lineData.length - 1];

        ctx.beginPath();
        ctx.moveTo(opts.lineData[0].x, opts.lineData[0].y);
        ctx.shadowBlur = 1;
        ctx.shadowColor = ctx.strokeStyle = opts.getColor();
        ctx.lineWidth = opts.lineWidth.value;
        ctx.lineCap = ctx.lineJoin = "round";
        tmpData.forEach(function(_) {
            ctx.lineTo(_.x, _.y);
            ctx.stroke();
        })
    },
    fillBg: function(bgimg) {
        //添加白色背景
        let ctx = this.el.getContext("2d");
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ww, ww);
        ctx.drawImage(bgimg, 0, 0, ww, ww);
    },
    drawImg: function(img) {
        let ctx = this.el.getContext("2d");
        let l = (ww - 65);
        ctx.drawImage(img, l, l, 60, 60);
    }
}

module.exports = new canvasTools();
