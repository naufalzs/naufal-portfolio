import cx from "classnames";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import "./Pagination.scss";

const Pagination = ({ now, total, clickPrev, clickNext }) => {
  return (
    <div className="pn__wrapper">
      <span className="p-text">
        Page {now} of {total}
      </span>
      <div className="pn__btn-group">
        <button
          title="previous"
          type="button"
          className={cx({
            pn__btn: true,
            "pn__btn--disabled": now === 1,
          })}
          onClick={clickPrev}
        >
          <MdNavigateBefore />
        </button>
        <button
          title="next"
          type="button"
          className={cx({
            pn__btn: true,
            "pn__btn--disabled": now === total,
          })}
          onClick={clickNext}
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
