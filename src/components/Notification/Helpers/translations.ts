export interface INotificationTranslations {
  icon: string;
  badge: string;
  textTruncation: string;
  closeAction: string;
  counterAction: string;
}

export const defaultTranslations: INotificationTranslations = {
  icon: "icon",
  badge: "Badge representing number of times notification has occured: ",
  textTruncation: "Expand/collapse",
  closeAction: "Close notification",
  counterAction: "Counter: ",
};
