import React from "react";
import Lottie from "react-lottie-player";
import noData1 from "../../lottie/noData1.json";
import styles from "./Lotties.module.css";

function Lotties() {
  return (
    <div className="flex flex-col justify-center items-center  ">
    <div className="sm:w-[550px] flex justify-center flex-col items-center">
    <Lottie loop animationData={noData1} play />
    <h1 className={styles.noData1Text}> There is no data!</h1></div>
  </div>
  );
}

export default Lotties;
