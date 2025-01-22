"use client";

import { useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chatbot for OnlyFans Models</h1>
      <p className={styles.subtitle}>Join the waitlist to be among the first to try it out!</p>
      {success ? (
        <p className={styles.successMessage}>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.emailInput}
          />
          <button type="submit" className={styles.submitButton}>
            Join Waitlist
          </button>
        </form>
      )}
    </div>
  );
}
