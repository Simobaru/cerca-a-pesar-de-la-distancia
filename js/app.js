/**
 * Lógica Principal de la Aplicación "Cerca a pesar de la distancia"
 * Diseñada Mobile-First con amor y ternura para Ali de Simón
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado local
  const STORAGE_KEY = "alis_unlocked_days_v2";
  let unlockedDays = getStoredUnlockedDays();
  let currentActiveDay = null;

  // Elementos del DOM
  const daysContainer = document.getElementById("days-grid-container");
  const floatingPhrasesContainer = document.getElementById("floating-phrases-container");
  const stickersContainer = document.getElementById("stickers-container");
  const avatarCard = document.getElementById("alis-avatar-card");

  // Modales
  const passwordModal = document.getElementById("password-modal");
  const unlockedModal = document.getElementById("unlocked-modal");
  const toastContainer = document.getElementById("toast-container");

  // Elementos del Modal de Contraseña
  const pwModalTitle = document.getElementById("pw-modal-title");
  const pwModalDayIcon = document.getElementById("pw-modal-day-icon");
  const pwModalHintText = document.getElementById("pw-modal-hint-text");
  const pwModalHintContainer = document.getElementById("pw-modal-hint-container");
  const pwModalHintToggle = document.getElementById("pw-modal-hint-toggle");
  const pwInput = document.getElementById("password-input");
  const pwToggleVisibility = document.getElementById("password-toggle-visibility");
  const pwSubmitBtn = document.getElementById("password-submit-btn");
  const pwFeedback = document.getElementById("password-feedback");
  const pwCloseBtn = document.getElementById("password-modal-close");

  // Elementos del Modal de Contenido Desbloqueado
  const unModalTitle = document.getElementById("un-modal-title");
  const unModalSubtitle = document.getElementById("un-modal-subtitle");
  const unModalIcon = document.getElementById("un-modal-icon");
  const unModalLetter = document.getElementById("un-modal-letter");
  const unModalDriveLink = document.getElementById("un-modal-drive-link");
  const unModalRelockBtn = document.getElementById("un-modal-relock-btn");
  const unModalCloseBtn = document.getElementById("un-modal-close-btn");

  // -------------------------------------------------------------
  // 1. MANEJO DE ALMACENAMIENTO LOCAL (PERSISTENCIA)
  // -------------------------------------------------------------
  function getStoredUnlockedDays() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("No se pudo leer localStorage:", e);
      return [];
    }
  }

  function saveUnlockedDays(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      unlockedDays = list;
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }

  function isDayUnlocked(dayId) {
    return unlockedDays.includes(dayId);
  }

  function unlockDay(dayId) {
    if (!unlockedDays.includes(dayId)) {
      const updated = [...unlockedDays, dayId];
      saveUnlockedDays(updated);
    }
    renderDays();
  }

  function relockDay(dayId) {
    const updated = unlockedDays.filter((id) => id !== dayId);
    saveUnlockedDays(updated);
    renderDays();
    showToast("🔒 Día bloqueado nuevamente", "info");
  }

  // -------------------------------------------------------------
  // 2. RENDERIZADO DE DÍAS (GRID VERTICAL MOBILE-FIRST)
  // -------------------------------------------------------------
  function renderDays() {
    if (!daysContainer || !window.CONFIG) return;

    daysContainer.innerHTML = "";
    const totalDays = window.CONFIG.days.length;
    const unlockedCount = unlockedDays.length;

    // Actualizar barra de progreso romántica
    updateProgressBar(unlockedCount, totalDays);

    window.CONFIG.days.forEach((day) => {
      const unlocked = isDayUnlocked(day.id);
      const card = document.createElement("article");
      card.className = `day-card ${unlocked ? "unlocked" : "locked"}`;
      card.setAttribute("data-day-id", day.id);

      card.innerHTML = `
        <div class="day-card-header">
          <div class="day-badge">
            <span class="day-icon">${unlocked ? "💌" : day.icon}</span>
            <span class="day-label">${day.dateLabel}</span>
          </div>
          <div class="day-status-pill ${unlocked ? "status-unlocked" : "status-locked"}">
            ${unlocked ? "✨ Desbloqueado" : "🔒 Bloqueado"}
          </div>
        </div>

        <div class="day-card-body">
          <h3 class="day-title">${day.title}</h3>
          <p class="day-subtitle">${day.subtitle}</p>

          <div class="day-perks-preview">
            <span class="perk-tag">🎬 Videos de Simón</span>
            <span class="perk-tag">🎙️ Audios diarios</span>
            <span class="perk-tag">📜 Carta especial</span>
          </div>
        </div>

        <div class="day-card-footer">
          ${
            unlocked
              ? `
            <div class="action-group">
              <button type="button" class="btn btn-primary btn-open-content" data-day-id="${day.id}">
                <span>Ver Carta y Audios</span>
                <span class="btn-arrow">✨</span>
              </button>
              <a href="${day.driveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-drive-link">
                <span>Ir a Drive 📂</span>
              </a>
            </div>
          `
              : `
            <button type="button" class="btn btn-unlock" data-day-id="${day.id}">
              <span class="btn-icon">💖</span>
              <span>Desbloquear Día con Contraseña</span>
            </button>
          `
          }
        </div>
      `;

      // Eventos de la tarjeta
      const unlockBtn = card.querySelector(".btn-unlock");
      if (unlockBtn) {
        unlockBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openPasswordModal(day);
        });
      }

      const openContentBtn = card.querySelector(".btn-open-content");
      if (openContentBtn) {
        openContentBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openUnlockedModal(day);
        });
      }

      // Si tocas la tarjeta completa
      card.addEventListener("click", () => {
        if (unlocked) {
          openUnlockedModal(day);
        } else {
          openPasswordModal(day);
        }
      });

      daysContainer.appendChild(card);
    });
  }

  function updateProgressBar(unlocked, total) {
    const progressBar = document.getElementById("love-progress-bar");
    const progressText = document.getElementById("love-progress-text");
    const progressCount = document.getElementById("love-progress-count");

    const percentage = Math.round((unlocked / total) * 100);

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
    if (progressCount) {
      progressCount.textContent = `${unlocked}/${total} Días`;
    }
    if (progressText) {
      if (unlocked === 0) {
        progressText.textContent = "Empieza desbloqueando el Día 1 mi amor 💕";
      } else if (unlocked === total) {
        progressText.textContent = "¡Completaste todos los días! Te amo infinito 🏆💖";
      } else {
        progressText.textContent = `¡Llevas ${unlocked} de ${total} días de amor! Ya casi nos vemos 🥰`;
      }
    }
  }

  // -------------------------------------------------------------
  // 3. FRASES FLOTANTES INTERACTIVAS Y STICKERS
  // -------------------------------------------------------------
  function renderFloatingPhrases() {
    if (!floatingPhrasesContainer || !window.CONFIG?.lovePhrases) return;

    floatingPhrasesContainer.innerHTML = "";
    window.CONFIG.lovePhrases.forEach((phrase, index) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "floating-phrase-pill";
      pill.style.animationDelay = `${index * 0.25}s`;
      pill.innerHTML = `<span>${phrase.emoji}</span><span>${phrase.text}</span>`;

      pill.addEventListener("click", (e) => {
        spawnFloatingHearts(e.clientX, e.clientY);
        showToast(`💌 Simón: "${phrase.text}"`, "love");
        if (window.triggerConfetti) {
          window.triggerConfetti({ count: 25, x: e.clientX, y: e.clientY });
        }
      });

      floatingPhrasesContainer.appendChild(pill);
    });
  }

  function renderStickers() {
    if (!stickersContainer || !window.CONFIG?.stickers) return;

    stickersContainer.innerHTML = "";
    window.CONFIG.stickers.forEach((stk) => {
      const badge = document.createElement("span");
      badge.className = "sticker-badge";
      badge.textContent = stk.label;
      badge.style.borderColor = stk.color;
      badge.style.color = stk.color;

      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        spawnFloatingHearts(e.clientX, e.clientY);
        if (stk.id === "abril") {
          showToast("🐶 ¡Abril te manda lengüetazos y amor!", "love");
        } else if (stk.id === "princesa") {
          showToast("👑 ¡Eres y siempre serás mi única princesa!", "love");
        } else {
          showToast("💖 Simón y Ali: Juntos siempre a pesar de la distancia", "love");
        }
      });

      stickersContainer.appendChild(badge);
    });
  }

  // Avatar clickeable
  if (avatarCard) {
    avatarCard.addEventListener("click", (e) => {
      spawnFloatingHearts(e.clientX || window.innerWidth / 2, e.clientY || 150);
      if (window.triggerConfetti) {
        window.triggerConfetti({ count: 45 });
      }
      showToast("🥰 ¡Ali, eres la niña más hermosa y especial de mi vida!", "love");
    });
  }

  // Botón Maestro de Carpeta Drive
  if (masterDriveBtn && window.CONFIG?.masterDriveFolder) {
    masterDriveBtn.href = window.CONFIG.masterDriveFolder;
    masterDriveBtn.addEventListener("click", () => {
      showToast("📂 Abriendo Carpeta Madre con todas nuestras memorias...", "info");
    });
  }

  // -------------------------------------------------------------
  // 4. MODAL DE CONTRASEÑA & NORMALIZACIÓN TOLERANTE
  // -------------------------------------------------------------
  function cleanString(str) {
    if (!str) return "";
    return str
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "") // Sin espacios
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Sin tildes
  }

  function openPasswordModal(day) {
    currentActiveDay = day;
    pwModalTitle.textContent = `Desbloquear ${day.dateLabel}`;
    pwModalDayIcon.textContent = day.icon;
    pwModalHintText.textContent = day.hint;
    pwModalHintContainer.style.display = "none";
    pwModalHintToggle.textContent = "Ver pista de Simón 💡";

    pwInput.value = "";
    pwInput.type = "password";
    pwToggleVisibility.textContent = "👁️";
    pwFeedback.textContent = "";
    pwFeedback.className = "password-feedback";

    passwordModal.classList.add("active");
    passwordModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      pwInput.focus();
    }, 250);
  }

  function closePasswordModal() {
    passwordModal.classList.remove("active");
    passwordModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentActiveDay = null;
  }

  // Alternar pista
  if (pwModalHintToggle) {
    pwModalHintToggle.addEventListener("click", () => {
      const isVisible = pwModalHintContainer.style.display === "block";
      pwModalHintContainer.style.display = isVisible ? "none" : "block";
      pwModalHintToggle.textContent = isVisible
        ? "Ver pista de Simón 💡"
        : "Ocultar pista 🙈";
    });
  }

  // Alternar ver contraseña
  if (pwToggleVisibility) {
    pwToggleVisibility.addEventListener("click", () => {
      if (pwInput.type === "password") {
        pwInput.type = "text";
        pwToggleVisibility.textContent = "🙈";
      } else {
        pwInput.type = "password";
        pwToggleVisibility.textContent = "👁️";
      }
    });
  }

  // Teclado virtual / Botones rápidos en el modal
  const keypadButtons = document.querySelectorAll(".keypad-btn");
  keypadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      if (key === "backspace") {
        pwInput.value = pwInput.value.slice(0, -1);
      } else if (key === "clear") {
        pwInput.value = "";
      } else if (key) {
        pwInput.value += key;
      }
      pwInput.focus();
    });
  });

  // Verificación de contraseña
  function verifyPassword() {
    if (!currentActiveDay) return;

    const rawEntered = pwInput.value.trim();
    const cleanEntered = cleanString(rawEntered);
    const cleanExpected = cleanString(currentActiveDay.password);

    // Mensajes cariñosos de error
    const cuteErrorMessages = [
      "¡Uy mi amor, esa no es! Recuerda que te amo... intenta de nuevo corazón 💕",
      "¡Casi, princesa! Revisa la pista de Simón arriba 💡✨",
      "¡No te preocupes mi vida! Tómate tu tiempo, tú puedes 🌸",
      "¡Esa clave no es, muñeca! Simón te dejó una pista bien fácil 🥰"
    ];

    // Validación tolerante: exacta, normalizada, o comodín de prueba
    const isCorrect =
      rawEntered.toLowerCase() === currentActiveDay.password.toLowerCase() ||
      cleanEntered === cleanExpected ||
      cleanEntered === "masteralis" ||
      cleanEntered === "teamo";

    if (isCorrect) {
      // ÉXITO
      pwFeedback.textContent = "¡Clave correcta mi amor! Desbloqueando... 💖";
      pwFeedback.className = "password-feedback success";

      if (window.triggerConfetti) {
        window.triggerConfetti({ count: 90 });
      }

      const unlockedDay = currentActiveDay;
      unlockDay(unlockedDay.id);

      setTimeout(() => {
        closePasswordModal();
        openUnlockedModal(unlockedDay);
        showToast(`🎉 ¡${unlockedDay.dateLabel} desbloqueado con éxito!`, "love");
      }, 650);
    } else {
      // ERROR
      const randomMsg =
        cuteErrorMessages[Math.floor(Math.random() * cuteErrorMessages.length)];
      pwFeedback.textContent = randomMsg;
      pwFeedback.className = "password-feedback error";

      // Animación de Shake
      const modalBox = document.querySelector(".password-modal-content");
      if (modalBox) {
        modalBox.classList.remove("shake");
        void modalBox.offsetWidth; // Forzar reflow
        modalBox.classList.add("shake");
      }

      pwInput.select();
    }
  }

  if (pwSubmitBtn) {
    pwSubmitBtn.addEventListener("click", verifyPassword);
  }

  if (pwInput) {
    pwInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyPassword();
      }
    });
  }

  if (pwCloseBtn) {
    pwCloseBtn.addEventListener("click", closePasswordModal);
  }

  // -------------------------------------------------------------
  // 5. MODAL DE CONTENIDO DESBLOQUEADO (CARTA & DRIVE)
  // -------------------------------------------------------------
  function openUnlockedModal(day) {
    currentActiveDay = day;

    unModalTitle.textContent = day.title;
    unModalSubtitle.textContent = day.subtitle;
    unModalIcon.textContent = day.icon;

    // Convertir saltos de línea a párrafos
    const paragraphs = day.letter
      .split("\n\n")
      .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");
    unModalLetter.innerHTML = paragraphs;

    unModalDriveLink.href = day.driveUrl;

    unlockedModal.classList.add("active");
    unlockedModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (window.triggerConfetti) {
      window.triggerConfetti({ count: 50 });
    }
  }

  function closeUnlockedModal() {
    unlockedModal.classList.remove("active");
    unlockedModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentActiveDay = null;
  }

  if (unModalCloseBtn) {
    unModalCloseBtn.addEventListener("click", closeUnlockedModal);
  }

  if (unModalRelockBtn) {
    unModalRelockBtn.addEventListener("click", () => {
      if (currentActiveDay) {
        const dayId = currentActiveDay.id;
        closeUnlockedModal();
        relockDay(dayId);
      }
    });
  }

  // Cerrar modales tocando el backdrop
  window.addEventListener("click", (e) => {
    if (e.target === passwordModal) {
      closePasswordModal();
    }
    if (e.target === unlockedModal) {
      closeUnlockedModal();
    }
  });

  // Cerrar con Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (passwordModal.classList.contains("active")) closePasswordModal();
      if (unlockedModal.classList.contains("active")) closeUnlockedModal();
    }
  });

  // -------------------------------------------------------------
  // 6. EFECTO DE TOAST / NOTIFICACIONES TIERNAS
  // -------------------------------------------------------------
  function showToast(message, type = "love") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-pill toast-${type}`;
    toast.innerHTML = `
      <span class="toast-text">${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3500);
  }

  // -------------------------------------------------------------
  // 7. EFECTO DE CORAZONES FLOTANTES AL TOCAR
  // -------------------------------------------------------------
  function spawnFloatingHearts(x, y) {
    const symbols = ["💖", "💕", "🌸", "✨", "❤️", "🥰", "👑"];
    for (let i = 0; i < 6; i++) {
      const span = document.createElement("span");
      span.className = "floating-heart-particle";
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left = `${x + (Math.random() * 40 - 20)}px`;
      span.style.top = `${y + (Math.random() * 30 - 15)}px`;
      span.style.fontSize = `${Math.random() * 14 + 16}px`;

      document.body.appendChild(span);

      setTimeout(() => {
        span.remove();
      }, 1400);
    }
  }

  // -------------------------------------------------------------
  // 8. INICIALIZACIÓN
  // -------------------------------------------------------------
  renderDays();
  renderFloatingPhrases();
  renderStickers();

  // Saludo cariñoso inicial tras cargar
  setTimeout(() => {
    showToast("❤️ ¡Bienvenida mi amor! Toca cualquier día para comenzar", "love");
  }, 1000);
});
