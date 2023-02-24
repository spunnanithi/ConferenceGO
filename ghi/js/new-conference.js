// Add EventListener for when the DOM loads
window.addEventListener('DOMContentLoaded', async () => {

// Location Fetching Section
    // Declare a variable that will hold URL for API listing states by name
    const locationUrl = 'http://localhost:8000/api/locations/';

    // Fetch the URL above, include await keyword
    const response = await fetch(locationUrl);

    // If response is ok, get data using .json method, include await keyword
    if (response.ok) {
        const data = await response.json();

        // Get the select tag element by its id 'location'
        const locationTag = document.getElementById('location');

        // For each state in the states property of the data
        for (let location of data.locations) {
            // Create an 'option' element
            const optionTag = document.createElement('option');

            // Set the '.value' property of the option element to the location's id
            optionTag.value = location.id;

            // Set the '.innerHTML' property of the option element to the location's name
            optionTag.innerHTML = location.name;

            // Append the option element as a child of the select tag
            locationTag.appendChild(optionTag);
        }
    }

// Location Submission Form Section
    // Get form tag by selecting id of 'create-new-conference'
    const form = document.getElementById('create-conference-form');

    // Add EventListener for whenever user submits a form
    form.addEventListener('submit', async (event) => {
        // Prevent default behavior of sending data to server after pressing button
        event.preventDefault();

        // Obtain form data and convert to JSON
        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData);
        const json = JSON.stringify(dataObject);

        // Send form data to server
        const conferenceUrl = 'http://localhost:8000/api/conferences/'; // URL that we are going to send 'POST' HTTP request to create new conference

        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        }

        const response = await fetch(conferenceUrl, fetchConfig);

        if (response.ok) {
            form.reset();
            const newConference = await response.json();
            // console.log(newConference);
        }

    })

});
