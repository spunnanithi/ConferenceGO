import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendeeConferenceForm from "./AttendeeConferenceForm";
import PresentationForm from "./PresentationForm";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="conferences">
						<Route path="new" element={<ConferenceForm />}></Route>
					</Route>
					<Route
						path="attendees/new"
						element={<AttendeeConferenceForm />}></Route>
					<Route path="locations">
						<Route path="new" element={<LocationForm />}></Route>
					</Route>
					<Route
						path="attendees"
						element={<AttendeesList attendees={props.attendees} />}></Route>
					<Route path="presentations">
						<Route path="new" element={<PresentationForm />}></Route>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
