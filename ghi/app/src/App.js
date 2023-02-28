import Nav from "./Nav";

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<>
			<Nav />

			<div className="container">
				<table className="table table-hover table-striped">
					<thead className="table-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Conference</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{props.attendees.map((attendee) => {
							return (
								<tr key={attendee.href}>
									<td>{attendee.name}</td>
									<td>{attendee.conference}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
