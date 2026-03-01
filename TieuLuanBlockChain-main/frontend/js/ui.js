// ===== GLOBAL UI SYSTEM =====
(function () {

  // ---------- RIPPLE EFFECT ----------
  function rippleEffect(e) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    const circle = document.createElement("span");
    const size = Math.max(rect.width, rect.height);

    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";
    circle.className = "ripple-circle";

    const old = target.querySelector(".ripple-circle");
    if (old) old.remove();

    target.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  function setupRipples() {
    document.querySelectorAll(".ripple").forEach(el => {
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      el.style.overflow = "hidden";
      el.addEventListener("click", rippleEffect);
    });
  }

  // ---------- ENTRANCE ANIMATION ----------
  function entranceStagger() {
    document.querySelectorAll("[data-animate]").forEach((el, i) => {
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-4");
      }, 120 * i);
    });
  }

  // ---------- WALLET STATUS ----------
  async function showWallet() {
    const box = document.getElementById("walletStatus");
    if (!box) return;

    if (!window.ethereum) {
      box.innerText = "⚠ Không có MetaMask";
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      box.innerText = "🔌 Chưa kết nối ví";
      return;
    }

    const acc = accounts[0];
    box.innerText = "🟢 " + acc.slice(0,6) + "..." + acc.slice(-4);
  }

  // ---------- RESULT CARD AUTO SHOW ----------
  function autoShowResult() {
    const observer = new MutationObserver(() => {
      const ids = ["result","degreeResult","transResult","verifyResult"];

      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (el.innerText.trim() !== "") {
          document.getElementById("resultCard")?.classList.remove("hidden");
          document.getElementById("verifyCard")?.classList.remove("hidden");
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ---------- TOAST NOTIFICATION ----------
  function showToast(text, type = "success") {
    const toast = document.createElement("div");

    toast.className =
      "fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow text-white z-50 " +
      (type === "error" ? "bg-red-500" : "bg-green-500");

    toast.innerText = text;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }

  window.toast = showToast;

  // ---------- GLOBAL STYLES ----------
  function injectStyles() {
    if (document.getElementById("ui-effects-style")) return;

    const style = document.createElement("style");
    style.id = "ui-effects-style";

    style.textContent = `
      .ripple-circle {
        position: absolute;
        border-radius: 9999px;
        background: rgba(255,255,255,0.4);
        transform: scale(0);
        animation: rippleAnim 600ms linear;
        pointer-events: none;
      }

      @keyframes rippleAnim {
        to { transform: scale(2); opacity: 0 }
      }
    `;

    document.head.appendChild(style);
  }

  // ---------- INIT ----------
  function initUI() {
    injectStyles();
    setupRipples();
    entranceStagger();
    showWallet();
    autoShowResult();
  }

  document.addEventListener("DOMContentLoaded", initUI);
  window.initUI = initUI;

})();