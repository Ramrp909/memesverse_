import type { ApiUser } from "../types/auth.api";
import type { User } from "../types/auth.model";

export function mapApiUser(user: ApiUser): User {
  return {
    id: user.id,
    username: user.user_name,
    email: user.email,
    avatar: user.profile_pic ?? null,
  };
}