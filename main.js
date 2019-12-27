require('dotenv').config();
const staticFiles = require('./custom_modules/staticFiles');
const loginStuff = require('./custom_modules/loginStuff.js');
var express = require('express');
var session = require('express-session');
//var FileStore = require('session-file-store')(session);
//var fileStoreOptions = {};
var app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    //store: new FileStore(fileStoreOptions)
}));
//app.use(process.env.PATH_STATIC, express.static('static'));
//app.use(process.env.PATH_VIEWS, express.static('views'));

app.get(['/static*', '/views*'], function(request, response) {
    staticFiles.publicGet(request, response, __dirname);
});


app.get('/', function (req, res){
    console.log("GET /");
    //console.log(`sessionID=${req.sessionID}`);
    if(req.session.isAuth === true){
        res.sendFile(process.env.PATH_STATIC+'/index.html', { root: __dirname });
    }else{
        res.sendFile(process.env.PATH_STATIC+'/welcome.html', { root: __dirname });
    }
    
});

//app.get('/api/welcome', function (req, res){serveApiWelcome(req,res)});
//app.get('/api/private', function (req, res){servePrivate(req,res)});
app.post('/login', function (req, res){
    console.log("POST /login");
    loginStuff.serveLoginPOST(req, res, setSessionAuth);
});
app.post('/api/logout', function (req, res){
    req.session.isAuth = false;
    res.redirect('/');
});

app.listen(process.env.PORT, function(){
    console.log(`Listening on port ${process.env.PORT}!`);
});

/*
function serveApiWelcome(request, response){
    console.log("Serving api/welcome");
    response.statusCode = 200;
    resdata = {
        welcomeTxt: 'Hejka!',
        isLogged: request.session.isAuth
    }
    response.end(JSON.stringify(resdata));
}
*/

/*
function servePrivate(request, response){
    console.log("Serving api/private");
    // Check if this session is authenticated
    console.log(`Checking if session ${request.sessionID} is authenticated...`);
    let isAuth = request.session.isAuth;
    //if(Math.random() >= 0.5){
    //    isAuth = true;
    //}

    if(isAuth === true){
        console.log("Authenticated!");
        response.statusCode = 200;
        response.end("Private stuff");
    }else{
        console.log("Not authenticated!");
        response.statusCode = 403;
        response.end("Sorry, not this time...");
    }
}
*/

function setSessionAuth(request){
    request.session.isAuth = true;
}