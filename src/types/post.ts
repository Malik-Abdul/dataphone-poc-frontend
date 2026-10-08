import { BaseEntity } from "./common";
import { User } from "./user";

export interface Post extends BaseEntity {
  title: string;
  content: string;
  author: User;
  commentsCount: number;
  reactionsCount: number;
}

export interface CreatePostDto {
  title: string;
  content: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}
