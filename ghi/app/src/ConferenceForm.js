import React, { useState, useEffect } from "react";

const ConferenceForm = () => {
	// "locations" creates a variable and stores data in the component; "setLocations" creates a method to be able to update the state (used to fetch the locations from API)
	const [locations, setLocations] = useState([]);

	// Set the useState hook to store "name, starts, ends, description, max_presentation, max_attendees and locations" in the component's state, with a default initial value of an empty string.
	const [name, setName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [maxPresentation, setMaxPresentation] = useState("");
	const [maxAttendee, setMaxAttendee] = useState("");
	const [location, setLocation] = useState(""); // Used to set the state of the selected state from dropdown menu

	// Create the handleFormChange method to take what the user inputs into the form and store it in the state's variable based on the "name" of the HTML element.
	const handleFormChange = (event) => {
		const value = event.target.value;

		if (event.target.name === "name") {
			setName(value);
		} else if (event.target.name === "starts") {
			setStartDate(value);
		} else if (event.target.name === "ends") {
			setEndDate(value);
		} else if (event.target.name === "description") {
			setDescription(value);
		} else if (event.target.name === "max_presentations") {
			setMaxPresentation(value);
		} else if (event.target.name === "max_attendees") {
			setMaxAttendee(value);
		} else if (event.target.name === "location") {
			setLocation(value);
		}
	};

	// Create handleSubmit method to take inputted user data and post it to the provided url and reset the form
	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			name: name,
			starts: startDate,
			ends: endDate,
			description: description,
			max_presentations: maxPresentation,
			max_attendees: maxAttendee,
			location: location,
		};

		const conferenceUrl = "http://localhost:8000/api/conferences/";
		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(conferenceUrl, fetchConfig);

		if (response.ok) {
			const newConference = await response.json();
			console.log(newConference);

			setName("");
			setStartDate("");
			setEndDate("");
			setDescription("");
			setMaxPresentation("");
			setMaxAttendee("");
			setLocation("");
		}
	};

	const fetchData = async () => {
		const locationUrl = "http://localhost:8000/api/locations/";

		const response = await fetch(locationUrl);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Conference</h1>
					<form id="create-conference-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Name"
								required
								type="text"
								id="name"
								name="name"
								className="form-control"
								onChange={handleFormChange}
								value={name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="mm/dd/yyyy"
								required
								type="date"
								id="starts"
								name="starts"
								className="form-control"
								onChange={handleFormChange}
								value={startDate}
							/>
							<label htmlFor="starts">Starts</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="mm/dd/yyyy"
								required
								type="date"
								id="ends"
								name="ends"
								className="form-control"
								onChange={handleFormChange}
								value={endDate}
							/>
							<label htmlFor="ends">Ends</label>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Description
							</label>
							<textarea
								name="description"
								id="description"
								className="form-control"
								rows="3"
								onChange={handleFormChange}
								value={description}></textarea>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Maximum presentations"
								required
								type="number"
								name="max_presentations"
								id="max_presentations"
								step="10"
								className="form-control"
								onChange={handleFormChange}
								value={maxPresentation}
							/>
							<label htmlFor="max_presentations">Max presentations</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Maximum attendees"
								required
								type="number"
								name="max_attendees"
								id="max_attendees"
								step="10"
								className="form-control"
								onChange={handleFormChange}
								value={maxAttendee}
							/>
							<label htmlFor="max_attendees">Max attendees</label>
						</div>
						<div className="mb-3">
							<select
								required
								id="location"
								name="location"
								className="form-select"
								onChange={handleFormChange}
								value={location}>
								<option value="">Choose a location</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ConferenceForm;
