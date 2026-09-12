const btns = document.querySelectorAll(".question span")
const faqContent = document.querySelectorAll(".question p")


console.log(faqContent)
btns.forEach(function (btnElm,i) { 
    btnElm.addEventListener("click",()=>{
        if(btnElm.innerText === "+" ){
            faqContent[i].style.display = "block"
            btnElm.innerText = "x"
        }else{
            faqContent[i].style.display = "none"
            btnElm.innerText = "+"
        }
    })
}) 




