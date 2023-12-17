import React from "react";
import logo from "../../assets/img/logo.png";
import user from "../../assets/img/user.svg";
import Panel from "../common/Panel";

function Header() {
	return (
		<header className="header">
			<div className="header-items">
				<img src={logo} className="logo" alt="logo" />
				<div className="button-group">
					<button className="circle notification">
						<span className="material-icons-outlined">
							notifications
						</span>
					</button>
				</div>
				<img src={user} className="user-icon" alt="user" />
			</div>
			<Panel />
		</header>
	);
}

export default Header;
