import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NotificationCard from "../components/NotificationCard";
import { getPriorityNotifications } from "../services/api";
import { logger } from "../services/logger";

function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    logger("Page visit: Priority Inbox");

    async function loadPriorityNotifications() {
      setLoading(true);
      setError("");

      try {
        const data = await getPriorityNotifications();
        setNotifications(data);
      } catch (apiError) {
        setError("Unable to load priority notifications.");
      } finally {
        setLoading(false);
      }
    }

    loadPriorityNotifications();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">Priority Inbox</h1>
          <p className="page-subtitle">
            Top 10 notifications sorted by Placement, Result, Event, and then
            latest timestamp.
          </p>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && error && <div className="status-box error">{error}</div>}

      {!loading && !error && notifications.length === 0 && (
        <div className="status-box">No priority notifications found.</div>
      )}

      {!loading && !error && notifications.length > 0 && (
        <div className="notification-grid">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </section>
  );
}

export default PriorityInbox;
