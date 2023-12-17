import { useEffect, useState } from "react";
import { IUserNotification } from "../../types/Notification";
import { formatTime } from "../../utils/CommonUtils";
import user from "../../assets/img/user_mini.png";
import otherUser from "../../assets/img/ouser_mini.png";
import taskIcon from "../../assets/img/task_icon.svg";
import reminderIcon from "../../assets/img/reminder_icon.svg";
import commentIcon from "../../assets/img/comment_icon.svg";
import highPrioIcon from "../../assets/img/high_prio.svg";
import medPrioIcon from "../../assets/img/med_prio.svg";

const NotificationItem: React.FC<{
	notification: IUserNotification;
	readNotification: (notificationId: number) => void;
	itemSelection: (operation: string, notificationId: number) => void;
	isSelected: boolean;
	isSelectAll: boolean;
	setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	notification,
	readNotification,
	itemSelection,
	isSelected,
	isSelectAll,
	setSelectAll,
}) => {
	const [isChecked, setIsChecked] = useState(isSelected);

	useEffect(() => {
		setIsChecked(isSelected); // Update isChecked when isSelected prop changes
	}, [isSelected]);

	const handleCheckboxChange = () => {
		if (isSelectAll) {
			setSelectAll(false);
		}
		setIsChecked(!isChecked);

		itemSelection(
			isChecked ? "remove" : "add",
			notification.userNotificationId
		); // modifies notificationList[x].isSelected value when checked or unchecked
	};

	// Sets notification type icon for notification item
	const getIconType = (type: string) => {
		switch (type) {
			case "comment":
				return commentIcon;

			case "reminder":
				return reminderIcon;

			default:
				return taskIcon;
		}
	};

	// Sets priority icon for notification item
	const getPriorityIcon = (prio: string) => {
		switch (prio) {
			case "high":
				return (
					<img src={highPrioIcon} className="prio high" alt="prio" />
				);

			case "medium":
				return (
					<img src={medPrioIcon} className="prio med" alt="prio" />
				);

			default:
				return;
		}
	};

	return (
		<div
			className={`list-item ${
				notification.dateRead !== undefined ? "is-read" : ""
			} ${isChecked ? "is-selected" : ""}`}
		>
			<input
				type="checkbox"
				className="list-checkbox"
				checked={isChecked}
				onChange={handleCheckboxChange}
			/>
			<img
				src={getIconType(notification.notificationType)}
				className="notifIcon"
				alt="avatar"
			/>
			<div className="detail-wrapper">
				<div className="notif-header">
					<span
						className="title"
						onClick={() =>
							readNotification(notification.userNotificationId)
						}
					>
						{notification.title}
					</span>
					{notification.dateRead === undefined
						? getPriorityIcon(notification.notificationImportance)
						: ""}
				</div>
				<div>
					<span className="desc">{notification.description}</span>
				</div>
				{notification.readByUserSub && (
					<div className="read-users">
						<span className="seen">Read by</span>
						{notification.readByUserSub === "curr-user" && (
							<img
								src={user}
								className="user-avatar"
								alt="avatar"
							/>
						)}
						{notification.readByUserSub !== "curr-user" && (
							<img
								src={otherUser}
								className="user-avatar"
								alt="avatar"
							/>
						)}
					</div>
				)}
			</div>
			<span
				className="time-elapsed tooltip-enabled"
				data-text={new Date(
					notification.notificationDate!
				).toLocaleString()} //Tooltip text value
			>
				{formatTime(notification.notificationDate!)}
			</span>
		</div>
	);
};

export default NotificationItem;
