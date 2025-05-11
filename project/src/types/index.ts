export type UserRole = 'author' | 'editor' | 'reviewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
  bio?: string;
}

export type PaperStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under-review' 
  | 'revision-requested' 
  | 'accepted' 
  | 'rejected' 
  | 'published';

export interface Paper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  status: PaperStatus;
  submittedAt?: Date;
  updatedAt: Date;
  publishedAt?: Date;
  fileUrl?: string;
  version: number;
  editorId?: string;
}

export interface Review {
  id: string;
  paperId: string;
  reviewerId: string;
  comments: string;
  score: number; // 1-10
  decision: 'accept' | 'revise' | 'reject';
  createdAt: Date;
  updatedAt: Date;
  isComplete: boolean;
}

export interface Revision {
  id: string;
  paperId: string;
  version: number;
  changes: string;
  fileUrl: string;
  submittedAt: Date;
}