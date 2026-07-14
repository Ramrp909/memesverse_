import type { ApiUser } from "../types/auth.api";
import type { User } from "../types/auth.model";

export function mapApiUser(user: ApiUser): User {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.profile_picture ?? null,
  };
}