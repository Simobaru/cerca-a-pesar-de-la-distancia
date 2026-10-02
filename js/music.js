/**
 * Reproductor de Música Romántica para Ali & Simón
 * Reproduce la canción oficial (assets/music/cancion.mp3) con control de volumen,
 * animaciones de ecualizador y soporte para interacción táctil en móvil.
 */

class RomanticMusicPlayer {
  constructor() {
    this.audio = new Audio("assets/music/cancion.mp3");
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.isPlaying = false;
    this.volume = 0.7;
    this.audio.volume = this.volume;

    this.initListeners();
  }

  play() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.updateUI();
        })
        .catch((error) => {
          console.log("Autoplay bloqueado esperando interacción del usuario:", error);
          this.isPlaying = false;
          this.updateUI();
        });
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    this.audio.volume = this.volume;
    const slider = document.getElementById("music-volume-slider");
    if (slider) slider.value = this.volume * 100;
  }

  updateUI() {
    const playBtn = document.getElementById("music-play-btn");
    const floatingPlayer = document.getElementById("floating-music-player");
    const equalizer = document.getElementById("music-equalizer");

    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? "⏸️" : "▶️";
      playBtn.setAttribute("aria-label", this.isPlaying ? "Pausar canción" : "Reproducir canción");
    }

    if (floatingPlayer) {
      if (this.isPlaying) {
        floatingPlayer.classList.add("playing");
      } else {
        floatingPlayer.classList.remove("playing");
      }
    }

    if (equalizer) {
      equalizer.style.display = this.isPlaying ? "flex" : "none";
    }
  }

  initListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      const playBtn = document.getElementById("music-play-btn");
      const volumeSlider = document.getElementById("music-volume-slider");
      const floatingBadge = document.getElementById("music-floating-toggle");

      if (playBtn) {
        playBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggle();
        });
      }

      if (floatingBadge) {
        floatingBadge.addEventListener("click", (e) => {
          if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
            this.toggle();
          }
        });
      }

      if (volumeSlider) {
        volumeSlider.addEventListener("input", (e) => {
          this.setVolume(parseFloat(e.target.value) / 100);
        });
      }

      // Eventos nativos de audio para mantener la UI sincronizada
      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.updateUI();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.updateUI();
      });

      // Al primer toque en la pantalla por parte del usuario, intentar reproducir suavemente
      const startMusicOnFirstInteraction = () => {
        if (!this.isPlaying) {
          this.play();
        }
        document.removeEventListener("touchstart", startMusicOnFirstInteraction);
        document.removeEventListener("click", startMusicOnFirstInteraction);
      };

      document.addEventListener("touchstart", startMusicOnFirstInteraction, { once: true });
      document.addEventListener("click", startMusicOnFirstInteraction, { once: true });
    });
  }
}

// Instancia global
window.romanticPlayer = new RomanticMusicPlayer();
