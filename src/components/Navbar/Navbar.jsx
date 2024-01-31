import { useState } from "react";
import { images, navigationList } from "../../constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`app__navbar-backdrop ${
          toggle ? "app__navbar-backdrop--active" : ""
        }`}
        onClick={() => setToggle(false)}
      />
      <header className="app__navbar">
        <div className="app__navbar-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <nav className="app__navbar-links-container">
          <ul className="app__navbar-links">
            {navigationList.map((item) => (
              <li className="app__flex p" key={`link-${item}`}>
                <div />
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [250, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              <nav className="app__navbar-menu-mobile-container">
                <ul className="app__navbar-menu-mobile">
                  {navigationList.map((item) => (
                    <li key={item}>
                      <a href={`#${item}`} onClick={() => setToggle(false)}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
