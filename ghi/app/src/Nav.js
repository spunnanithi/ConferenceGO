import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand text-black">Conference GO!</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="http://localhost:3000/">
								Home
							</a>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="locations/new">
								New Location
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="conferences/new">
								New Conference
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="presentations/new"
								aria-current="page">
								New Presentation
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="attendees/new">
								New Attendees
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="attendees">
								List Attendees
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
