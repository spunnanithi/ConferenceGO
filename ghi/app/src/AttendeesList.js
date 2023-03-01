const AttendeesList = (props) => {
	return (
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
	);
};

export default AttendeesList;
