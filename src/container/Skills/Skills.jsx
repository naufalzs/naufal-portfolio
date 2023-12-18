import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {Tooltip} from "react-tooltip";

import "./Skills.scss";
import { client, urlFor } from "../../client";
import { AppWrap } from "../../wrapper";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const skillQuery = `*[_type == "skills"]`;
    const experienceQuery = `*[_type == "experiences"]`;

    client.fetch(skillQuery).then((data) => {
      setSkills(data);
    });
    client.fetch(experienceQuery).then((data) => {
      setExperiences(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__exp-list">
          {experiences?.map((experience) => (
            <motion.div className="app__exp-item" key={experience.year}>
              <div className="app__exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <div className="app__exp-work-list">
                {experience.works.map((work) => (
                  <Fragment key={work.name}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__exp-work-item"
                      data-tooltip-content={work.description}
                      data-tooltip-id={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      id={work.name}
                      arrowColor="#fff"
                      opacity={1}
                      className="skills-tooltip"
                    />
                  </Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(Skills, "skills");
