(function () {
  const trigger = document.getElementById("modeTrigger");
  const icons = document.getElementById("modeIcons");
  const buttons = icons?.querySelectorAll("button") || [];
  const bg = document.querySelector(".page-bg");
  const gradient = document.querySelector(".page-gradient");

  if (!trigger || !icons || !bg) return;

  trigger.addEventListener("click", () => {
    trigger.classList.toggle("active");
    icons.classList.toggle("active");
  });

  function resolveMode(mode) {
    if (mode === "auto") {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 10) return "sunrise";
      if (hour >= 10 && hour < 17) return "noon";
      if (hour >= 17 && hour < 21) return "night";
      return "midnight";
    }
    return mode;
  }

  function applyMode(mode) {
    const cfg = window.bgConfig;
    const resolved = resolveMode(mode);
    const isDark = ["night", "midnight"].includes(resolved);

    document.body.classList.toggle("darkmode", isDark);

    if (cfg?.backgrounds?.[resolved]) {
      bg.style.opacity = 0;
      setTimeout(() => {
        bg.style.backgroundImage = `url('${cfg.backgrounds[resolved]}')`;
        bg.style.opacity = 1;
      }, 100);
    }

    if (gradient) {
      gradient.style.opacity = isDark ? "0" : "1";
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      window.bgConfig.mode = mode;
      localStorage.setItem("visualMode", mode);
      applyMode(mode);
    });
  });

  const saved = localStorage.getItem("visualMode");
  applyMode(saved || window.bgConfig.mode || "auto");
})();
