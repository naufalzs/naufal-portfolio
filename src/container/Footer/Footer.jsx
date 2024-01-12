import { useState } from "react";
import { motion } from "framer-motion";

import { images } from "../../constants";
import "./Footer.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me!</h2>

      <div className="app__footer-cards">
        <a
          href="mailto:naufal.zufar.s@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="p-text"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.05 }}
            className="app__footer-card"
          >
            <img src={images.email} alt="email" />
            naufal.zufar.s@gmail.com
          </motion.div>
        </a>

        <a
          href="https://wa.me/+6281223768121"
          target="_blank"
          rel="noreferrer"
          className="p-text"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.05 }}
            className="app__footer-card"
          >
            <img src={images.mobile} alt="mobile" />
            Chat me on Whatsapp
          </motion.div>
        </a>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your Name "
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your Email "
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <textarea
              type="text"
              className="p-text"
              placeholder="Your Message "
              name="message"
              value={message}
              onChange={handleChangeInput}
            />
          </div>
          <button className="p-text" type="button" onClick={handleSubmit}>
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in Touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
