export type INotificationImportance = "popup" | "high" | "medium" | "default";

export type IUserNotificationType =
	| "task" //task to action  & link to that thing
	| "reminder" //a reminder to do something & link to that thing
	| "comment"; // a comment by another user & link to that comment

export interface IUserNotification {
	userNotificationId: number;

	title: string;
	description?: string;

	notificationType: IUserNotificationType;
	notificationDate?: string;

	//link to page within application
	notificationUrl?: number;
	notificationImportance: INotificationImportance;

	createdDate?: string;
	modifiedDate?: string;

	//notification author (may be another user, or created by themselves)
	createdByUserSub?: string;
	createdByUserName?: string;

	dateRead?: string;

	//read by user may not be the same as logged in user (if notifcation is sent to a team responsible for collectively actioning notification)
	readByUserSub?: string;
	readByUserName?: string;

	//only present on archived
	dateArchived?: string;
	archivedByUserSub?: string;
	archivedByUserName?: string;

	isSelected: boolean;
}
