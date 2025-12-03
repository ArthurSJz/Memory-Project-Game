// Variables for element selectors
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

// Enables/disables login button based on input validity
const validateInput = (event) => {
    if(event.target.value.length >= 1){
        button.removeAttribute('disabled');
    }
    else{
        button.setAttribute('disabled', '')
}
}

// Handles form submission
const handleSubmit = (event) => {
    event.preventDefault(); //prevent the page refreshing
    
    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
}


// Event listeners for input validation and form submission
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
