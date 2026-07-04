import { apiClient } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { FeedApiResponse } from "../types/feed.api";

export class FeedRepository {
  static async getFeed(cursor?: number) {
    const response = await apiClient.get<FeedApiResponse>(
      API_ENDPOINTS.FEED.LIST,
      {
        params: {
          cursor,
        },
      }
    );

    return response.data;
  }
}