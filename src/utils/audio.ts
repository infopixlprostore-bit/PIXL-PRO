class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser environment.", e);
    }
  }

  /**
   * Plays a tiny, high-frequency cybernetic, non-intrusive hover "tick" sound.
   * Leverages exponential gain ramps and a snappy frequency slide to feel tactile and light.
   */
  playHover() {
    this.init();
    if (!this.ctx) return;

    // Resume context if suspended (common browser security policies)
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      
      // Direct high-tech frequency chirp
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(1250, now + 0.03);

      // Micro volume gain to stay completely polite and unobtrusive
      gainNode.gain.setValueAtTime(0.012, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      // Bandpass centered on 1100Hz to give the click a refined "snappy/digital" finish
      filter.type = "bandpass";
      filter.frequency.value = 1100;
      filter.Q.value = 2.0;

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (error) {
      // Fail silently to prevent interface breakdown
    }
  }

  /**
   * Plays a satisfying, higher-energy dual-tone click.
   */
  playClick() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;
      const oscTriangle = this.ctx.createOscillator();
      const oscSine = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Triangle oscillator handles the brief physical clank
      oscTriangle.type = "triangle";
      oscTriangle.frequency.setValueAtTime(580, now);
      oscTriangle.frequency.exponentialRampToValueAtTime(1400, now + 0.07);

      // Sine oscillator delivers the sweet high digital ring
      oscSine.type = "sine";
      oscSine.frequency.setValueAtTime(1150, now);
      oscSine.frequency.exponentialRampToValueAtTime(750, now + 0.05);

      // Master trigger levels (subtle, clean, short)
      gainNode.gain.setValueAtTime(0.022, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      filter.type = "lowpass";
      filter.frequency.value = 3500;

      oscTriangle.connect(filter);
      oscSine.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      oscTriangle.start(now);
      oscSine.start(now);

      oscTriangle.stop(now + 0.11);
      oscSine.stop(now + 0.11);
    } catch (error) {
      // Fail silently
    }
  }
}

export const soundManager = new SoundManager();
