import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Work.scss";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import { PortableText } from "@portabletext/react";
import { Backdrop, WorkDetail } from "../../components";

const Work = () => {
  const [tags, setTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [selected, setSelected] = useState({});

  // get all tags
  useEffect(() => {
    const queryTags = `*[_type == "workTags" ] | order(title asc) . title`;

    client.fetch(queryTags).then((data) => {
      setTags(data);
    });
  }, []);

  // get works filtered by active tags
  useEffect(() => {
    const query = `*[_type == "worksNew" ${
      activeFilter !== "All" ? `&& "${activeFilter}" in tags[]->title` : ""
    }] {
      _id,
      title,
description,
githubUrl,
siteUrl,
stack[]->{icon, name},
workImages
    }`;

    setTimeout(() => {
      client.fetch(query).then((data) => {
        setWorks(data);
      });
    }, 150);
  }, [activeFilter]);

  // set transition when works array changed
  useEffect(() => {
    setAnimateCard([{ y: 0, opacity: 1 }]);
  }, [works]);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
  };

  const openModal = (work) => {
    setSelected(work);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setSelected({});
  };

  return (
    <>
      <h2 className="head-text">
        Explore <span>Naufal&#39;s</span> Project
      </h2>
      <div className="app__work-filter">
        {tags?.map((item, index) => (
          <div
            key={index}
            onClick={
              activeFilter !== item ? () => handleWorkFilter(item) : undefined
            }
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {works.map((work, index) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="app__work-item app__flex"
            key={index}
            onClick={() => openModal(work)}
          >
            <div className="app__work-img app__flex">
              <img src={urlFor(work.workImages[0])} alt={work.title} />
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <div className="p-text" style={{ marginTop: 10 }}>
                <PortableText value={work.description} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModal && (
          <Backdrop onClick={closeModal}>
            <WorkDetail work={selected} />
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppWrap(MotionWrap(Work, "app__works"), "work");
