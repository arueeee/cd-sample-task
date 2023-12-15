import React from "react";
import logo from "../../assets/img/logo.svg";
import user from "../../assets/img/user.svg";
import Button from "../common/Button";
import Panel from "../common/Panel";

function Header() {
	return (
		<header className="header">
			<div className="header-items">
				<img src={logo} className="logo" alt="logo" />
				<div className="button-group">
					<Button />
				</div>
				<img src={user} className="user-icon" alt="user" />
			</div>
			<Panel />
		</header>
	);
}

export default Header;
