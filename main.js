require('dotenv').config();
const url  = require('url');
const staticFiles = require('./custom_modules/staticFiles');
const loginStuff = require('./custom_modules/loginStuff.js');
const databaseStuff = require('./custom_modules/databaseStuff.js');
var express = require('express');
var session = require('express-session');
//var FileStore = require('session-file-store')(session);
//var fileStoreOptions = {};
var app = express();

dbConf = databaseStuff.getDbConfig();
databaseStuff.dbStartPool(dbConf);

app.use(session({
    secret: process.env.SESSION_SECRET,
}));

app.get(['/static/*', '/views/*'], function(request, response) {
    staticFiles.publicGet(request, response, __dirname);
});

app.get('/', function (req, res){
    console.log("GET /");
    if(req.session.isAuth === true){
        res.sendFile(process.env.PATH_STATIC+'/index.html', { root: __dirname });
    }else{
        res.sendFile(process.env.PATH_STATIC+'/welcome.html', { root: __dirname });
    }
    
});

app.get('/api/todos', function (req, res){
    console.log("GET /todos");
    serveAPITodos(req, res);
});



app.post('/api/login', function (req, res){
    console.log("POST /login");
    loginStuff.serveLoginPOST(req, res, setSessionAuth);
});


app.listen(process.env.PORT, function(){
    console.log(`Listening on port ${process.env.PORT}!`);
});

function serveAPITodos(req, res){
    // check if valid session
    if(req.session.isAuth !== true){
        res.statusCode = 401;
        res.end();
        return;
    }
    if(req.session.userName === undefined){
        res.statusCode = 401;
        res.end();
        return;
    }
    //console.log(`Serving TODOS for user ${req.session.userName}`)
    databaseStuff.dbGetTodos(req.session.userName, (resp) => {
        res.statusCode = 200;
        res.end(JSON.stringify(resp));
    }, (err) => {
        res.statusCode = 500;
        res.end();
    });
    //res.end(JSON.stringify(todo_data));
}

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

function setSessionAuth(request, user){
    request.session.isAuth = true;
    request.session.userName = user;
}