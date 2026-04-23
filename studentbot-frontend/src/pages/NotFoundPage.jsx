// pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={styles.page}>
    <div className={styles.code}>404</div>
    <h2 className={styles.title}>Page not found</h2>
    <p className={styles.text}>This route doesn't exist in our campus portal.</p>
    <Link to="/chat" className={styles.link}>
      ← Back to Chat
    </Link>
  </div>
);

export default NotFoundPage;
