 function copyfiles(basePath, targetPath) {
     var fs = require('fs'),
         path = require('path'),
         files = fs.readdirSync(path.join(__dirname,basePath)),
         tmpPath = '';

     targetPath.split(path.sep).forEach(function(item) {
         tmpPath = path.join(tmpPath, item);
         if (!fs.existsSync(tmpPath)) {
             fs.mkdirSync(tmpPath)
         }
     })

     files.forEach(function(item) {
         if (fs.existsSync(targetPath + item)) {
             return;
         }
         var rd = fs.createReadStream(basePath + item);
         rd.on("error", function(err) {
             console.log(err);
         });
         var wr = fs.createWriteStream(targetPath + item);
         wr.on("error", function(err) {
             console.log(err);
         });
         wr.on("close", function(ex) {
             console.log("success");
         });
         rd.pipe(wr);
     })
 }
 module.exports = copyfiles;
