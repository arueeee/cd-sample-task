import { useState } from "react";
import logo from "../../assets/img/logo.png";
import user from "../../assets/img/user.png";
import Panel from "../common/Panel";

function Header() {
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const togglePanel = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	return (
		<header className="header">
			<div className="header-items">
				<img src={logo} className="logo" alt="logo" />
				<div className="button-group">
					<button
						className={`circle notification ${
							isPanelOpen ? "active" : ""
						}`}
						onClick={togglePanel}
					>
						<span className="material-icons-outlined">
							notifications
						</span>
					</button>
				</div>
				<div className="user-icon">
					<img src={user} alt="user" />
				</div>
			</div>
			{isPanelOpen && <Panel closePanel={togglePanel} />}
		</header>
	);
}

export default Header;
