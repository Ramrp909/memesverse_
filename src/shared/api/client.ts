import axios from "axios";
import { AppConfig } from "@/shared/config";

export const apiClient = axios.create({
  baseURL: AppConfig.api.baseURL,
  timeout: AppConfig.api.timeout,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});