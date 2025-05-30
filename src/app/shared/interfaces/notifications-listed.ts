export interface NotificationsListed {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content?: string;
  link?: string;
  isExpanded?: boolean;
  read: boolean;
  created_at: string;
}
