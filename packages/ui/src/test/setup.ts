import '@testing-library/jest-dom/vitest';

// jsdom has no ResizeObserver; HeroUI Tabs uses it to detect tab list overflow.
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom has no Web Animations API; React Aria (Tabs, Modal) calls
// element.getAnimations().
if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = () => [];
}
