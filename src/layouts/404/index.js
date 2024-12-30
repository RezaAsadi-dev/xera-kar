import React from "react";
import styles from "./style.module.scss";
import icon from "./icon.svg";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.mainImage}>
            <img src={icon} alt="" />
          </div>
          <div className={styles.mainTitle}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.Page404Title}> No page has been found! </h2>
            <p>
            The desired page may have been moved. Please use the site menu to find the desired page.
            </p>
            {/* <button className={`${styles.btn} ${styles.green}`}>HOME</button> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
