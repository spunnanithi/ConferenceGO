import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendeeConferenceForm from "./AttendeeConferenceForm";

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<>
			<Nav />
			<div className="container">
				<AttendeeConferenceForm />
				{/* <ConferenceForm /> */}
				{/* <LocationForm /> */}
				{/* <AttendeesList attendees={props.attendees} /> */}
			</div>
		</>
	);
}

export default App;
