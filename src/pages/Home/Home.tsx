import React from "react";
import Navbar from "../../components/Layout/Navbar";
import styles from "./Home.module.scss";


function Home() {
  return (
    <>
    <div className={styles.container}>
      <Navbar></Navbar>
      <div className={styles.backgroundImage}/>
     
    </div>
    </>
  );
}

export default Home;
