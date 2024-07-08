import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const DashboardLayout = ({ children }) => {
	const [session, setSession] = useState();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem('session'));
		if (session) {
			setSession(session);
		} else {
			navigate('/login');
		}
	}, [navigate, location]);

	const handleLogout = () => {
		localStorage.clear('session');
		navigate('/login');
	};

	return (
		<div className="container-fluid">
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
							<span className="fs-5 d-none d-sm-inline">
								Student Management System
							</span>
						</div>
						<ul
							className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start container"
							id="menu"
						>
							<li className="nav-item" style={{ width: '100%' }}>
								<NavLink
									to="/"
									className="nav-link align-middle px-0"
								>
									<span className="ms-1 d-none d-sm-inline">
										Home
									</span>
								</NavLink>
							</li>

							<li className="nav-item" style={{ width: '100%' }}>
								<NavLink
									to="/students"
									className="nav-link px-0 align-middle"
								>
									<span className="ms-1 d-none d-sm-inline">
										Students
									</span>
								</NavLink>
							</li>
						</ul>
						<hr />
						<div className="dropdown pb-4">
							<span
								style={{ cursor: 'grab' }}
								onClick={() => handleLogout()}
								className="d-flex align-items-center text-white text-decoration-none"
							>
								<img
									src={`https://ui-avatars.com/api/?name=${session?.user?.name}`}
									alt="admin"
									width="30"
									height="30"
									className="rounded-circle"
								/>
								<span className="d-none d-sm-inline mx-1">
									{session?.user?.name}
								</span>
							</span>
						</div>
					</div>
				</div>
				<div className="col" style={{ padding: 30 }}>
					{children}
				</div>
			</div>
		</div>
	);
};
