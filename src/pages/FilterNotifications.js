import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NotificationCard from "../components/NotificationCard";
import { getNotificationsByType } from "../services/api";
import { logger } from "../services/logger";

const FILTERS = ["All", "Placement", "Result", "Event"];
const PAGE_LIMIT = 6;

function FilterNotifications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    logger("Page visit: Filter Notifications");
  }, []);

  useEffect(() => {
    async function loadFilteredNotifications() {
      setLoading(true);
      setError("");

      try {
        const data = await getNotificationsByType(
          activeFilter,
          page,
          PAGE_LIMIT
        );
        setNotifications(data);
      } catch (apiError) {
        setError("Unable to filter notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadFilteredNotifications();
  }, [activeFilter, page]);

  function handleFilterChange(filter) {
    setActiveFilter(filter);
    setPage(1);
    logger(`Filter selected: ${filter}`);
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">Filter Notifications</h1>
          <p className="page-subtitle">
            Filter campus updates by notification type without leaving the page.
          </p>
        </div>
      </div>

      <div className="toolbar">
        <div className="filter-buttons">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filter-button ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading && <Loader />}

      {!loading && error && <div className="status-box error">{error}</div>}

      {!loading && !error && notifications.length === 0 && (
        <div className="status-box">No matching notifications found.</div>
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

export default FilterNotifications;
