// Add EventListener for when the DOM loads
window.addEventListener('DOMContentLoaded', async () => {

// Declare a variable that will hold URL for API listing states by name
    const statesUrl = 'http://localhost:8000/api/states/';

// Fetch the URL above, include await keyword
    const response = await fetch(statesUrl);

// If response is ok, get data using .json method, include await keyword
    if (response.ok) {
        const data = await response.json();
        // console.log("data", data);

        // Get the select tag element by its id 'state'
        const stateTag = document.getElementById('state');

        // For each state in the states property of the data
        for (let state of data.states) {
            // Create an 'option' element
            const optionTag = document.createElement('option');

            // Set the '.value' property of the option element to the state's abbreviation
            optionTag.value = Object.values(state);

            // Set the '.innerHTML' property of the option element to the state's name
            optionTag.innerHTML = Object.keys(state);

            // Append the option element as a child of the select tag
            stateTag.appendChild(optionTag);
        }
    }
})
