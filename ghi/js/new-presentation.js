// Add EventListener for when the DOM loads
window.addEventListener('DOMContentLoaded', async () => {

// Conference Fetching Section
    // Declare a variable that will hold URL for API listing conferences by name
    const conferenceUrl = 'http://localhost:8000/api/conferences/';

    // Get the select tag element by its id 'conference'
    const conferenceTag = document.getElementById('conference');

    // Fetch the URL above, include await keyword
    const response = await fetch(conferenceUrl);

    // If response is ok, get data using .json method, include await keyword
    if (response.ok) {
        const data = await response.json();

        // For each conference in the conferences property of the data
        for (let conference of data.conferences) {
            // Create an 'option' element
            const optionTag = document.createElement('option');

            // Set the '.value' property of the option element to the conference's id
            optionTag.value = conference.id;

            // Set the '.innerHTML' property of the option element to the conference's name
            optionTag.innerHTML = conference.name;

            // Append the option element as a child of the select tag
            conferenceTag.appendChild(optionTag);
        }
    }

// Presentation Submission Form Section
    //
    const form = document.getElementById('create-presentation-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();


        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData);
        const json = JSON.stringify(dataObject);

        const conferenceId = conferenceTag.options[conferenceTag.selectedIndex].value;

        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;

        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        }

        const response = await fetch(presentationUrl, fetchConfig);

        if (response.ok) {
            form.reset();
            const newPresentation = await response.json();
            console.log(newPresentation);
        }
    })
})
