import React, { useState, useEffect } from "react";

const AttendeeConferenceForm = () => {
	const [conferences, setConferences] = useState([]);

	const [conference, setConference] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [hasSignedUp, setHasSignedUp] = useState(false);

	const fetchData = async () => {
		const conferenceUrl = "http://localhost:8000/api/conferences/";

		const response = await fetch(conferenceUrl);

		if (response.ok) {
			const data = await response.json();
			setConferences(data.conferences);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleFormChange = (event) => {
		const value = event.target.value;

		if (event.target.name === "conference") {
			setConference(value);
		} else if (event.target.name === "name") {
			setName(value);
		} else if (event.target.name === "email") {
			setEmail(value);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			conference: conference,
			name: name,
			email: email,
		};

		const attendeeUrl = "http://localhost:8001/api/attendees/";
		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(attendeeUrl, fetchConfig);

		if (response.ok) {
			const newAttendee = await response.json();
			console.log(newAttendee);

			setConference("");
			setName("");
			setEmail("");
			setHasSignedUp(true);
		}
	};

	let spinnerClasses = "d-flex justify-content-center mb-3";
	let dropdownClasses = "form-select d-none";
	if (conferences.length > 0) {
		spinnerClasses = "d-flex justify-content-center mb-3 d-none";
		dropdownClasses = "form-select";
	}

	let successMessageClasses = "alert alert-success d-none mb-0";
	let formClasses = "";
	if (hasSignedUp) {
		successMessageClasses = "alert alert-success mb-0";
		formClasses = "d-none";
	}

	return (
		<div className="my-5">
			<div className="row">
				<div className="col col-sm-auto">
					<img
						width="300"
						className="bg-white rounded shadow d-block mx-auto mb-4"
						src="./logo.svg"
					/>
				</div>
				<div className="col">
					<div className="card shadow">
						<div className="card-body">
							<form
								className={formClasses}
								id="create-attendee-form"
								onSubmit={handleSubmit}>
								<h1 className="card-title">It's Conference Time!</h1>
								<p className="mb-3">
									Please choose which conference you'd like to attend.
								</p>
								<div className={spinnerClasses} id="loading-conference-spinner">
									<div className="spinner-grow text-secondary" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
								<div className="mb-3">
									<select
										name="conference"
										id="conference"
										className={dropdownClasses}
										onChange={handleFormChange}
										value={conference}
										required>
										<option value="">Choose a conference</option>
										{conferences.map((conference) => {
											return (
												<option value={conference.href} key={conference.id}>
													{conference.name}
												</option>
											);
										})}
									</select>
								</div>
								<p className="mb-3">Now, tell us about yourself.</p>
								<div className="row">
									<div className="col">
										<div className="form-floating mb-3">
											<input
												required
												placeholder="Your full name"
												type="text"
												id="name"
												name="name"
												className="form-control"
												onChange={handleFormChange}
												value={name}
											/>
											<label htmlFor="name">Your full name</label>
										</div>
									</div>
									<div className="col">
										<div className="form-floating mb-3">
											<input
												required
												placeholder="Your email address"
												type="email"
												id="email"
												name="email"
												className="form-control"
												onChange={handleFormChange}
												value={email}
											/>
											<label htmlFor="email">Your email address</label>
										</div>
									</div>
								</div>
								<button className="btn btn-lg btn-primary">I'm going!</button>
							</form>
							<div className={successMessageClasses} id="success-message">
								Congratulations! You're all signed up!
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AttendeeConferenceForm;
