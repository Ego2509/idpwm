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
        postLogin(user,pasw)
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
    //          https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
    function postLogin(user,pasw){
        data={u:user,p:pasw}
        let route="http://idp.udea.edu.co:80/"// !important -> url+"/" at the end (url+route)
        let params={
            method:'POST',
            headers:{
                'Content-Type':'application/json'//x-www-form-urlencoded' //cuz its a form
            },
            mode:'no-cors', //this solved the problem with cors when mozilla dind't let me access my own API
            body:JSON.stringify(data)
        }
        fetch(route,params)
            .then(res => {
                console.log("resok: "+res.ok)
                console.log("res: "+res)
                if (!res.ok) {
                // throw new Error('Network or server error.');
                throw new Error('IP not allowed by admin. Reason: ur a piece of crap.');
                }
                return res
            })
            .then(res => {
                res.json().then(data=>{
                    console.log(data)
                })
            })
            .catch(error => {
                alert(error);
            })
        
        
    }
//this is a backup file