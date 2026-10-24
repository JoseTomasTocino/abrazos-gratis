// AbrazosGratis — la lógica más simple del mundo
(() => {
  "use strict";

  const STORAGE_KEY = "abrazos-contador";

  const mensajes = [
    "Abrazo entregado. Sin devoluciones. 🫂",
    "Ese era fuerte, ¿eh? Guarda el resto para alguien. 💛",
    "Abrazo nivel 10/10. Ya puedes cerrar la pestaña tranquilo.",
    "Aquí tienes uno extra, por si el día viene torcido. 🌤️",
    "Confirmado: el mundo necesita más de esto.",
    "Abrazo enviado a 3.412 embajadores. Todos dicen que sí. ✨",
    "Este venía con calefacción incluida. 🔥",
    "Uno más y te haces socio honorífico. 🎖️"
  ];

  const corazones = ["💗", "🩷", "🤗", "💞", "🫂", "💖"];

  const countEl = document.getElementById("hugCount");
  const msgEl = document.getElementById("message");
  const heartsEl = document.getElementById("hearts");
  const yearEl = document.getElementById("year");
  const botones = [
    document.getElementById("hugBtn"),
    document.getElementById("hugBtn2"),
    document.getElementById("hugBtn3")
  ].filter(Boolean);

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const leer = () => {
    try {
      const n = Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    } catch {
      return 0; // modo incógnito / almacenamiento bloqueado
    }
  };

  const guardar = (n) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(n));
    } catch {
      /* sin persistencia, no pasa nada */
    }
  };

  let abrazos = leer();
  countEl.textContent = abrazos.toLocaleString("es-ES");
  if (abrazos === 0) {
    msgEl.textContent = "El contador está a cero. Eso es mucho potencial. 👇";
    msgEl.classList.add("show");
  }

  function lanzarCorazones(cantidad) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (let i = 0; i < cantidad; i++) {
      const el = document.createElement("span");
      el.className = "heart";
      el.textContent = corazones[Math.floor(Math.random() * corazones.length)];
      el.style.left = `${Math.random() * 92 + 4}%`;
      el.style.fontSize = `${1.1 + Math.random() * 1.6}rem`;
      el.style.animationDelay = `${Math.random() * 0.45}s`;
      el.style.setProperty("--spin", `${Math.random() * 80 - 40}deg`);
      heartsEl.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }
  }

  function darAbrazo() {
    abrazos += 1;
    guardar(abrazos);

    countEl.textContent = abrazos.toLocaleString("es-ES");
    countEl.classList.add("bump");
    setTimeout(() => countEl.classList.remove("bump"), 400);

    msgEl.classList.remove("show");
    // reinicia la transición aunque se pulse muy rápido
    void msgEl.offsetWidth;
    msgEl.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
    msgEl.classList.add("show");

    lanzarCorazones(7 + Math.floor(Math.random() * 6));
  }

  botones.forEach((btn) => btn.addEventListener("click", darAbrazo));

  // Easter egg: teclado
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tag = document.activeElement?.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA") darAbrazo();
    }
  });
})();
