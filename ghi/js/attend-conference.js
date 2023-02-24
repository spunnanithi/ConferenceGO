// Add EventListener for when the DOM loads
window.addEventListener("DOMContentLoaded", async () => {
	// Conference Fetching Section
	const selectTag = document.getElementById("conference");

	const url = "http://localhost:8000/api/conferences/";
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();

		for (let conference of data.conferences) {
			const option = document.createElement("option");
			option.value = conference.href;
			option.innerHTML = conference.name;
			selectTag.appendChild(option);
		}

		// Here, add the 'd-none' class to the loading icon
		const loadingIcon = document.getElementById("loading-conference-spinner");
		loadingIcon.classList.add("d-none");

		// Here, remove the 'd-none' class from the select tag
		selectTag.classList.remove("d-none");
	}

	// Attendee Form Submission Section
	const form = document.getElementById("create-attendee-form");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const dataObject = Object.fromEntries(formData);
		const json = JSON.stringify(dataObject);

		const conferencehref = selectTag.options[selectTag.selectedIndex].value;

		const attendeeUrl = `http://localhost:8001/${conferencehref}attendees/`;

		const fetchConfig = {
			method: "POST",
			body: json,
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(attendeeUrl, fetchConfig);

		const successMessage = document.getElementById("success-message");

		if (response.ok) {
			form.classList.add("d-none");
			successMessage.classList.remove("d-none");
		}
	});
});
