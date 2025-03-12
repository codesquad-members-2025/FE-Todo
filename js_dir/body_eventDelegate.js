const eventDelegate = (function () {
  function setupClickDelegate(arg, className, callback) {
    arg.addEventListener("click", (e) => {
      const targetEl = e.target.closest(className);
      if (targetEl) {
        callback(targetEl);
      }
    });
  }

  return { setupClickDelegate };
})();

export const { setupClickDelegate } = eventDelegate;
