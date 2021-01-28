const { response } = require("express")

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
    //more at:  https://developer.mozilla.org/en-US/docs/Web/API/Request
    //          https://developer.mozilla.org/en-US/docs/Web/API/Response
    //          https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    function postLogin(){
        
        let route="http://idp.udea.edu.co:80/"// !important -> url+"/" at the end (url+route)
        let params={
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded' //cuz its a form
            }
        }
        fetch(route,params)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network error');
                }
                return response;
            })
            .then(response => {
                alert(response)
            })
            .catch(error => {
                alert(error);
            })
        
        
    }