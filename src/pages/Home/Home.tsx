import React from "react";
import Navbar from "../../components/Layout/Navbar";
import styles from "./Home.module.scss";
import students_img from "./students.jpeg";



function Home() {
  return (
    <>
      <div className={styles.container + " " + styles.bodyHome}>
        <div className={styles.shadow}><Navbar></Navbar></div>
        <div className={styles.name}> <b>uniManager</b></div>
        <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div className={styles.students_img + " " + styles.shadow}>
          <img src={students_img} alt="Students" />
        </div>
      </div>
    </>
  );
}

export default Home;
