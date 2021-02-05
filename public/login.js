window.onload=()=>{
    sin=document.getElementById("s-in")
    sup=document.getElementById("s-up")

    U=document.getElementById("user")
    P=document.getElementById("pasw")

    //Events
    sin.addEventListener("click",signIn)
    P.addEventListener("keypress",(e)=>{if (e.key==='Enter') signIn()})
    
    sup.addEventListener("click",()=>{
        alert("You must have admin privileges to perform this operation")
    })
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
async function postLogin(user,pasw){
    const data={u:user,p:pasw}
    console.log("sdata:"+JSON.stringify(data))
    let route="http://idp.udea.edu.co:80/"// !important -> url+"/" at the end (url+route)
    let params={
        method:'POST',
        headers:{
            'Content-Type':'application/json'//,'x-www-form-urlencoded'] //cuz its a form
        },
        // mode:'no-cors', //this solved the problem with cors when mozilla dind't let me access my own API
        body:JSON.stringify(data)
    }

    // fetch(request) rather than fetch(route,params
    let request=new Request(route,params)
    let response=fetch(request).then(async (response) => {
            if (!response.ok /*response.status!==200*/ ) {
            // throw new Error('Network or server error.');
            throw new Error('response.status!==200');
            }
            // console.log("resok: "+response.status) // premature?
            return await response.json()//return await response.json()
    })
    response.then((data) => {
        console.log('data:', data)
        if (data.sqlia) alert("sus query...")
        if(!data.output) alert("Wrong username or password.")
        else{
            fetch(response.redirect,params)
        }
        return data
    })
    .catch(error => {
        console.log(error);
    })
    
    //data received
    console.log('outerResponse'+await JSON.stringify(response));
    
}
//this is a backup file