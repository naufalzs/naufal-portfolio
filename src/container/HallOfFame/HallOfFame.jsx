import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./HallOfFame.scss";
import { client, urlFor } from "../../client";

const About = () => {
  const [hallOfFame, setHallOfFame] = useState([]);

  useEffect(() => {
    const query = `*[_type == "worksNew" && isHallOfFame] {
        _id,
        title,
        shortDescription,
        githubUrl,
        siteUrl,
        stack[]->{icon, name},
        workImages
      }
    `;

    client.fetch(query).then((data) => {
      setHallOfFame(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        <span>Project</span> Hall of <span>Fame</span>
      </h2>
      <div className="app__profiles">
        {hallOfFame.map((selected, index) => (
          <motion.article
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="app__profile-item"
            key={selected.title + index}
          >
            {/* image */}
            <div className="app__profile-image">
              <img src={urlFor(selected.workImages[0])} alt={selected.title} />
              <div className="app__profile-overlay">
                <div className="app__profile-stack-list">
                  {selected?.stack?.map((tech) => (
                    <div
                      className="app__profile-stack-item app__flex"
                      key={tech.name}
                    >
                      <div className="app__flex">
                        <img src={urlFor(tech.icon)} alt={tech.name} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="app__profile-link-list">
                  <a href={selected.githubUrl} target="_blank" rel="noreferrer">
                    <div className="app__profile-link-item app__flex">
                      <AiFillGithub />
                    </div>
                  </a>
                  <a href={selected.siteUrl} target="_blank" rel="noreferrer">
                    <div className="app__profile-link-item app__flex">
                      <FiExternalLink />
                    </div>
                  </a>
                </div>
              </div>
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__profile-hover"
              >
                <a href={selected.githubUrl} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
                <a href={selected.siteUrl} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <FiExternalLink />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            {/* title and desc */}
            <h3 className="bold-text" style={{ marginTop: 20 }}>
              {selected.title}
            </h3>
            <div className="p-text" style={{ marginTop: 10 }}>
              <PortableText value={selected.shortDescription} />
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "hall of fame",
  "app__whitebg"
);
