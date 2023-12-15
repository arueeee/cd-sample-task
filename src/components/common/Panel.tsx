import React from "react";
import NotificationList from "../notification/NotificationList";

function Panel() {
	return (
		<div className="panel">
			<div className="panel-header">
				<h2>Notifications</h2>
			</div>
			<div className="panel-content">
				<NotificationList />
			</div>
			<div className="panel-footer">
				<span>
					Notifications are automatically archived after 60 days
				</span>
			</div>
		</div>
	);
}

export default Panel;
