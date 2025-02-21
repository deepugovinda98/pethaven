import React from "react";
import styles from "./PetDetails.module.css";
import Navbar from "../Navbar";
import Footer from "../Footer";


const PetDetails = () => {
  return (
    <div>
      <Navbar />
      <section className={styles.petDetails}>
        <h2 className={styles.title}>Pet Details</h2>
        <p className={styles.description}>More information about the pet...</p>
      </section>
      <Footer />
    </div>
  );
};

export default PetDetails;