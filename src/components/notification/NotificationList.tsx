import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { IUserNotification } from "../../types/Notification";

function NotificationList() {
	const [notificationList, setNotificationList] = useState<
		Array<IUserNotification> | []
	>([]);

	useEffect(() => {
		getNotificationList();
	}, []);

	const markNotificationAsRead = (id: number) => {
		const updatedNotifications = notificationList.map((notification) => {
			if (notification.userNotificationId === id) {
				return {
					...notification,
					dateRead: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "), // Set isRead to true for the clicked notification
				};
			}
			return notification;
		});

		setNotificationList(updatedNotifications);
	};

	const getNotificationList = async () => {
		const response = await fetch("http://localhost:3001/v1/notifications");
		const data = await response.json();
		// const notificationsWithReadStatus = data.map(
		// 	(notification: IUserNotification) => ({
		// 		...notification,
		// 		isRead: false, // Set the initial value to false for each notification
		// 	})
		// );
		// console.log(notificationsWithReadStatus);
		setNotificationList(data);
	};

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
				<div>
					{notificationList.length > 0 ? (
						notificationList
							.filter(
								(notification: IUserNotification) =>
									!notification.dateArchived
							)
							.sort(
								(
									a: IUserNotification,
									b: IUserNotification
								) => {
									// Sort by notificationDate in descending order
									return (
										new Date(
											b.notificationDate!
										).getTime() -
										new Date(a.notificationDate!).getTime()
									);
								}
							)
							.map((notification: IUserNotification, index) => (
								<NotificationItem
									key={index}
									notification={notification}
									markNotificationAsRead={
										markNotificationAsRead
									}
								/>
							))
					) : (
						<div>Empty</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default NotificationList;
