import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { IUserNotification } from "../../types/Notification";
import { ViewMode } from "../../constants/Global";

const NotificationList: React.FC<{
	onViewModeChange: (viewMode: string) => void;
}> = ({ onViewModeChange }) => {
	const [notificationList, setNotificationList] = useState<
		IUserNotification[] | []
	>([]);

	const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ALL);
	const [isSelectAll, setSelectAll] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setError] = useState(Boolean);

	useEffect(() => {
		getNotificationList();
	}, []);

	useEffect(() => {
		if (isSelectAll) {
			itemSelection("all");
		} else {
			if (
				notificationList.every(
					(notification) => notification.isSelected === true
				)
			) {
				itemSelection("clear");
			}
		}
	}, [isSelectAll]);

	const toggleSelectAll = () => {
		setSelectAll((prevState) => !prevState);
	};

	const getNotificationList = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				"http://localhost:3001/v1/notifications"
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.status}`);
			}

			const data = await response.json();
			const normalizedData = data.map(
				(notification: IUserNotification) => ({
					...notification,
					isSelected: false,
				})
			);

			// Simulate a 2-second delay using setTimeout
			setTimeout(() => {
				setNotificationList(normalizedData);
				// After the delay, set isLoading to false
				setIsLoading(false);
			}, 1000); // 2-second delay
		} catch (error) {
			console.error("Error fetching notification list:", error);
			setError(true);
			setNotificationList([]);
		}
	};

	const filteredNotifications = notificationList.filter((notification) => {
		if (viewMode === ViewMode.ALL) {
			return !notification.dateArchived;
		}
		return !!notification.dateArchived;
	});

	const hasUnread = (notifications: IUserNotification[]) => {
		return notifications
			.filter((notification) => notification.isSelected)
			.some((notification) => !notification.hasOwnProperty("dateRead"));
	};

	const hasSelected = (notifications: IUserNotification[]): boolean => {
		return notifications.some(
			(notification) => notification.isSelected === true
		);
	};

	const handleTabClick = (tab: string) => {
		if (tab === ViewMode.ARCHIVED) {
			setViewMode(ViewMode.ARCHIVED);
			onViewModeChange(ViewMode.ARCHIVED);
		} else {
			setViewMode(ViewMode.ALL);
			onViewModeChange(ViewMode.ALL);
		}
		itemSelection("clear");
	};

	const itemSelection = (operation: string, id?: number) => {
		let updatedSelection: IUserNotification[];

		switch (operation) {
			case "add":
				updatedSelection = notificationList.map((notification) => {
					if (notification.userNotificationId === id) {
						return {
							...notification,
							isSelected: true,
						};
					}
					return notification;
				});
				break;
			case "remove":
				updatedSelection = notificationList.map((notification) => {
					if (notification.userNotificationId === id) {
						return {
							...notification,
							isSelected: false,
						};
					}
					return notification;
				});
				break;
			case "all":
				updatedSelection = notificationList.map((notification) => ({
					...notification,
					isSelected: true,
				}));
				break;
			case "clear":
				updatedSelection = notificationList.map((notification) => ({
					...notification,
					isSelected: false,
				}));
				break;
			default:
				updatedSelection = notificationList;
				break;
		}

		setNotificationList(updatedSelection);
	};

	const archiveNotification = () => {
		const updatedNotifications = notificationList.map((notification) => {
			if (notification.isSelected) {
				return {
					...notification,
					dateArchived: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
					archivedByUserSub: "curr-user",
					archivedByUserName: "Current User",
					isSelected: false,
				};
			}
			return notification;
		});
		setSelectAll(false);
		setNotificationList(updatedNotifications);
	};

	const unarchiveNotification = () => {
		const updatedNotifications = notificationList.map((notification) => {
			if (notification.isSelected && notification.dateArchived) {
				const {
					dateArchived,
					archivedByUserSub,
					archivedByUserName,
					...rest // Exclude specified properties from the rest of the notification properties
				} = notification;

				return {
					...rest,
					isSelected: false,
				};
			}
			return notification;
		});

		setSelectAll(false);
		itemSelection("clear");
		setNotificationList(updatedNotifications);
	};

	const readNotification = () => {
		const updatedNotifications = notificationList.map((notification) => {
			if (notification.isSelected) {
				return {
					...notification,
					dateRead: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
					readByUserSub: "curr-user",
					readByUserName: "Current User",
				};
			}
			return notification;
		});
		setNotificationList(updatedNotifications);
	};

	const unreadNotification = () => {
		const updatedNotifications = notificationList.map((notification) => {
			if (notification.isSelected && notification.dateRead) {
				const {
					dateRead,
					readByUserSub,
					readByUserName,
					...rest // Exclude specified properties from the rest of the notification properties
				} = notification;

				return {
					...rest,
				};
			}
			return notification;
		});

		setNotificationList(updatedNotifications);
	};

	return (
		<div>
			<ul className="list-tabs">
				<li
					className={`tab ${
						viewMode === ViewMode.ALL ? "is-active" : ""
					}`}
					onClick={() => handleTabClick(ViewMode.ALL)}
				>
					All
				</li>
				<li
					className={`tab ${
						viewMode === ViewMode.ARCHIVED ? "is-active" : ""
					}`}
					onClick={() => handleTabClick(ViewMode.ARCHIVED)}
				>
					Archived
				</li>
			</ul>
			<div
				className={`action-pane ${
					!hasSelected(notificationList) ? "hide-slide" : ""
				}`}
			>
				<div>
					<div className="checkbox-wrapper" onClick={toggleSelectAll}>
						<input
							type="checkbox"
							checked={isSelectAll}
							onChange={(e) => setSelectAll(e.target.checked)}
						/>
						<span className="checkbox-label">
							{isSelectAll ? "Deselect All" : "Select All"}
						</span>
					</div>
				</div>
				<div className="action-wrapper">
					{hasUnread(notificationList) && (
						<span
							className={`material-icons ${
								viewMode === ViewMode.ARCHIVED ? "hidden" : ""
							}`}
							onClick={() => readNotification()}
						>
							drafts
						</span>
					)}
					{!hasUnread(notificationList) && (
						<span
							className={`material-icons ${
								viewMode === ViewMode.ARCHIVED ? "hidden" : ""
							}`}
							onClick={() => unreadNotification()}
						>
							mark_email_unread
						</span>
					)}
					{viewMode === ViewMode.ALL && (
						<span
							className="material-icons"
							onClick={() => archiveNotification()}
						>
							archive
						</span>
					)}
					{viewMode === ViewMode.ARCHIVED && (
						<span
							className="material-icons"
							onClick={() => unarchiveNotification()}
						>
							unarchive
						</span>
					)}
				</div>
			</div>
			<div
				className={`list-view ${
					!hasSelected(notificationList) ? "hide-slide" : ""
				}`}
			>
				<div>
					{filteredNotifications.length > 0 ? (
						filteredNotifications
							.sort(
								(
									a: IUserNotification,
									b: IUserNotification
								) => {
									// Sort by notificationDate to newest first
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
									readNotification={readNotification}
									itemSelection={itemSelection}
									isSelected={notification.isSelected}
									isSelectAll={isSelectAll}
									setSelectAll={setSelectAll}
								/>
							))
					) : isLoading ? (
						<div className="loader-wrapper">
							<span className="loader"></span>
							<div className="main-lbl">
								Fetching Notifications
							</div>
						</div>
					) : (
						<div className="empty-list">
							{viewMode === ViewMode.ALL && (
								<div>
									<div className="material-icons-outlined icon">
										notifications
									</div>
									<div className="main-lbl">
										No New Notifications
									</div>
									<div className="sub-lbl">
										We'll notify you when something arrives
									</div>
								</div>
							)}
							{viewMode === ViewMode.ARCHIVED && (
								<div>
									<div className="material-icons icon">
										archive
									</div>
									<div className="main-lbl">
										Archive is empty
									</div>
									<div className="sub-lbl">
										Notifications are automatically archived
										after 60 days
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationList;
