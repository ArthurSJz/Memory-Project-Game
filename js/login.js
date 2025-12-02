//Variables for the query selector
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

//Making my Login button work
const validateInput = (event) => {
    if(event.target.value.length >= 1){
        button.removeAttribute('disabled');
    }
    else{
        button.setAttribute('disabled', '')
}
}

// Storing the Name after after the submission and send the player to the Game Page 
const handleSubmit = (event) => {
    event.preventDefault(); //prevent the page refreshing
    
    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
