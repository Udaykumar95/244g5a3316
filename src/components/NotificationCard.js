import "./NotificationCard.css";

function NotificationCard({ notification }) {
  const { type, message, timestamp } = notification;

  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleString()
    : "Timestamp unavailable";

  return (
    <article className="notification-card">
      <div className="card-topline">
        <span className={`type-badge ${type.toLowerCase()}`}>{type}</span>
        <time>{formattedDate}</time>
      </div>
      <p className="notification-message">{message}</p>
    </article>
  );
}

export default NotificationCard;
