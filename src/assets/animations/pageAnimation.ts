export const slidePageAnimation = {
  hidden: { x: -window.innerWidth },
  slideIn: { x: 0, transition: { duration: 0.15, type: "linear" } },
  slideOut: {
    x: window.innerWidth,
    transition: { duration: 0.15, type: "linear" },
  },
};
