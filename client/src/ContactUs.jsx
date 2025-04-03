import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import Navbar from "./navbar";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs
      .send(
        "service_ulfegrj", // Replace with your actual EmailJS service ID
        "template_fikpdw7", // Replace with your actual EmailJS template ID
        templateParams,
        "9HlwFosI1V8KIvjCz" // Replace with your actual EmailJS user/public key
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        alert("Failed to send message.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Have questions? Feel free to reach out to us!</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
