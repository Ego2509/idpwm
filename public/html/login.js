window.onload=()=>{
    sin=document.getElementById("s-in")
    sup=document.getElementById("s-up")

    U=document.getElementById("user")
    P=document.getElementById("pasw")

    //Events
    sin.addEventListener("click",signIn)
    P.addEventListener("keypress",(e)=>{if (e.key==='Enter') signIn()})
    
    //onclick sin
    function signIn(){
        user=U.value
        pasw=P.value
        if(!checkPasw(pasw)){
            alert("Incorrect password")
            P.value=""
            return null
        }
        postLogin()
    }

    //basic check
    function checkPasw(p){
        console.log("pasw1: "+p);
        if(p && !(/\s/g.test(p))){
            console.log("pasw2: "+p);
            return true
            }
        }
    }

    //send post to main 
    function postLogin(){

        var http = new XMLHttpRequest();
        var params = "holateamo";
        http.open("POST", "http://idp.udea.edu.co:80", true);
        
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");
        
        alert(http.onreadystatechange);
        http.onreadystatechange=()=>{
            if (http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
        }
        
        http.send(params);

    }