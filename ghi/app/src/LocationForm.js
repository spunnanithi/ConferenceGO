import React, { useEffect, useState } from "react";

const LocationForm = () => {
	// "states" creates a variable and stores data in the component; "setStates" creates a method to be able to update the state (used to fetch the states from API)
	const [states, setStates] = useState([]);

	// Set the useState hook to store "name" in the component's state, with a default initial value of an empty string.
	const [name, setName] = useState("");
	const [roomCount, setRoomCount] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState(""); // Used to set the state of the selected state from dropdown menu

	// Create the handleNameChange method to take what the user inputs into the form and store it in the state's "name" variable.
	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};

	const handleRoomCountChange = (event) => {
		const value = event.target.value;
		setRoomCount(value);
	};

	const handleCityChange = (event) => {
		const value = event.target.value;
		setCity(value);
	};

	const handleStateChange = (event) => {
		const value = event.target.value;
		setState(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create an empty JSON object
		const data = {};

		data.name = name;
		data.room_count = roomCount;
		data.city = city;
		data.state = state;

		console.log(data);

		const locationUrl = "http://localhost:8000/api/locations/";
		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);

		if (response.ok) {
			const newLocation = await response.json();
			console.log(newLocation);

			setName("");
			setRoomCount("");
			setCity("");
			setState("");
		}
	};

	// Fetch states from the states in select element
	const fetchData = async () => {
		const url = "http://localhost:8000/api/states/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setStates(data.states);
		}
	};

	// Use [] to indicate we only want to execute fetchData once after mounting the React page
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Location</h1>
					<form id="create-location-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
								onChange={handleNameChange}
								value={name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Room count"
								required
								type="number"
								name="room_count"
								id="room_count"
								className="form-control"
								onChange={handleRoomCountChange}
								value={roomCount}
							/>
							<label htmlFor="room_count">Room count</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="City"
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
								onChange={handleCityChange}
								value={city}
							/>
							<label htmlFor="city">City</label>
						</div>
						<div className="mb-3">
							<select
								required
								name="state"
								id="state"
								className="form-select"
								onChange={handleStateChange}
								value={state}>
								<option value="">Choose a state</option>
								{states.map((state) => {
									return (
										<option key={state.abbreviation} value={state.abbreviation}>
											{state.name}
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

export default LocationForm;
