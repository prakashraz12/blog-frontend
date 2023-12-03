import React from "react";
import { motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  inital = { opacity: 0 },
  animate = {
    opacity: 1,
  },
  transation = { duration: 1 },
  className
}) => {
  return (
    <motion.div initial={inital} animate={animate} transition={transation}>
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
