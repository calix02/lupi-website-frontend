import type { Variants } from "framer-motion";
export default function animationVariants() {
  // Implementation for in/out // Animation variants for entering and exiting
  const containerVariants : Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const leftVariants : Variants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.96 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] as const
      },
    },
  }; 

  const rightVariants : Variants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.96 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] as const
      },
    },
  };
  return { containerVariants, leftVariants, rightVariants };
}