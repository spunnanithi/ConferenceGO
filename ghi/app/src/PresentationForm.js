import React from "react";
import { useState, useEffect } from "react";

const PresentationForm = () => {
	const [conferences, setConferences] = useState([]);

	const [presenterName, setPresenterName] = useState("");
	const [presenterEmail, setPresenterEmail] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [title, setTitle] = useState("");
	const [synopsis, setSynopsis] = useState("");
	const [conference, setConference] = useState("");

	const handleFormChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		if (name === "presenter_name") {
			setPresenterName(value);
		} else if (name === "presenter_email") {
			setPresenterEmail(value);
		} else if (name === "company_name") {
			setCompanyName(value);
		} else if (name === "title") {
			setTitle(value);
		} else if (name === "synopsis") {
			setSynopsis(value);
		} else if (name === "conference") {
			setConference(value);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			presenter_name: presenterName,
			presenter_email: presenterEmail,
			company_name: companyName,
			title: title,
			synopsis: synopsis,
		};

		const presentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(presentationUrl, fetchConfig);

		if (response.ok) {
			const newPresentation = await response.json();
			console.log(newPresentation);

			setPresenterName("");
			setPresenterEmail("");
			setCompanyName("");
			setTitle("");
			setSynopsis("");
			setConference("");
		}
	};

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

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Presentation</h1>
					<form id="create-presentation-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Presenter Name"
								required
								type="text"
								id="presenter_name"
								name="presenter_name"
								className="form-control"
								onChange={handleFormChange}
								value={presenterName}
							/>
							<label htmlFor="presenter_name">Presenter Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Presenter Email"
								required
								type="email"
								id="presenter_email"
								name="presenter_email"
								className="form-control"
								onChange={handleFormChange}
								value={presenterEmail}
							/>
							<label htmlFor="presenter_email">Presenter Email</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Company Name"
								type="text"
								id="company_name"
								name="company_name"
								className="form-control"
								onChange={handleFormChange}
								value={companyName}
							/>
							<label htmlFor="company_name">Company Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								placeholder="Title"
								required
								type="text"
								name="title"
								id="title"
								className="form-control"
								onChange={handleFormChange}
								value={title}
							/>
							<label htmlFor="title">Title</label>
						</div>
						<div className="mb-3">
							<label className="form-label" htmlFor="synopsis">
								Synopsis
							</label>
							<textarea
								name="synopsis"
								id="synopsis"
								required
								rows="3"
								className="form-control"
								onChange={handleFormChange}
								value={synopsis}></textarea>
						</div>
						<div className="mb-3">
							<select
								required
								id="conference"
								name="conference"
								className="form-select"
								onChange={handleFormChange}
								value={conference}>
								<option value="">Choose a conference</option>
								{conferences.map((conference) => {
									return (
										<option key={conference.id} value={conference.id}>
											{conference.name}
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

export default PresentationForm;
