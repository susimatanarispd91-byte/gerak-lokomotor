// Web Audio API sound synthesizer + cheerful background melody + Indonesian speech synthesis

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled = true;
  private musicEnabled = false;
  private musicTimer: number | null = null;
  private noteIndex = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    if (!enabled) {
      this.stopSpeech();
    }
  }

  getSfxEnabled() {
    return this.sfxEnabled;
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startMusicLoop();
    } else {
      this.stopMusicLoop();
    }
  }

  getMusicEnabled() {
    return this.musicEnabled;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.14,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playClick() {
    if (!this.sfxEnabled) return;
    this.playTone(587.33, 0.07, 'triangle', 0.11); // D5 soft marimba pop
  }

  playSuccess() {
    if (!this.sfxEnabled) return;
    this.playTone(523.25, 0.12, 'triangle', 0.14, 0); // C5
    this.playTone(659.25, 0.12, 'triangle', 0.14, 0.09); // E5
    this.playTone(783.99, 0.14, 'triangle', 0.14, 0.18); // G5
    this.playTone(1046.5, 0.28, 'sine', 0.16, 0.27); // C6
  }

  playTryAgain() {
    if (!this.sfxEnabled) return;
    this.playTone(392.0, 0.16, 'sine', 0.11, 0); // G4
    this.playTone(329.63, 0.24, 'sine', 0.11, 0.13); // E4
  }

  playFanfare() {
    if (!this.sfxEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const delays = [0, 0.1, 0.2, 0.32, 0.48, 0.62];
    const durations = [0.12, 0.12, 0.14, 0.16, 0.14, 0.45];
    notes.forEach((n, i) => {
      this.playTone(n, durations[i], 'triangle', 0.15, delays[i]);
    });
  }

  private startMusicLoop() {
    if (this.musicTimer !== null || typeof window === 'undefined') return;
    // Playful sunny C-major pentatonic playground melody
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      880.0, 783.99, 659.25, 523.25,
      587.33, 659.25, 783.99, 523.25,
      659.25, 587.33, 523.25, 0,
    ];
    this.getContext();
    this.musicTimer = window.setInterval(() => {
      if (!this.musicEnabled) return;
      const freq = melody[this.noteIndex % melody.length];
      this.noteIndex += 1;
      if (freq > 0) {
        this.playTone(freq, 0.28, 'sine', 0.035, 0);
      }
    }, 380);
  }

  private stopMusicLoop() {
    if (this.musicTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  speak(text: string, onStateChange?: (speaking: boolean) => void) {
    if (!this.sfxEnabled) {
      onStateChange?.(false);
      return;
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onStateChange?.(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.92;
      utterance.pitch = 1.12;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onstart = () => onStateChange?.(true);
      utterance.onend = () => onStateChange?.(false);
      utterance.onerror = () => onStateChange?.(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      onStateChange?.(false);
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }
}

export const soundEngine = new SoundEngine();
