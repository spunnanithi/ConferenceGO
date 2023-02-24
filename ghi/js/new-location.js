// Add EventListener for when the DOM loads
window.addEventListener('DOMContentLoaded', async () => {

// State Fetching Section
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

// Location Form Submission Section
    // Get form tag by 'create-location-form' id
    const form = document.getElementById('create-location-form');

    // Add EventListener for whenever user submits a form
    form.addEventListener('submit', async (event) => {
        // Prevent default behavior of sending data to server after pressing button
        event.preventDefault();

        // Obtain form data and convert to JSON
        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData);
        const json = JSON.stringify(dataObject);
        console.log(json)

        // Send form data to server
        const locationUrl = 'http://localhost:8000/api/locations/'; // URL that we are going to send 'POST' HTTP request to create new conference
        const fetchConfig = {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(locationUrl, fetchConfig);
        console.log(response)

        if (response.ok) {
            form.reset(); // Reset form to original state after submission
            const newLocation = await response.json();
            // console.log(newLocation);
        }
    })

})
