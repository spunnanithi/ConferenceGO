// Variables for DOM links
const locationLink = document.getElementById("location-link");
const conferenceLink = document.getElementById("conference-link");
const presentationLink = document.getElementById("presentation-link");

// Parse jwt_access_payload cookie

// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get("jwt_access_payload");
// console.log(cookie);

if (payloadCookie) {
	// The cookie value is a JSON-formatted string, so parse it
	const encodedPayload = payloadCookie.value;
	// console.log(encodedPayload);

	// Convert the encoded payload from base64 to normal string
	const decodedPayload = atob(encodedPayload);
	// console.log(decodedPayload);

	// The payload is a JSON-formatted string, so parse it
	const payload = JSON.parse(decodedPayload);
	// Print the payload
	// console.log(payload);

	// Check if "events.add_conference" is in the permissions.
	// If it is, remove 'd-none' from the link
	if (payload.user.perms.includes("events.add_conference")) {
		conferenceLink.classList.remove("d-none");
	}

	// Check if "events.add_location" is in the permissions.
	// If it is, remove 'd-none' from the link
	if (payload.user.perms.includes("events.add_location")) {
		locationLink.classList.remove("d-none");
	}

	if (payload.user.perms.includes("presentations.add_presentation")) {
		presentationLink.classList.remove("d-none");
	}
}
