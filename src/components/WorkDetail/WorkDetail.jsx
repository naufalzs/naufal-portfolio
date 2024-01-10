import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { PortableText } from "@portabletext/react";

import { urlFor } from "../../client";

import "./WorkDetail.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import sliderStyles from "./Slider.module.scss";

const WorkDetail = ({ work = {} }) => {
  const isTablet = window.matchMedia("(max-width: 1023px)").matches;

  return (
    <div className="wd__container">
      <motion.div
        animate={{ scale: [0, 1.2, 1] }}
        exit={{ scale: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="wd__card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* image carousel */}
        <div className="wd__img">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={
              isTablet && work?.workImages.length > 1
                ? false
                : { clickable: true, el: ".wd__slider-pagination" }
            }
            navigation={!isTablet && work?.workImages.length > 1}
            autoplay={isTablet && work?.workImages.length > 1}
            loop={work?.workImages.length > 1}
            className={sliderStyles.wrapper}
          >
            {work?.workImages?.map((workImage) => (
              <SwiperSlide key={workImage._key}>
                <img src={urlFor(workImage)} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="wd__img-overlay">
            <div className="wd__stack-list">
              {work?.stack?.map((tech) => (
                <div className="wd__stack-item app__flex" key={tech.name}>
                  <div className="app__flex">
                    <img src={urlFor(tech.icon)} alt={tech.name} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div
                className={`wd__slider-pagination ${sliderStyles.pagination}`}
              ></div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="wd__content">
          <h4 className="wd__title">{work.title}</h4>
          <div className="wd__desc p-text" style={{ fontSize: "1rem" }}>
            <PortableText value={work.description} />
          </div>
          <hr className="wd__divider" />
          <div className="wd__footer">
            <a
              href={work.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="wd__link"
            >
              {work.siteUrl}
            </a>
            <div className="wd__social-links">
              <a href={work.githubUrl} target="_blank" rel="noreferrer">
                <div className="wd__extra app__flex">
                  <AiFillGithub />
                </div>
              </a>
              <a href={work.siteUrl} target="_blank" rel="noreferrer">
                <div className="wd__extra app__flex">
                  <FiExternalLink />
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkDetail;
