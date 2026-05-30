import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../services/api";
import { logger } from "../services/logger";

const PAGE_LIMIT = 6;

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    logger("Page visit: All Notifications");
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      setError("");

      try {
        const data = await getNotifications(page, PAGE_LIMIT);
        setNotifications(data);
      } catch (apiError) {
        setError("Unable to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [page]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">All Notifications</h1>
          <p className="page-subtitle">
            View every campus notification received from the notifications
            microservice.
          </p>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && error && <div className="status-box error">{error}</div>}

      {!loading && !error && notifications.length === 0 && (
        <div className="status-box">No notifications found.</div>
      )}

      {!loading && !error && notifications.length > 0 && (
        <>
          <div className="notification-grid">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              className="pager-button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="page-count">Page {page}</span>
            <button
              className="pager-button"
              disabled={notifications.length < PAGE_LIMIT}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default AllNotifications;
