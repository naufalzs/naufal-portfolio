import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Work.scss";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import { PortableText } from "@portabletext/react";
import { Backdrop, Pagination, WorkDetail } from "../../components";

const Work = () => {
  const [tags, setTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [totalWork, setTotalWork] = useState([]);
  const workPerPage = 6;
  const totalPage = totalWork.length;

  // get all tags
  useEffect(() => {
    const queryTags = `*[_type == "workTags" ] | order(title asc) . title`;
    const queryProject = `*[_type == "worksNew"] {title}`;

    client.fetch(queryTags).then((data) => {
      setTags(data);
    });
    client.fetch(queryProject).then((data) => {
      setTotalWork(splitter(data.length));
    });
  }, []);

  // get works filtered by active tags
  useEffect(() => {
    const start = workPerPage * (currPage - 1);
    const end = workPerPage * currPage - 1;

    const query = `*[_type == "worksNew" ${
      activeFilter !== "All" ? `&& "${activeFilter}" in tags[]->title` : ""
    }][${start}..${end}] {
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
  }, [activeFilter, currPage]);

  // set transition when works array changed
  useEffect(() => {
    setAnimateCard([{ y: 0, opacity: 1 }]);
  }, [works]);

  // function
  const splitter = (total) => {
    let arr = [];
    for (let count = 0; count < total; count += workPerPage) {
      arr.push(count);
    }
    return arr;
  };

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setCurrPage(1);
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

  const prevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
      setAnimateCard([{ y: 100, opacity: 0 }]);
    }
  };

  const nextPage = () => {
    if (currPage < totalPage) {
      setCurrPage(currPage + 1);
      setAnimateCard([{ y: 100, opacity: 0 }]);
    }
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
              <div className="app__work-overlay">
                <div className="app__work-stack-list">
                  {work?.stack?.map((tech) => (
                    <div
                      className="app__work-stack-item app__flex"
                      key={tech.name}
                    >
                      <div className="app__flex">
                        <img src={urlFor(tech.icon)} alt={tech.name} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

      <Pagination
        now={currPage}
        total={totalPage}
        clickPrev={prevPage}
        clickNext={nextPage}
      />

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

export default AppWrap(MotionWrap(Work, "app__works"), "project");
