import { CreatePostDto, Post, UpdatePostDto } from "@/types/post";
import { BaseService } from "./base.service";
import { API } from "@/lib/api";

class PostsService extends BaseService<Post, CreatePostDto, UpdatePostDto> {
  constructor() {
    super(API.posts.list);
  }
}
