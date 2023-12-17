import { motion } from "framer-motion";

import { images } from "../../constants";
import "./About.scss";

const abouts = [
  {
    title: "Web Designer",
    description:
      "I am Web designer with a passion for creating beautiful and functional web application",
    imgUrl: images.about01,
  },
  {
    title: "React Native Developer",
    description:
      "I am React Native developer with a passion for creating beautiful and functional web application",
    imgUrl: images.about02,
  },
  {
    title: "Backend Developer",
    description:
      "I am Backend developer with a passion for creating beautiful and functional web application",
    imgUrl: images.about03,
  },
  {
    title: "Frontend Developer",
    description:
      "I am Frontend developer with a passion for creating beautiful and functional web application",
    imgUrl: images.about04,
  },
];

const About = () => {
  return (
    <>
      <h2 className="head-text">
        I Know That
        <span> Good Apps</span>
        <br />
        means
        <span> Good Business</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default About;
