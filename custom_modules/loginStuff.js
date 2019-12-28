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
          if(checkUser(userData.username, userData.userpassword) === true){
            setSession(request, userData.username);
            console.log(`User ${userData.username} logged in succesfully`);
            response.statusCode = 200;
            res_data = {
              isLogged: true,
              userName: userData.username,
            }
            response.end(JSON.stringify(res_data));
          }else{
            console.log(`User ${userData.username} login failed`);
            response.statusCode = 200;
            res_data = {
              isLogged: false,
            }
            response.end(JSON.stringify(res_data));
          }
          
      });
    }
  };

function checkUser(name, password){
  if(name === "user" && password ==="123"){
    return true;
  }else{
    return false;
  }
}