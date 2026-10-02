/**
 * Reproductor de Música Romántica (Web Audio API Synth & Music Box)
 * Genera una melodía acústica / caja de música lofi relajante y romántica sin depender de archivos externos
 */

class RomanticMusicPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.6;
    this.masterGain = null;
    this.timerId = null;
    this.noteIndex = 0;
    this.currentChordIndex = 0;

    // Progresión romántica: Cmaj7 -> G -> Am7 -> Fmaj7 -> Em7 -> Dm7 -> G7 -> C
    this.chords = [
      { root: 130.81, notes: [261.63, 329.63, 392.00, 493.88] }, // Cmaj7 (C3, E4, G4, B4)
      { root: 98.00,  notes: [196.00, 246.94, 293.66, 392.00] }, // G (G2, G3, B3, D4, G4)
      { root: 110.00, notes: [220.00, 261.63, 329.63, 440.00] }, // Am7 (A2, A3, C4, E4, A4)
      { root: 87.31,  notes: [174.61, 220.00, 261.63, 349.23] }, // Fmaj7 (F2, F3, A3, C4, F4)
      { root: 82.41,  notes: [164.81, 196.00, 246.94, 329.63] }, // Em7 (E2, E3, G3, B3, E4)
      { root: 73.42,  notes: [146.83, 220.00, 261.63, 293.66] }, // Dm7 (D2, D3, A3, C4, D4)
      { root: 98.00,  notes: [196.00, 246.94, 293.66, 349.23] }, // G7 (G2, G3, B3, D4, F4)
      { root: 130.81, notes: [261.63, 329.63, 392.00, 523.25] }  // C (C3, E4, G4, C5)
    ];

    // Melodía romántica dulce sobre los acordes
    this.melodyPattern = [
      0, 1, 2, 3, 2, 1, 3, 2,
      0, 2, 1, 3, 1, 2, 3, 0
    ];

    this.initListeners();
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Filtro pasa bajos para darle calidez cálida tipo Lofi / caja de música
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(2200, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, time, duration = 1.4, isBass = false) {
    if (!this.ctx || this.ctx.state !== "running") return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    if (isBass) {
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(freq, time);
      osc2.frequency.setValueAtTime(freq * 2, time);

      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.35, time + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.5);
    } else {
      // Tono brillante y dulce como campana / caja de música
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(freq, time);
      // Ligero detune para efecto cálido coruscante
      osc2.frequency.setValueAtTime(freq * 2.004, time);

      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.28, time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    }

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration * 1.5);
    osc2.stop(time + duration * 1.5);
  }

  step() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const currentChord = this.chords[this.currentChordIndex];

    // Nota de bajo al iniciar cada acorde (cada 4 notas)
    if (this.noteIndex % 4 === 0) {
      this.playNote(currentChord.root, now, 2.2, true);
    }

    // Nota de melodía / arpegio
    const notePos = this.melodyPattern[this.noteIndex % this.melodyPattern.length];
    const noteFreq = currentChord.notes[notePos % currentChord.notes.length];
    
    // De vez en cuando añadir una octava alta para brillo romántico
    const pitchMultiplier = (this.noteIndex % 7 === 0) ? 1.5 : 1;
    this.playNote(noteFreq * pitchMultiplier, now, 1.2, false);

    this.noteIndex++;
    if (this.noteIndex % 8 === 0) {
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }

    // Tempo suave y tierno (~100 BPM arpegiado / 320ms por nota)
    this.timerId = setTimeout(() => this.step(), 340);
  }

  play() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.step();
    this.updateUI();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
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
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    const slider = document.getElementById("music-volume-slider");
    if (slider) slider.value = this.volume * 100;
  }

  updateUI() {
    const playBtn = document.getElementById("music-play-btn");
    const floatingPlayer = document.getElementById("floating-music-player");
    const equalizer = document.getElementById("music-equalizer");

    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? "⏸️" : "▶️";
      playBtn.setAttribute("aria-label", this.isPlaying ? "Pausar música" : "Reproducir música");
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
        playBtn.addEventListener("click", () => this.toggle());
      }

      if (floatingBadge) {
        floatingBadge.addEventListener("click", (e) => {
          // Si hace clic en el badge exterior, expandir o toggle
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

      // Iniciar suavemente al primer toque de pantalla si el usuario interactúa
      const unlockAudioOnGesture = () => {
        if (!this.isPlaying) {
          // Dejar listo el AudioContext
          this.initContext();
        }
        document.removeEventListener("touchstart", unlockAudioOnGesture);
        document.removeEventListener("click", unlockAudioOnGesture);
      };

      document.addEventListener("touchstart", unlockAudioOnGesture, { once: true });
      document.addEventListener("click", unlockAudioOnGesture, { once: true });
    });
  }
}

// Instancia global
window.romanticPlayer = new RomanticMusicPlayer();
