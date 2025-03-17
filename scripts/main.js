window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
    if (event.type==="open") {
        document.getElementById("path").innerHTML=jx(event.path);
        event.source.postMessage("Receive Sucessfully", "*");
    }
}

function jx(path){
   var jp=path.split("/");
   jp=jp.map(l=>{return("<button onclick='p(\""+l+"\")'>"+l+"</button>")});
   return(jp.join("/"));
};
