const databaseStuff = require('./databaseStuff.js');
//console.log(process.cwd());

module.exports = {
    serveLoginPOST: function(request, response, setSession){
      //console.log(request);
      var receivedData = [];
      var userData = "";
      
      request.on("data", datachunk => {
          //console.log(`got a piece of data: ${datachunk}`);
          receivedData.push(datachunk);
      });
      request.on("end", () => {
          //console.log(`end of data, total data is: ${receivedData}`);
          userData = JSON.parse(receivedData);
          databaseStuff.dbCheckCredentials(userData.username, userData.userpassword, 
            function() {
              setSession(request, userData.username);
              console.log(`User ${userData.username} logged in succesfully`);
              response.statusCode = 200;
              res_data = {
                isLogged: true,
                userName: userData.username,
              }
              response.end(JSON.stringify(res_data));
            },
            function(){
              console.log(`User ${userData.username} login failed`);
              response.statusCode = 200;
              res_data = {
                isLogged: false,
              }
              response.end(JSON.stringify(res_data));
            });
          
          
      });
    }
  };

function checkUser(name, password, cb_success, cb_fail){
  
  
  
  if(name === "user" && password ==="123"){
    cb_success();
  }else{
    cb_fail();
  }
}