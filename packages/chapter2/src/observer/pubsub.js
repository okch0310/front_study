let currentCallback = null;
let listeners = {};

export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
  currentCallback = null;
};

export const 발행기관 = (obj) => {
  const newObject = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      if (listeners[prop]) {
        listeners[prop].forEach((cb) => cb());
      }
      return true;
    },
    get(target, prop) {
      if (currentCallback && typeof currentCallback === "function") {
        if (!listeners[prop]) {
          listeners[prop] = new Set();
        }
        listeners[prop].add(currentCallback);
      }
      return target[prop];
    },
  });

  return newObject;
};
