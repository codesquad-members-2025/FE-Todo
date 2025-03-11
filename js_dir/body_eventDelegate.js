const eventDelegate = (function () {
  const body = document.body;
  function setupClickDelegate(className, callback) {
    body.addEventListener("click", (e) => {
      const targetEl = e.target.closest(className);
      if (targetEl) {
        callback(targetEl);
      }
    });
  }

  return { setupClickDelegate };
})();

export const { setupClickDelegate } = eventDelegate;
