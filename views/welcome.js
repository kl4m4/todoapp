console.log("Connecting to api...");
axios   .get('http://localhost:3000/api/welcome')
        .then(response => {parseWelcomeResponse(response)})
        .catch(err => handleWelcomeError(err));

function parseWelcomeResponse(response){
    //console.log("Parsing response");
    //console.log(response.data);
    //console.log(`Logged in: ${response.data.loginInfo}`);
    //console.log(`welcomeTxt: ${response.data.welcomeTxt}`);
    welcomemsg = document.getElementById("welcomemsg");
    logininfo = document.getElementById("logininfo");
    if(response.data.welcomeTxt.length > 0){
        welcomemsg.innerHTML = response.data.welcomeTxt;
    }
    if(response.data.isLogged === true){
        logininfo.innerHTML = "Jesteś zalogowany";
    }else{
        logininfo.innerHTML = "Nie jesteś zalogowany";
    }
}

function handleWelcomeError(error){
    console.log("Error connecting to api!");
    console.log(error);
}

function Login(){
    username = document.getElementById("username").value;
    userpassword = document.getElementById("userpassword").value;
    console.log(`Trying to log in with username ${username} and password ${userpassword}`);
    axios.post('http://localhost:3000/login', {
        'username': username,
        'userpassword': userpassword
      })
      .then(function (response) {
        console.log(`isLogged: ${response.data.isLogged}`);
        if(response.data.isLogged === true){
            showLoginStatus(true);
            setTimeout(function(){document.location.reload()}, 3000);
        }else{
            showLoginStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

function showLoginStatus(is_success){
    infoelement = document.getElementById("loginmessage");
    infodiv = document.getElementById("loginmessagebox");
    if(is_success === true){
        infoelement.innerHTML = "Login success! :)";
        infodiv.classList.add("infospan-ok");
        infodiv.classList.remove("infospan-fail");
    }else{
        infoelement.innerHTML = "Login failed :(";
        infodiv.classList.remove("infospan-ok");
        infodiv.classList.add("infospan-fail");
    }
}