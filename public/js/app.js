// console.log("Client side javascript file is loading")


// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('form')
const inputForm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
const loc = inputForm.value
messageOne.textContent='Loading...'
messageTwo.textContent=' '


fetch('http://localhost:3000/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{
        console.log(data.redirected);
        if(data.error){
            messageOne.textContent="Unable to find location, try another search"

        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
        
    })
})
})

