import styles from "./Notification.module.css";

export default function Notification({ notification }) {
  return (
    <>
      <p className={styles.notificationText} style={{color: notification.color, display: notification.isVisible ? "block" : "none"}}>{notification.text}</p>
    </>
  );
}
