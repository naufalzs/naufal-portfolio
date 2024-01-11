import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      className="app__backdrop"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;