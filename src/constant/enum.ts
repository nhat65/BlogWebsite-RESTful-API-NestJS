export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AppealType {
  POST = 'post',
  USER = 'user',
}

export enum AppealStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export enum PostStatus {
  POSTED = 'posted',
  SCHEDULED = 'scheduled',
  HIDDEN = 'hidden',
}

export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export enum UserStatus {
  ACTIVED = 'actived',
  LOCKED = 'locked',
  DELETED = 'deleted',
}

export enum ReportStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}
