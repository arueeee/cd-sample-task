import { useEffect, useState } from "react";
import NotificationList from "../notification/NotificationList";
import { ViewMode } from "../../constants/Global";

function Panel() {
	const [viewMode, setViewMode] = useState(ViewMode.ALL.toString());

	// Callback function to update viewmode in Panel component
	const onViewModeChange = (viewMode: string) => {
		console.log(viewMode);
		setViewMode(viewMode);
	};

	return (
		<div className="panel">
			<div className="panel-wrapper">
				<div className="panel-header">
					<h2>Notifications</h2>
				</div>
				<div className="panel-content">
					<NotificationList onViewModeChange={onViewModeChange} />
				</div>
			</div>
			<div className="panel-footer">
				{viewMode === ViewMode.ALL && (
					<span>
						Notifications are automatically archived after 60 days
					</span>
				)}
			</div>
		</div>
	);
}

export default Panel;
