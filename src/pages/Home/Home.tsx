import React from "react";
import Navbar from "../../components/Layout/Navbar";
import styles from "./Home.module.scss";
import students_img from "../../img/happy_students.png";




function Home() {
  return (
    <>
      <div className={styles.bodyHome}>
        <div className={styles.container}>
          <div className={styles.shadow}><Navbar></Navbar></div>
          <div className={styles.name}> <b>uniManager</b></div>
          <div className={styles.description + " " + styles.whiteShadow}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
          <div className={styles.students_img}>
            <img src={students_img} alt="Students" />
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
