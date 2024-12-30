import React from "react";
import styles from "./style.module.scss";
import icon from "./icon.svg";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function Inaccessibility() {
  return (
    <DashboardLayout>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.mainImage}>
            <img src={icon} alt="" />
          </div>
          <div className={styles.mainTitle}>
            <h1 className={styles.errorCode}>403</h1>
            <h2 className={styles.Page404Title}> No accessibility </h2>
            <p>
            Sorry, you do not have permission to access this page. Coordinate with site management.
            </p>
            <button onClick={Navigate("/dashboard")} className={`${styles.btn} ${styles.green}`}>Dashboard</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}