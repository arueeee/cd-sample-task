import NotificationItem from "./NotificationItem";

function NotificationList() {
	return (
		<div>
			<ul className="list-tabs">
				<li className="tab">
					<a>All</a>
				</li>
				<li className="tab">
					<a>Archived</a>
				</li>
			</ul>
			<div className="action-pane">
				<div className="checkbox-wrapper">
					<input type="checkbox" />
					<span className="checkbox-label">Select All</span>
				</div>
				<div className="action-wrapper">
					<span className="material-symbols-outlined">mail</span>
					<span className="material-symbols-outlined">archive</span>
				</div>
			</div>
			<div className="list-view">
				<NotificationItem />
				<NotificationItem />
			</div>
		</div>
	);
}

export default NotificationList;
