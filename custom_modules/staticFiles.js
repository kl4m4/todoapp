module.exports = {
    publicGet,
}

const fs = require('fs');
const path = require('path');

function publicGet(request, response, basepath){
    console.log(`GET ${request.url}`);
    //console.log(basepath);
    let filePath = basepath+request.url;
    //filePath = "C:\\Users\\E6430\\projekty\\express\\public\\main.css";
    fs.readFile(filePath, function(err,data){
        if(err){
            console.log(`Error opening ${filePath} file`);
            response.statusCode = 404;
            response.end(`${filePath} not found`);
        }else{
            ext = path.parse(filePath).ext;
            response.statusCode = 200;
            response.setHeader('Content-type', mimeType[ext]);
            response.end(data);
            console.log(`Served file ${filePath} as ${mimeType[ext]}`);
        }
    })


}

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };