import { useEffect, useState } from "react";
import { IUserNotification } from "../../types/Notification";
import avatar0 from "../../assets/img/avatar_0.png";
import avatar1 from "../../assets/img/avatar_1.png";
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
	const [isChecked, setIsChecked] = useState(isSelected); // State to manage checked status

	useEffect(() => {
		setIsChecked(isSelected); // Update isChecked when isSelected prop changes
	}, [isSelected]);

	const handleCheckboxChange = () => {
		if (isSelectAll) {
			setSelectAll(false); // If SelectAll is true, set it to false
		}
		setIsChecked(!isChecked);

		itemSelection(
			isChecked ? "remove" : "add",
			notification.userNotificationId
		);
	};

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

	const formatTime = (date: string) => {
		const targetDate = new Date(date);
		const currentDate = new Date();
		const elapsedMilliseconds =
			currentDate.getTime() - targetDate.getTime();
		const seconds = Math.floor(elapsedMilliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) {
			return `${days} day${days !== 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
		} else {
			return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
		}
	};

	const getPriorityLbl = (prio: string) => {
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
			// onClick={() => readNotification(notification.userNotificationId)}
		>
			<input
				type="checkbox"
				className="list-checkbox"
				checked={isChecked} // Set the checked state
				onChange={handleCheckboxChange} // Update state on change
			/>
			<img
				src={getIconType(notification.notificationType)}
				className="notifIcon"
				alt="avatar"
			/>
			<div className="detail-wrapper">
				<div className="notif-header">
					<span className="title">{notification.title}</span>
					{notification.dateRead === undefined
						? getPriorityLbl(notification.notificationImportance)
						: ""}
				</div>
				<div>
					<span className="desc">{notification.description}</span>
				</div>
				<div className="read-users">
					<span className="seen">Read by</span>
					<img src={avatar1} className="user-avatar" alt="avatar" />
				</div>
			</div>
			<span
				className="time-elapsed tooltip-enabled"
				data-text={new Date(
					notification.notificationDate!
				).toLocaleString()}
			>
				{formatTime(notification.notificationDate!)}
			</span>
		</div>
	);
};

export default NotificationItem;
