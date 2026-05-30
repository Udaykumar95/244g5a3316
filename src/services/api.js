import axios from "axios";
import { logger, logError } from "./logger";
import { getTopPriorityNotifications } from "../utils/prioritySort";

export const API_ENDPOINT =
  "/notifications.json";

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNDRnNWEzMzE2QHNyaXQuYWMuaW4iLCJleHAiOjE3ODAxMjM3NTksImlhdCI6MTc4MDEyMjg1OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjU5MjQzOTdmLTA4YmUtNDQ5Yy04MzRkLWU1ZTZiMDE5MThmOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InlhcGFybGEgdWRheWt1bWFyIiwic3ViIjoiZjNjMTFkOWQtNWZjOS00OGU3LWEzNGUtNzA2Nzc5YTQ1ZTk5In0sImVtYWlsIjoiMjQ0ZzVhMzMxNkBzcml0LmFjLmluIiwibmFtZSI6InlhcGFybGEgdWRheWt1bWFyIiwicm9sbE5vIjoiMjQ0ZzVhMzMxNiIsImFjY2Vzc0NvZGUiOiJTZGtqSkciLCJjbGllbnRJRCI6ImYzYzExZDlkLTVmYzktNDhlNy1hMzRlLTcwNjc3OWE0NWU5OSIsImNsaWVudFNlY3JldCI6InNOa3J5RXN4R1dkUktDV0gifQ.3ielWPhxiQiIO9WH7EKum3_Fh7AsSFQWo57pyTVIsp4";

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

function normalizeNotification(item, index) {
  return {
    id: item.id || item.notification_id || index + 1,
    type: item.type || item.notification_type || "Event",
    message: item.message || item.notification_message || item.title || "",
    timestamp:
      item.timestamp ||
      item.created_at ||
      item.createdAt ||
      new Date().toISOString()
  };
}

function normalizeResponse(data) {
  const list = Array.isArray(data) ? data : data.notifications || data.data || [];
  return list.map(normalizeNotification);
}

function applyLocalPagination(notifications, page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  return notifications.slice(startIndex, startIndex + limit);
}

async function fetchNotificationsFromApi(params = {}) {
  logger("Fetching notifications", params);

  try {
    const response = await apiClient.get("", { params });
    logger("API response received", response.data);
    return normalizeResponse(response.data);
  } catch (error) {
    logError("API error while fetching notifications", error);
    throw error;
  }
}

export async function getNotifications(page = 1, limit = 10) {
  const notifications = await fetchNotificationsFromApi({ page, limit });
  return applyLocalPagination(notifications, page, limit);
}

export async function getNotificationsByType(type, page = 1, limit = 10) {
  const params = {
    page,
    limit,
    notification_type: type === "All" ? "" : type
  };

  const notifications = await fetchNotificationsFromApi(params);

  const filteredNotifications =
    type === "All"
      ? notifications
      : notifications.filter((notification) => notification.type === type);

  return applyLocalPagination(filteredNotifications, page, limit);
}

export async function getPriorityNotifications() {
  const notifications = await fetchNotificationsFromApi({
    page: 1,
    limit: 10
  });

  return getTopPriorityNotifications(notifications, 10);
}
