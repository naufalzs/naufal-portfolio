import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const Backdrop = ({ children, onClick }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="app__backdrop"
      onClick={onClick}
    >
      {children}
    </motion.div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
