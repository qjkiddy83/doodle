var opts = require('./options.js');
var ww = window.innerWidth;

function canvasTools(){
	this.el = document.querySelector('#canavs');
	this.el.width = ww;
	this.el.height = ww;
	this.fillBg();
}

canvasTools.prototype = {
    clear: function() {
        var ctx = this.el.getContext("2d");
        ctx.clearRect(0, 0, this.el.width, this.el.height);
        opts.lineData = [];
        this.fillBg();
    },
    draw: function() {
        var ctx = this.el.getContext("2d");
        var tmpData = opts.lineData[opts.lineData.length - 1];

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
    fillBg: function() {
        //添加白色背景
        var ctx = this.el.getContext("2d");
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ww, ww);
    },
    drawImg : function(img){
        var ctx = this.el.getContext("2d");
        var l = (ww-65);
        console.log(l)
        ctx.drawImage(img,l,l,60,60);
    }
}

module.exports = new canvasTools();
