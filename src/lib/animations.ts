export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const FADE_IN_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
} as const;

export const REVEAL_VARIANTS = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.8,
      ease: EASE_OUT,
    },
  },
} as const;

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

export const STAGGER_ITEM = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  },
} as const;