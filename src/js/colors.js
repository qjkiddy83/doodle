var colorEls = Array.prototype.slice.call(document.querySelectorAll('.color span'));
var color = '#000000';
colorEls.forEach(function(_){
    _.style.backgroundColor = _.getAttribute('data-value');
    _.addEventListener('click', function() {
        color = this.getAttribute('data-value');
        colorEls.forEach(function(_){
            _.className = "";
        })
        this.className = "checked";
    }, false)
})
module.exports = {
    getColor: function() {
        return color;
    }
}
