// Retro Audio Synthesizer & Outback Music Engine for Plants vs Zombies using Web Audio API

let sharedAudioCtx: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

class SoundEffects {
  public enabled: boolean = true;

  private getCtx(): AudioContext | null {
    if (!this.enabled) return null;
    return getSharedAudioContext();
  }

  // Button click
  public playClick() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Sun collection chime (+25 sun!)
  public playSunCollect() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    freqs.forEach((freq, idx) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.05 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.25);
    });
  }

  // Planting seed sound (Thump/Dirt)
  public playPlantSeed() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Pea Shoot ("pop" sound)
  public playPeaShoot() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  private lastEatSoundTime: number = 0;
  private lastHitSoundTime: number = 0;
  private cachedHitBuffer: AudioBuffer | null = null;

  // Pea Hit Zombie ("splat" sound)
  public playPeaHit() {
    const nowMs = performance.now();
    if (nowMs - this.lastHitSoundTime < 60) return;
    this.lastHitSoundTime = nowMs;

    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (!this.cachedHitBuffer || this.cachedHitBuffer.sampleRate !== ctx.sampleRate) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.06);
      this.cachedHitBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = this.cachedHitBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = this.cachedHitBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  // Zombie Eating / Chomp
  public playZombieEat() {
    const nowMs = performance.now();
    if (nowMs - this.lastEatSoundTime < 350) return;
    this.lastEatSoundTime = nowMs;

    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Potato Mine Explosion ("SPUDOW!")
  public playPotatoExplode() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Sub-bass thump
    const osc = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

    gain1.gain.setValueAtTime(0.5, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain1);
    gain1.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);

    // Noise burst
    const bufferSize = Math.floor(ctx.sampleRate * 0.3);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.4, now);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    noise.connect(gain2);
    gain2.connect(ctx.destination);
    noise.start(now);
  }

  // Cherry Bomb Explosion ("BOOM!")
  public playCherryExplode() {
    this.playPotatoExplode();
  }

  // LawnMower Engine Roar ("vroom!")
  public playLawnMower() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(280, now + 0.3);
    osc.frequency.linearRampToValueAtTime(220, now + 1.2);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  // Huge Wave Siren / Horn
  public playHugeWave() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(440, now + 0.4);
    osc.frequency.linearRampToValueAtTime(220, now + 0.8);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  // Victory Fanfare
  public playVictory() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C E G C E G
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  }

  // Game Over Groan
  public playGameOver() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 1.5);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }

  // Chomper Swallow Gulp
  public playChomperEat() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Baby Cry Sound Effect for Rotten Baby Tomato
  public playBabyCry() {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(850, now + 0.15);
    osc.frequency.linearRampToValueAtTime(450, now + 0.35);
    osc.frequency.linearRampToValueAtTime(800, now + 0.55);
    osc.frequency.linearRampToValueAtTime(400, now + 0.8);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.4);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  // Spudow / Potato Explode Sound Effect
  public playSpudow() {
    this.playPotatoExplode();
  }

  // Aussie Wild Dingo / Wolf Suspense Howl Sound Effect
  public playDingoHowl(variant: 'lone' | 'pack' = 'lone') {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    const createSingleHowl = (startTime: number, startPitch: number, peakPitch: number, endPitch: number, duration: number, maxGain: number) => {
      if (!ctx) return;

      // 1. Dual Harmonic Oscillators (Sine + Triangle + Soft Saw for vocal tract depth)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const subOsc = ctx.createOscillator();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      subOsc.type = 'sawtooth';

      // Pitch glide envelope: low throat -> high howl peak -> long mournful slide
      osc1.frequency.setValueAtTime(startPitch, startTime);
      osc1.frequency.exponentialRampToValueAtTime(peakPitch, startTime + duration * 0.35);
      osc1.frequency.linearRampToValueAtTime(peakPitch * 1.02, startTime + duration * 0.6);
      osc1.frequency.exponentialRampToValueAtTime(endPitch, startTime + duration);

      osc2.frequency.setValueAtTime(startPitch * 1.008, startTime);
      osc2.frequency.exponentialRampToValueAtTime(peakPitch * 1.008, startTime + duration * 0.35);
      osc2.frequency.linearRampToValueAtTime(peakPitch * 1.03, startTime + duration * 0.6);
      osc2.frequency.exponentialRampToValueAtTime(endPitch * 1.008, startTime + duration);

      subOsc.frequency.setValueAtTime(startPitch * 0.5, startTime);
      subOsc.frequency.exponentialRampToValueAtTime(peakPitch * 0.5, startTime + duration * 0.35);
      subOsc.frequency.exponentialRampToValueAtTime(endPitch * 0.5, startTime + duration);

      // Natural vocal vibrato LFO (~5.5 Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5.6, startTime);
      lfoGain.gain.setValueAtTime(0, startTime);
      lfoGain.gain.linearRampToValueAtTime(14, startTime + duration * 0.25);
      lfoGain.gain.linearRampToValueAtTime(8, startTime + duration * 0.7);
      lfoGain.gain.linearRampToValueAtTime(0, startTime + duration);

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      // Formant Filter: Bandpass swept to mimic opening canine muzzle
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4.5, startTime);
      filter.frequency.setValueAtTime(650, startTime);
      filter.frequency.exponentialRampToValueAtTime(1150, startTime + duration * 0.35);
      filter.frequency.exponentialRampToValueAtTime(520, startTime + duration);

      const subFilter = ctx.createBiquadFilter();
      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(400, startTime);

      // Volume Gain Envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(maxGain, startTime + duration * 0.25);
      gain.gain.linearRampToValueAtTime(maxGain * 0.85, startTime + duration * 0.65);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(subFilter);
      filter.connect(gain);
      subFilter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(startTime);
      osc1.start(startTime);
      osc2.start(startTime);
      subOsc.start(startTime);

      lfo.stop(startTime + duration);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
      subOsc.stop(startTime + duration);
    };

    if (variant === 'lone') {
      createSingleHowl(now, 260, 587.33, 311.13, 2.2, 0.28); // D4 -> D5 -> Eb4
    } else {
      createSingleHowl(now, 246.94, 523.25, 293.66, 2.4, 0.22); // B3 -> C5 -> D4
      createSingleHowl(now + 0.35, 293.66, 659.25, 349.23, 2.5, 0.20); // D4 -> E5 -> F4
    }
  }

  // Beer bottle pop / fizz sound when deploying Bee-R
  public playBeerOpen() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Pop oscillator
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(320, now);
    popOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
    popGain.gain.setValueAtTime(0.5, now);
    popGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.08);

    // Fizz noise buffer (foamy hiss)
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3500, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.25);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.02);
  }

  // Massive Bee-R flight buzzing sweep
  public playBeerBuzz() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Multi-saw swarm oscillators
    const freqs = [140, 142, 145, 280, 284];
    freqs.forEach((baseFreq, i) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      
      // Pitch sweeps up then down as it flies past
      osc.frequency.setValueAtTime(baseFreq * 0.8, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 2.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25 / freqs.length, now + 0.4);
      gain.gain.linearRampToValueAtTime(0.3 / freqs.length, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    });
  }
}

export const soundFx = new SoundEffects();

// =========================================================================
// AUSSIE OUTBACK MUSIC ENGINE
// Tracks:
// 1. "Plants vs Zombies Australia Music - Daytime in the Outback" (Grasswalk theme)
// 2. "PVZ Australia Music - Night Time in the Outback" (Moongrains theme for Pro Levels 7-12)
// Featuring: Deep Sub Didgeridoo Formant Drones, Bilma Clapping Sticks,
// Spooky Pizzicato Bass, Eerie Night Celeste Bells, and Spine-Chilling Dingo Howls!
// =========================================================================

const N = {
  _: 0, // Rest
  // Low Didgeridoo / Sub Bass Fundamentals
  D1: 36.71,
  E1: 41.20,
  F1: 43.65,
  Fs1: 46.25,
  G1: 49.00,
  A1: 55.00,
  B1: 61.74,
  C2: 65.41,
  D2: 73.42,
  Eb2: 77.78,
  E2: 82.41,
  F2: 87.31,
  Fs2: 92.50,
  G2: 98.00,
  Ab2: 103.83,
  A2: 110.00,
  Bb2: 116.54,
  B2: 123.47,
  // Mid-Bass
  C3: 130.81,
  Cs3: 138.59,
  D3: 146.83,
  Eb3: 155.56,
  E3: 164.81,
  F3: 174.61,
  Fs3: 185.00,
  G3: 196.00,
  Ab3: 207.65,
  A3: 220.00,
  Bb3: 233.08,
  B3: 246.94,
  // Midrange
  C4: 261.63,
  Cs4: 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  Fs4: 369.99,
  G4: 392.00,
  Ab4: 415.30,
  A4: 440.00,
  Bb4: 466.16,
  B4: 493.88,
  // Treble Lead & High Bells
  C5: 523.25,
  Cs5: 554.37,
  D5: 587.33,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  Fs5: 739.99,
  G5: 783.99,
  Ab5: 830.61,
  A5: 880.00,
  Bb5: 932.33,
  B5: 987.77,
  C6: 1046.50,
  Cs6: 1108.73,
  D6: 1174.66,
  Eb6: 1244.51,
  E6: 1318.51,
  F6: 1396.91,
  Fs6: 1479.98,
  G6: 1567.98,
  A6: 1760.00,
  B6: 1975.53,
};

// -------------------------------------------------------------
// 0. MAIN MENU TRACK SCORES ("G'day Neighbour" - 106 BPM)
// Iconic Plants vs Zombies Main Menu Theme adapted for the Aussie Outback
// Featuring: Deep D1 Didgeridoo Drones, Rumble in the Jungle Log Drums,
// Bouncy Stride Bass, Spooky Celesta Chimes, Accordion & Whistling Overtones!
// -------------------------------------------------------------

const MENU_MELODY_SCORE: number[] = [
  // Bars 1-4: Spooky Outback Chime Intro (Iconic PvZ Menu Arpeggio)
  N.D5, N._, N.F5, N._,  N.A5, N._, N.D6, N._,  N.C6, N._, N.A5, N._,  N.F5, N._, N.E5, N._,
  N.D5, N._, N.F5, N._,  N.A5, N._, N.D6, N._,  N.Cs6, N._, N.A5, N._, N.F5, N._, N.E5, N._,
  N.D5, N._, N.F5, N._,  N.A5, N._, N.D6, N._,  N.C6, N._, N.A5, N._,  N.F5, N._, N.E5, N._,
  N.Bb5, N._, N.A5, N._, N.G5, N._, N.F5, N._,  N.E5, N._, N.D5, N._,  N.Cs5, N._, N.E5, N._,

  // Bars 5-8: Main Theme Part A (The Iconic PvZ Main Menu Stride Melody)
  N.D5, N._, N._, N._,   N.F5, N._, N._, N._,   N.E5, N._, N._, N.D5,  N.A4, N._, N.A4, N._,
  N.Bb4, N._, N._, N._,  N.A4, N._, N.G4, N._,  N.A4, N._, N.A4, N._,  N.A4, N._, N._, N._,
  N.D5, N._, N._, N._,   N.F5, N._, N._, N._,   N.A5, N._, N._, N.G5,  N.F5, N._, N.F5, N._,
  N.E5, N._, N._, N._,   N.D5, N._, N.Cs5, N._, N.E5, N._, N.E5, N._,  N.E5, N._, N._, N._,

  // Bars 9-12: Main Theme Part A2 (With Chromatic Flourish & Jungle Stomp)
  N.D5, N._, N._, N._,   N.F5, N._, N._, N._,   N.E5, N._, N._, N.D5,  N.A4, N._, N.A4, N._,
  N.Bb4, N._, N._, N._,  N.A4, N._, N.G4, N._,  N.A4, N._, N.D5, N._,  N.F5, N._, N.A5, N._,
  N.G5, N._, N.F5, N._,  N.E5, N._, N.D5, N._,  N.Cs5, N._, N.D5, N._, N.E5, N._, N.Cs5, N._,
  N.D5, N._, N.D5, N._,  N.D5, N._, N._, N._,   N._, N._, N._, N._,    N._, N._, N._, N._,

  // Bars 13-16: Spooky Harmony & Jungle Rumble Breakdown ("Rumble in the Jungle")
  N.F5, N.G5, N.A5, N.Bb5, N.A5, N.G5, N.F5, N.E5, N.D5, N.E5, N.F5, N.G5, N.F5, N.E5, N.D5, N.Cs5,
  N.D5, N._, N.F5, N._,  N.A5, N._, N.D6, N._,  N.C6, N._, N.Bb5, N._, N.A5, N._, N.G5, N._,
  N.F5, N._, N.E5, N._,  N.D5, N._, N.Cs5, N._, N.D5, N._, N.E5, N._,  N.F5, N._, N.G5, N._,
  N.A5, N._, N.A5, N._,  N.A5, N._, N._, N._,   N.Cs5, N.D5, N.E5, N.F5, N.G5, N.A5, N.Bb5, N.Cs6,

  // Bars 17-20: G'day Neighbour Climax (High Celesta + Marimba + Whistling Accordion)
  N.D6, N._, N.D6, N._,  N.A5, N._, N.F5, N._,  N.G5, N._, N.A5, N._,  N.Bb5, N._, N.G5, N._,
  N.A5, N._, N.A5, N._,  N.F5, N._, N.D5, N._,  N.E5, N._, N.F5, N._,  N.G5, N._, N.E5, N._,
  N.F5, N._, N.D5, N._,  N.Bb4, N._, N.D5, N._, N.Cs5, N._, N.E5, N._, N.A5, N._, N.G5, N._,
  N.F5, N._, N.E5, N._,  N.D5, N._, N.Cs5, N._, N.D5, N._, N.D5, N._,  N.D5, N._, N._, N._,

  // Bars 21-24: Outback Jungle Rumble & Resonant Didgeridoo Grooves
  N.A5, N._, N._, N._,   N.D6, N._, N._, N._,   N.F6, N._, N._, N._,   N.E6, N._, N.Cs6, N._,
  N.D6, N._, N.A5, N._,  N.F5, N._, N.D5, N._,  N.G5, N._, N.Bb5, N._, N.A5, N._, N.G5, N._,
  N.F5, N._, N.D5, N._,  N.E5, N._, N.Cs5, N._, N.D5, N._, N.F5, N._,  N.A5, N._, N.D6, N._,
  N.Cs6, N._, N.D6, N._, N.E6, N._, N.Cs6, N._, N.D6, N._, N.D6, N._,  N.D6, N._, N._, N._,

  // Bars 25-28: Aussie Neighbour's Jaunty March (PvZ Fast Stride Arpeggios)
  N.D5, N.F5, N.E5, N.D5, N.A4, N.C5, N.B4, N.A4, N.G4, N.Bb4, N.A4, N.G4, N.F4, N.A4, N.G4, N.F4,
  N.E4, N.G4, N.F4, N.E4, N.D4, N.F4, N.E4, N.D4, N.Cs4, N.E4, N.G4, N.Bb4, N.A4, N.G4, N.F4, N.E4,
  N.D4, N.F4, N.A4, N.D5, N.F5, N.A5, N.D6, N.F6, N.E6, N.D6, N.Cs6, N.B5, N.A5, N.G5, N.F5, N.E5,
  N.D5, N._, N.F5, N._,  N.A5, N._, N.D6, N._,  N.Cs6, N._, N.D6, N._, N._, N._, N._, N._,

  // Bars 29-32: Loop Turnaround & Bush Ambience
  N.D5, N._, N.A4, N._,  N.F4, N._, N.D4, N._,  N.Bb4, N._, N.G4, N._, N.E4, N._, N.Cs4, N._,
  N.D4, N._, N.F4, N._,  N.A4, N._, N.D5, N._,  N.E5, N._, N.F5, N._,  N.G5, N._, N.E5, N._,
  N.F5, N._, N.D5, N._,  N.A5, N._, N.F5, N._,  N.Cs6, N._, N.D6, N._, N.E6, N._, N.Cs6, N._,
  N.D6, N._, N.A5, N._,  N.F5, N._, N.D5, N._,  N.A4, N._, N._, N._,   N.D5, N.F5, N.A5, N.Cs6,
];

const MENU_BASS_BAR_A = [N.D2, N._, N.D3, N._,  N.A2, N._, N.D3, N._,  N.F2, N._, N.D3, N._,  N.A2, N._, N.D3, N._];
const MENU_BASS_BAR_B = [N.G2, N._, N.D3, N._,  N.Bb2, N._, N.D3, N._,  N.A2, N._, N.E3, N._,  N.Cs3, N._, N.E3, N._];
const MENU_BASS_BAR_C = [N.Bb2, N._, N.F3, N._,  N.D3, N._, N.F3, N._,  N.A2, N._, N.E3, N._,  N.G2, N._, N.E3, N._];
const MENU_BASS_BAR_D = [N.D2, N._, N.A2, N._,  N.D3, N._, N.F2, N._,  N.A2, N._, N.Cs3, N._,  N.D3, N._, N.A2, N._];

// -------------------------------------------------------------
// 1. DAYTIME TRACK SCORES ("Daytime in the Outback" - 128 BPM)
// -------------------------------------------------------------

const DAY_MELODY_SCORE: number[] = [
  // Bars 1-4: Outback Intro
  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,
  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,
  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,
  N._, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,  N.A4, N.B4, N.C5, N.D5,

  // Bars 5-8: Main Daytime Theme A
  N.E5, N._, N.E5, N._,  N.D5, N._, N.D5, N._,  N.C5, N._, N.C5, N._,  N.A4, N._, N.A4, N._,
  N.G4, N._, N.G4, N._,  N.A4, N._, N.A4, N._,  N.C5, N._, N.C5, N._,  N.D5, N._, N.D5, N._,
  N.E5, N._, N.E5, N._,  N.E5, N._, N._, N._,   N.G5, N._, N.G5, N._,  N.E5, N._, N.E5, N._,
  N.D5, N._, N.D5, N._,  N.C5, N._, N.C5, N._,  N.D5, N._, N.D5, N._,  N.D5, N._, N._, N._,

  // Bars 9-12: Main Daytime Theme A2
  N.E5, N._, N.E5, N._,  N.D5, N._, N.D5, N._,  N.C5, N._, N.C5, N._,  N.A4, N._, N.A4, N._,
  N.G4, N._, N.G4, N._,  N.A4, N._, N.A4, N._,  N.C5, N._, N.C5, N._,  N.D5, N._, N.D5, N._,
  N.E5, N._, N.E5, N._,  N.C5, N._, N.C5, N._,  N.A4, N._, N.A4, N._,  N.A4, N._, N._, N._,
  N.G4, N._, N.A4, N._,  N.C5, N._, N.D5, N._,  N.E5, N._, N.G5, N._,  N.A5, N._, N._, N._,

  // Bars 13-16: Horde Tension Theme
  N.A5, N.C6, N.B5, N.G5,  N.A5, N.E5, N.G5, N.F5,  N.E5, N.D5, N.E5, N.F5,  N.E5, N._, N.D5, N._,
  N.C5, N.E5, N.D5, N.B4,  N.C5, N.G4, N.A4, N._,   N.B4, N._, N.C5, N._,   N.D5, N._, N.E5, N._,
  N.A5, N.C6, N.B5, N.G5,  N.A5, N.E5, N.G5, N.F5,  N.E5, N.D5, N.E5, N.F5,  N.E5, N._, N.D5, N._,
  N.C5, N.E5, N.D5, N.B4,  N.C5, N.G4, N.A4, N._,   N.G4, N._, N.A4, N._,   N.C5, N._, N.E5, N._,

  // Bars 17-20: Horde Climax
  N.A5, N._, N.C6, N._,  N.D6, N._, N.E6, N._,  N.D6, N._, N.C6, N._,  N.B5, N._, N.G5, N._,
  N.A5, N._, N.A5, N._,  N.E5, N._, N.G5, N._,  N.A5, N._, N.A5, N._,  N.A5, N._, N._, N._,
  N.F5, N._, N.F5, N._,  N.E5, N._, N.D5, N._,  N.C5, N._, N.B4, N._,  N.A4, N._, N.G4, N._,
  N.A4, N.B4, N.C5, N.D5,  N.E5, N.F5, N.G5, N.Ab5, N.A5, N._, N.A5, N._, N.A5, N._, N._, N._,

  // Bars 21-24: Outback Bush Breakdown
  N.E5, N._, N.D5, N._,  N.C5, N._, N.A4, N._,  N._, N._, N._, N._,   N.G4, N._, N.A4, N._,
  N.C5, N._, N.D5, N._,  N.E5, N._, N.G5, N._,  N._, N._, N._, N._,   N.E5, N._, N.D5, N._,
  N.C5, N._, N.A4, N._,  N.G4, N._, N.A4, N._,  N._, N._, N._, N._,   N.C5, N._, N.D5, N._,
  N.E5, N._, N.G5, N._,  N.A5, N._, N.C6, N._,  N.A5, N._, N.G5, N._,  N.E5, N._, N.D5, N._,

  // Bars 25-28: Aussie Harmonic Jam
  N.C5, N._, N.C5, N._,  N.D5, N._, N.D5, N._,  N.E5, N._, N.E5, N._,  N.G5, N._, N.E5, N._,
  N.D5, N._, N.C5, N._,  N.A4, N._, N.G4, N._,  N.A4, N._, N.C5, N._,  N.D5, N._, N.E5, N._,
  N.A5, N._, N.G5, N._,  N.E5, N._, N.D5, N._,  N.C5, N._, N.A4, N._,  N.G4, N._, N.E4, N._,
  N.A4, N._, N.C5, N._,  N.D5, N._, N.E5, N._,  N.G5, N._, N.A5, N._,  N.C6, N._, N._, N._,

  // Bars 29-32: Turnaround Loop
  N.E6, N._, N.D6, N._,  N.C6, N._, N.A5, N._,  N.G5, N._, N.E5, N._,  N.D5, N._, N.C5, N._,
  N.A4, N._, N.C5, N._,  N.D5, N._, N.E5, N._,  N.G5, N._, N.A5, N._,  N.C6, N._, N.D6, N._,
  N.E6, N.D6, N.C6, N.B5,  N.A5, N.G5, N.F5, N.E5,  N.D5, N.C5, N.B4, N.A4,  N.G4, N.A4, N.B4, N.C5,
  N.D5, N.E5, N.G5, N.A5,  N.C6, N.A5, N.G5, N.E5,  N.D5, N._, N.C5, N._,   N.A4, N._, N._, N._,
];

const DAY_BASS_BAR_A = [N.A2, N._, N.A2, N._,  N.C3, N._, N.D3, N._,  N.Eb3, N._, N.E3, N._,  N.G2, N._, N.A2, N._];
const DAY_BASS_BAR_B = [N.D3, N._, N.D3, N._,  N.F3, N._, N.G3, N._,  N.Ab3, N._, N.A3, N._,  N.C3, N._, N.D3, N._];
const DAY_BASS_BAR_C = [N.F2, N._, N.F2, N._,  N.A2, N._, N.C3, N._,  N.E2, N._, N.G2, N._,  N.B2, N._, N.E2, N._];
const DAY_BASS_BAR_D = [N.A2, N._, N.E2, N._,  N.G2, N._, N.A2, N._,  N.C3, N._, N.D3, N._,  N.E3, N._, N.G2, N._];

interface DidgeStep {
  freq: number;
  formant: number;
  gain: number;
}

const DAY_DIDGE_PATTERN: DidgeStep[] = [
  { freq: N.A1, formant: 420, gain: 0.8 },
  { freq: N.A1, formant: 550, gain: 0.5 },
  { freq: N.A1, formant: 780, gain: 0.9 },
  { freq: N.A1, formant: 360, gain: 0.6 },
  { freq: N.E2, formant: 650, gain: 0.8 },
  { freq: N.A1, formant: 480, gain: 0.5 },
  { freq: N.A1, formant: 850, gain: 0.95 },
  { freq: N.A1, formant: 380, gain: 0.6 },
  { freq: N.A1, formant: 450, gain: 0.85 },
  { freq: N.A1, formant: 600, gain: 0.5 },
  { freq: N.D2, formant: 720, gain: 0.9 },
  { freq: N.A1, formant: 350, gain: 0.6 },
  { freq: N.A1, formant: 520, gain: 0.75 },
  { freq: N.A1, formant: 820, gain: 0.9 },
  { freq: N.A1, formant: 400, gain: 0.6 },
  { freq: N.E2, formant: 680, gain: 0.7 },
];

// -------------------------------------------------------------
// 2. NIGHTTIME TRACK SCORES ("Night Time in the Outback" - 116 BPM)
// Adaption of PvZ Moongrains / Night Theme in E minor / B minor
// Featuring high Celeste bells, stealth bass, and Dingo howls
// -------------------------------------------------------------

const NIGHT_MELODY_SCORE: number[] = [
  // Bars 1-4: Eerie Nocturnal Ambience & Celeste Sparks
  N._, N._, N._, N._,  N.B5, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,
  N._, N._, N.G5, N._, N.E5, N._, N._, N._,  N._, N._, N._, N._,  N._, N._, N._, N._,
  N._, N._, N._, N._,  N._, N._, N._, N._,   N.E5, N._, N.Fs5, N._, N.G5, N._, N.A5, N._,
  N.B5, N._, N._, N._, N._, N._, N._, N._,   N._, N._, N._, N._,  N.Fs5, N.G5, N.A5, N.B5, // (Dingo Howl 1 during pause)

  // Bars 5-8: Iconic Moongrains Night Theme A (E Minor Theme)
  N.B5, N._, N.G5, N._,  N.E5, N._, N.Fs5, N.G5,  N.A5, N._, N.Fs5, N._,  N.D5, N._, N.E5, N.Fs5,
  N.G5, N._, N.E5, N._,  N.C5, N._, N.D5, N.E5,   N.Fs5, N._, N.Eb5, N._, N.B4, N._, N.Eb5, N.Fs5,
  N.B5, N._, N.G5, N._,  N.E5, N._, N.Fs5, N.G5,  N.A5, N._, N.Fs5, N._,  N.D5, N._, N.E5, N.Fs5,
  N.G5, N._, N.E5, N._,  N.C5, N._, N.E5, N.G5,   N.B5, N._, N.B5, N._,   N.B5, N._, N._, N._,

  // Bars 9-12: Moongrains Theme A2 (Suspense Development & High Bells)
  N.B5, N._, N.G5, N._,  N.E5, N._, N.Fs5, N.G5,  N.D6, N._, N.B5, N._,   N.G5, N._, N.A5, N.B5,
  N.C6, N._, N.A5, N._,  N.Fs5, N._, N.G5, N.A5,  N.B5, N._, N.G5, N._,   N.E5, N._, N.G5, N.B5,
  N.C6, N._, N.B5, N._,  N.A5, N._, N.G5, N._,    N.Fs5, N._, N.E5, N._,  N.Eb5, N._, N.Fs5, N._,
  N.E5, N._, N.E5, N._,  N.E5, N._, N._, N._,     N._, N._, N._, N._,    N._, N._, N._, N._,

  // Bars 13-16: Night Suspense Bridge & Haunting Dingo Pack Howls
  N.E5, N._, N.G5, N._,  N.B5, N._, N.E6, N._,    N.D6, N._, N.B5, N._,   N.G5, N._, N.E5, N._,
  N._, N._, N._, N._,    N._, N._, N._, N._,     N._, N._, N._, N._,    N._, N._, N._, N._, // (Dingo Pack Howl 2)
  N.C5, N._, N.E5, N._,  N.A5, N._, N.C6, N._,    N.B5, N._, N.G5, N._,   N.Eb5, N._, N.B4, N._,
  N._, N._, N._, N._,    N._, N._, N._, N._,     N.E5, N.Fs5, N.G5, N.A5, N.B5, N.C6, N.D6, N.Eb6, // (Dingo Howl 3)

  // Bars 17-20: Pro Level Horde Night Rush (Fast Driving Bells & Moongrains Climax)
  N.E6, N.B5, N.G5, N.E5,  N.G5, N.B5, N.E6, N.G6,  N.Fs6, N.D6, N.A5, N.Fs5, N.A5, N.D6, N.Fs6, N.A6,
  N.G6, N.E6, N.C6, N.G5,  N.C6, N.E6, N.G6, N.B6,  N.Fs6, N.Eb6, N.B5, N.Fs5, N.B5, N.Eb6, N.Fs6, N.B6,
  N.E6, N.B5, N.G5, N.E5,  N.G5, N.B5, N.E6, N.G6,  N.Fs6, N.D6, N.A5, N.Fs5, N.A5, N.D6, N.Fs6, N.A6,
  N.G6, N.E6, N.C6, N.G5,  N.E6, N.C6, N.G5, N.E5,  N.B5, N._, N.B5, N._,    N.B5, N._, N._, N._,

  // Bars 21-24: Outback Night Climax & Descending Arabesque
  N.E6, N.D6, N.C6, N.B5,  N.A5, N.G5, N.Fs5, N.E5, N.Eb5, N.Fs5, N.A5, N.C6, N.B5, N.G5, N.E5, N.Eb5,
  N.E5, N._, N.E5, N._,    N.B5, N._, N.B5, N._,    N.E6, N._, N.E6, N._,   N.G6, N._, N.E6, N._,
  N.D6, N._, N.B5, N._,    N.A5, N._, N.Fs5, N._,   N.G5, N._, N.E5, N._,   N.Eb5, N._, N.B4, N._,
  N.E5, N._, N.G5, N._,    N.B5, N._, N.E6, N._,    N.Eb6, N._, N.D6, N._,  N.Cs6, N._, N.C6, N._,

  // Bars 25-28: Chromatic Midnight Stealth & Didgeridoo Throat Breakdown
  N.B5, N._, N.Bb5, N._,   N.A5, N._, N.Ab5, N._,   N.G5, N._, N.Fs5, N._,  N.F5, N._, N.E5, N._,
  N.Eb5, N._, N.E5, N._,   N.G5, N._, N.B5, N._,    N.A5, N._, N.G5, N._,   N.Fs5, N._, N.E5, N._,
  N.C5, N._, N.E5, N._,    N.G5, N._, N.C6, N._,    N.B5, N._, N.G5, N._,   N.Eb5, N._, N.Fs5, N._,
  N.E5, N._, N._, N._,     N._, N._, N._, N._,      N._, N._, N._, N._,     N._, N._, N._, N._, // (Dingo Howl 4)

  // Bars 29-32: Nightfall Resolution & Turnaround Loop
  N.B5, N._, N.G5, N._,    N.E5, N._, N.Fs5, N.G5,  N.A5, N._, N.Fs5, N._,  N.D5, N._, N.E5, N.Fs5,
  N.G5, N._, N.E5, N._,    N.C5, N._, N.D5, N.E5,   N.Fs5, N._, N.Eb5, N._, N.B4, N._, N.Eb5, N.Fs5,
  N.E5, N.G5, N.B5, N.E6,  N.B5, N.G5, N.E5, N.G5,  N.A5, N.C6, N.E6, N.A6, N.Fs6, N.D6, N.B5, N.G5,
  N.E6, N._, N.B5, N._,    N.G5, N._, N.E5, N._,    N.B4, N._, N._, N._,    N._, N._, N._, N._, // (Fading lone howl into loop)
];

const NIGHT_BASS_BAR_A = [N.E2, N._, N.E2, N._,  N.G2, N._, N.A2, N._,  N.Bb2, N._, N.B2, N._,  N.D3, N._, N.E3, N._];
const NIGHT_BASS_BAR_B = [N.A2, N._, N.A2, N._,  N.C3, N._, N.D3, N._,  N.Eb3, N._, N.E3, N._,  N.G2, N._, N.A2, N._];
const NIGHT_BASS_BAR_C = [N.C2, N._, N.C2, N._,  N.E2, N._, N.G2, N._,  N.B1, N._, N.Eb2, N._,  N.Fs2, N._, N.B2, N._];
const NIGHT_BASS_BAR_D = [N.E2, N._, N.B1, N._,  N.E2, N._, N.G2, N._,  N.A2, N._, N.Bb2, N._,  N.B2, N._, N.D2, N._];

const NIGHT_DIDGE_PATTERN: DidgeStep[] = [
  { freq: N.E1, formant: 320, gain: 0.9 }, // Heavy Low Sub Drone "WOH"
  { freq: N.E1, formant: 440, gain: 0.55 },
  { freq: N.E1, formant: 620, gain: 0.85 }, // Resonant Throat Accent "WAH"
  { freq: N.E1, formant: 290, gain: 0.6 },
  { freq: N.B1, formant: 520, gain: 0.8 }, // Harmonic 5th jump
  { freq: N.E1, formant: 380, gain: 0.55 },
  { freq: N.E1, formant: 700, gain: 0.9 }, // High resonant push
  { freq: N.E1, formant: 310, gain: 0.6 },
  { freq: N.E1, formant: 360, gain: 0.85 },
  { freq: N.E1, formant: 480, gain: 0.55 },
  { freq: N.D2, formant: 580, gain: 0.8 },
  { freq: N.E1, formant: 300, gain: 0.6 },
  { freq: N.E1, formant: 420, gain: 0.75 },
  { freq: N.E1, formant: 680, gain: 0.88 }, // Double-tongued "Dook-Wah"
  { freq: N.E1, formant: 340, gain: 0.6 },
  { freq: N.B1, formant: 540, gain: 0.75 },
];

export class OutbackMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private timerId: number | null = null;
  private nextNoteTime: number = 0;
  private currentStep: number = 0;
  private tempo: number = 106; // 106 BPM for Menu ("G'day Neighbour"), 128 BPM for Day, 116 BPM for Night
  public volume: number = 0.65;
  public isMuted: boolean = false;
  public currentTrack: 'menu' | 'day' | 'night' = 'menu';
  private menuSnareBuffer: AudioBuffer | null = null;
  private dayStickBuffer: AudioBuffer | null = null;
  private nightShakerBuffer: AudioBuffer | null = null;

  // Master music gain node
  private masterGain: GainNode | null = null;

  constructor() {
    // Initialized lazily upon user gesture
  }

  public get trackName(): string {
    if (this.currentTrack === 'menu') {
      return "G'day Neighbour (PvZ Australia Main Menu Theme)";
    }
    return this.currentTrack === 'night'
      ? 'PVZ Australia Music - Night Time in the Outback'
      : 'Plants vs Zombies Australia Music - Daytime in the Outback';
  }

  private initAudio() {
    if (!this.ctx) {
      this.ctx = getSharedAudioContext();
    }
    if (this.ctx && !this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setTrack(track: 'menu' | 'day' | 'night') {
    if (this.currentTrack === track) return;
    this.currentTrack = track;
    this.tempo = track === 'menu' ? 106 : track === 'night' ? 116 : 128;
    this.currentStep = 0;
    if (this.isPlaying && this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.05;
    }
  }

  public resumeContextIfNeeded() {
    if (!this.ctx) {
      this.initAudio();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (this.isPlaying && !this.isPaused && this.ctx) {
          this.nextNoteTime = this.ctx.currentTime + 0.03;
          if (this.timerId === null) {
            this.scheduleLoop();
          }
        }
      }).catch(() => {});
    }
    if (this.isPlaying && !this.isPaused && this.ctx) {
      const stepDuration = 60 / this.tempo / 4;
      if (this.nextNoteTime < this.ctx.currentTime) {
        const missedSteps = Math.ceil((this.ctx.currentTime - this.nextNoteTime) / stepDuration);
        this.currentStep = (this.currentStep + missedSteps) % 512;
        this.nextNoteTime = this.ctx.currentTime + 0.03;
      }
      if (this.timerId === null) {
        this.scheduleLoop();
      }
    }
  }

  public play(track?: 'menu' | 'day' | 'night') {
    this.initAudio();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (this.isPlaying && !this.isPaused && this.ctx && this.timerId === null) {
          this.nextNoteTime = this.ctx.currentTime + 0.03;
          this.scheduleLoop();
        }
      }).catch(() => {});
    }

    if (track && track !== this.currentTrack) {
      this.currentTrack = track;
      this.tempo = track === 'menu' ? 106 : track === 'night' ? 116 : 128;
      this.currentStep = 0;
    }

    if (this.isPlaying && !this.isPaused) {
      if (this.nextNoteTime < this.ctx.currentTime) {
        const stepDuration = 60 / this.tempo / 4;
        const missedSteps = Math.ceil((this.ctx.currentTime - this.nextNoteTime) / stepDuration);
        this.currentStep = (this.currentStep + missedSteps) % 512;
        this.nextNoteTime = this.ctx.currentTime + 0.03;
      }
      if (this.timerId === null) {
        this.scheduleLoop();
      }
      return;
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.nextNoteTime = this.ctx.currentTime + 0.05;

    if (this.timerId === null) {
      this.scheduleLoop();
    }
  }

  public pause() {
    this.isPaused = true;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public resume() {
    if (this.isPlaying && this.isPaused) {
      this.play();
    }
  }

  public stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 0;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.05);
    }
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.05);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !this.isPaused;
  }

  // Ahead-of-time Web Audio Scheduler
  private scheduleLoop = () => {
    if (!this.isPlaying || this.isPaused || !this.ctx || !this.masterGain) {
      this.timerId = null;
      return;
    }

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const stepDuration = 60 / this.tempo / 4; // 16th note duration
      const lookAhead = 0.28; // schedule notes 280ms ahead of time for jitter-free stability

      // If audio timer fell behind (tab switch, system sleep, or thread lag),
      // smoothly resync without firing past notes simultaneously
      if (this.nextNoteTime < this.ctx.currentTime) {
        const missedSteps = Math.ceil((this.ctx.currentTime - this.nextNoteTime) / stepDuration);
        this.currentStep = (this.currentStep + missedSteps) % 512;
        this.nextNoteTime = this.ctx.currentTime + 0.03;
      }

      let stepsProcessed = 0;
      while (this.nextNoteTime < this.ctx.currentTime + lookAhead && stepsProcessed < 16) {
        stepsProcessed++;
        if (this.currentTrack === 'menu') {
          this.scheduleMenuStep(this.currentStep, this.nextNoteTime, stepDuration);
        } else if (this.currentTrack === 'night') {
          this.scheduleNightStep(this.currentStep, this.nextNoteTime, stepDuration);
        } else {
          this.scheduleDayStep(this.currentStep, this.nextNoteTime, stepDuration);
        }
        this.nextNoteTime += stepDuration;
        this.currentStep = (this.currentStep + 1) % 512; // Seamless 32-bar loop!
      }
    } catch (err) {
      // Guard against transient Web Audio errors so scheduler loop never dies
      console.warn('Audio scheduler tick caught exception:', err);
    } finally {
      if (this.isPlaying && !this.isPaused) {
        this.timerId = window.setTimeout(this.scheduleLoop, 30);
      } else {
        this.timerId = null;
      }
    }
  };

  // -------------------------------------------------------------
  // MAIN MENU STEP SCHEDULING ("G'day Neighbour" - 106 BPM)
  // -------------------------------------------------------------
  private scheduleMenuStep(step: number, time: number, stepDuration: number) {
    if (!this.ctx || !this.masterGain) return;

    const barIdx = Math.floor(step / 16);
    const stepInBar = step % 16;

    // 1. Warm PvZ Style Menu Percussion (Soft bass drum, brush snare on 2 & 4, subtle wood accents - no harsh tapping)
    this.synthesizeMenuPercussion(stepInBar, barIdx, time);

    // 2. Spooky Stride Walking Bass (D Minor bouncy macabre stride)
    let bassNote = N._;
    if (barIdx % 4 === 0) bassNote = MENU_BASS_BAR_A[stepInBar];
    else if (barIdx % 4 === 1) bassNote = MENU_BASS_BAR_B[stepInBar];
    else if (barIdx % 4 === 2) bassNote = MENU_BASS_BAR_C[stepInBar];
    else bassNote = MENU_BASS_BAR_D[stepInBar];

    if (bassNote > 0) {
      this.synthesizeMenuBass(time, bassNote, stepDuration * 0.95);
    }

    // 3. PvZ Accordion & Marimba Staccato Chords (Beats 2 and 4 + syncopations)
    if (stepInBar === 4 || stepInBar === 12 || (stepInBar === 14 && barIdx % 2 === 1)) {
      this.synthesizeMenuChords(barIdx, time, stepDuration * 1.5);
    }

    // 4. Iconic Plants vs Zombies Main Menu Lead (Celesta Music-Box + Warm Bush Whistle Chimes)
    const melodyNote = MENU_MELODY_SCORE[step] || N._;
    if (melodyNote > 0) {
      this.synthesizeMenuLead(time, melodyNote, stepDuration * 2.0);
    }

    // 5. Atmospheric Bush Wildlife Call Accents on Section Turnarounds
    if (step === 48) {
      this.synthesizeDingoHowl(time, 'lone');
    } else if (step === 240) {
      this.synthesizeDingoHowl(time, 'lone');
    } else if (step === 496) {
      this.synthesizeDingoHowl(time, 'pack');
    }
  }

  // -------------------------------------------------------------
  // DAYTIME STEP SCHEDULING (Grasswalk Outback)
  // -------------------------------------------------------------
  private scheduleDayStep(step: number, time: number, stepDuration: number) {
    if (!this.ctx || !this.masterGain) return;

    const barIdx = Math.floor(step / 16);
    const stepInBar = step % 16;

    // 1. Aussie Bilma Clapping Sticks & Bush Percussion
    this.synthesizePercussion(stepInBar, barIdx, time);

    // 2. PvZ Bouncy Synth Bass
    let bassNote = N._;
    if (barIdx % 4 === 0) bassNote = DAY_BASS_BAR_A[stepInBar];
    else if (barIdx % 4 === 1) bassNote = DAY_BASS_BAR_B[stepInBar];
    else if (barIdx % 4 === 2) bassNote = DAY_BASS_BAR_C[stepInBar];
    else bassNote = DAY_BASS_BAR_D[stepInBar];

    if (bassNote > 0) {
      this.synthesizeBass(time, bassNote, stepDuration * 0.9);
    }

    // 3. PvZ Marimba / Piano Chord Stabs (Beats 2 and 4 + off-beat syncopation)
    if (stepInBar === 4 || stepInBar === 12 || (stepInBar === 14 && barIdx % 2 === 1)) {
      this.synthesizeChords(barIdx, time, stepDuration * 1.5);
    }

    // 4. PvZ Daytime / Horde Lead Melody
    const melodyNote = DAY_MELODY_SCORE[step] || N._;
    if (melodyNote > 0) {
      this.synthesizeLead(time, melodyNote, stepDuration * 1.8);
    }
  }

  // -------------------------------------------------------------
  // NIGHTTIME STEP SCHEDULING (PVZ Australia Music - Night Time in the Outback)
  // -------------------------------------------------------------
  private scheduleNightStep(step: number, time: number, stepDuration: number) {
    if (!this.ctx || !this.masterGain) return;

    const barIdx = Math.floor(step / 16);
    const stepInBar = step % 16;

    // 1. Night Bush Percussion (Nocturnal sand shakers, hollow woodblocks, sub-kicks)
    this.synthesizeNightPercussion(stepInBar, barIdx, time);

    // 2. Spooky Stealth Pizzicato Walking Bass
    let bassNote = N._;
    if (barIdx % 4 === 0) bassNote = NIGHT_BASS_BAR_A[stepInBar];
    else if (barIdx % 4 === 1) bassNote = NIGHT_BASS_BAR_B[stepInBar];
    else if (barIdx % 4 === 2) bassNote = NIGHT_BASS_BAR_C[stepInBar];
    else bassNote = NIGHT_BASS_BAR_D[stepInBar];

    if (bassNote > 0) {
      this.synthesizeNightBass(time, bassNote, stepDuration * 0.95);
    }

    // 4. Eerie Harmonic Night Stabs
    if (stepInBar === 4 || stepInBar === 12 || (stepInBar === 10 && barIdx % 2 === 1)) {
      this.synthesizeNightChords(barIdx, time, stepDuration * 1.6);
    }

    // 5. High Eerie Celeste Music-Box & Glockenspiel Melody
    const melodyNote = NIGHT_MELODY_SCORE[step] || N._;
    if (melodyNote > 0) {
      this.synthesizeNightLead(time, melodyNote, stepDuration * 2.2);
    }

    // 6. Atmospheric Wild Dingo Howls in Pauses (Bars 4, 14, 16, 28, 32)
    if (step === 48) {
      // Bar 4: Lone eerie opening howl
      this.synthesizeDingoHowl(time, 'lone');
    } else if (step === 208) {
      // Bar 14: Distant wolf pack howl in suspense breakdown
      this.synthesizeDingoHowl(time, 'pack');
    } else if (step === 240) {
      // Bar 16: Rising tension howl leading into horde rush
      this.synthesizeDingoHowl(time, 'lone');
    } else if (step === 432) {
      // Bar 28: Midnight echo howl
      this.synthesizeDingoHowl(time, 'pack');
    } else if (step === 496) {
      // Bar 32: Fading loop turnaround howl
      this.synthesizeDingoHowl(time, 'lone');
    }
  }

  // --- INSTRUMENT SYNTHESIZERS ---

  // 0. Warm & Classic PvZ Main Menu Percussion (Soft bass drum on 1 & 3, brush snare on 2 & 4 - no constant tapping)
  private synthesizeMenuPercussion(stepInBar: number, barIdx: number, time: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    // A. Warm Downbeat Bass Drum (Beats 1 & 3: steps 0 & 8)
    if (stepInBar === 0 || stepInBar === 8) {
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();

      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(110, safeTime);
      kickOsc.frequency.exponentialRampToValueAtTime(38, safeTime + 0.16);

      const kickVol = stepInBar === 0 ? 0.38 : 0.28;
      kickGain.gain.setValueAtTime(kickVol, safeTime);
      kickGain.gain.exponentialRampToValueAtTime(0.002, safeTime + 0.16);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);

      kickOsc.start(safeTime);
      kickOsc.stop(safeTime + 0.16);
    }

    // B. Soft Brush / Rim Snare (Beats 2 & 4: steps 4 & 12)
    if (stepInBar === 4 || stepInBar === 12) {
      if (!this.menuSnareBuffer || this.menuSnareBuffer.sampleRate !== this.ctx.sampleRate) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.045);
        this.menuSnareBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = this.menuSnareBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
        }
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = this.menuSnareBuffer;

      const snareFilter = this.ctx.createBiquadFilter();
      snareFilter.type = 'bandpass';
      snareFilter.Q.setValueAtTime(2.2, safeTime);
      snareFilter.frequency.setValueAtTime(1600, safeTime);

      const snareGain = this.ctx.createGain();
      snareGain.gain.setValueAtTime(0.18, safeTime);
      snareGain.gain.exponentialRampToValueAtTime(0.001, safeTime + 0.045);

      noise.connect(snareFilter);
      snareFilter.connect(snareGain);
      snareGain.connect(this.masterGain);

      noise.start(safeTime);
    }

    // C. Soft Wood Accent / Low Tom (Subtle phrasing on step 14 in odd bars)
    if (stepInBar === 14 && barIdx % 2 === 1) {
      const tomOsc = this.ctx.createOscillator();
      const tomGain = this.ctx.createGain();

      tomOsc.type = 'sine';
      tomOsc.frequency.setValueAtTime(240, safeTime);
      tomOsc.frequency.exponentialRampToValueAtTime(90, safeTime + 0.09);

      tomGain.gain.setValueAtTime(0.14, safeTime);
      tomGain.gain.exponentialRampToValueAtTime(0.002, safeTime + 0.09);

      tomOsc.connect(tomGain);
      tomGain.connect(this.masterGain);

      tomOsc.start(safeTime);
      tomOsc.stop(safeTime + 0.09);
    }
  }

  // 0c. Bouncy Stride Bass (D Minor Staccato Macabre Walking Bass)
  private synthesizeMenuBass(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, safeTime);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 0.5, safeTime); // Deep round sub

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1050, safeTime);
    filter.frequency.exponentialRampToValueAtTime(160, safeTime + duration);

    gain.gain.setValueAtTime(0.35, safeTime);
    gain.gain.exponentialRampToValueAtTime(0.01, safeTime + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(safeTime);
    subOsc.start(safeTime);
    osc.stop(safeTime + duration);
    subOsc.stop(safeTime + duration);
  }

  // 0d. PvZ Main Menu Staccato Accordion & Piano/Marimba Chords (Dm, Gm, A7, Bb)
  private synthesizeMenuChords(barIdx: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    let chordFreqs = [N.D3, N.F3, N.A3, N.D4]; // Dm
    if (barIdx % 4 === 1) chordFreqs = [N.G3, N.Bb3, N.D4, N.G4]; // Gm
    else if (barIdx % 4 === 2) chordFreqs = [N.Bb3, N.D4, N.F4, N.Bb4]; // Bb
    else if (barIdx % 4 === 3) chordFreqs = [N.A3, N.Cs4, N.E4, N.G4]; // A7

    chordFreqs.forEach((f) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, safeTime);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(f * 1.002, safeTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, safeTime);
      filter.frequency.exponentialRampToValueAtTime(400, safeTime + duration);

      gain.gain.setValueAtTime(0.08, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.001, safeTime + duration);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(safeTime);
      osc2.start(safeTime);
      osc.stop(safeTime + duration);
      osc2.stop(safeTime + duration);
    });
  }

  // 0e. Iconic PvZ Main Menu Celesta & Music-Box Lead
  private synthesizeMenuLead(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const oscWhistle = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Pure crystal Celeste chime
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, safeTime);

    // Harmonic bell shimmer
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.002, safeTime);

    // Warm wooden flute / accordion body overtone
    oscWhistle.type = 'triangle';
    oscWhistle.frequency.setValueAtTime(freq, safeTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3600, safeTime);
    filter.frequency.exponentialRampToValueAtTime(1100, safeTime + duration);

    // Use 0.0001 initial floor so exponentialRamp never errors on a 0 baseline
    gain.gain.setValueAtTime(0.0001, safeTime);
    gain.gain.linearRampToValueAtTime(0.24, safeTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, safeTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    oscWhistle.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(safeTime);
    osc2.start(safeTime);
    oscWhistle.start(safeTime);
    osc1.stop(safeTime + duration);
    osc2.stop(safeTime + duration);
    oscWhistle.stop(safeTime + duration);
  }

  // 1. Didgeridoo Synthesis (Disabled per user request)
  private synthesizeDidgeridoo(_time: number, _duration: number, _freq: number, _formantFreq: number, _gainWeight: number) {
    return;
  }

  // 2. Night Didgeridoo Synthesis (Disabled per user request)
  private synthesizeNightDidgeridoo(_time: number, _duration: number, _freq: number, _formantFreq: number, _gainWeight: number) {
    return;
  }

  // 3. Aussie Bilma Clapping Sticks & Bush Percussion (Daytime)
  private synthesizePercussion(stepInBar: number, barIdx: number, time: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    if (stepInBar === 4 || stepInBar === 10 || stepInBar === 12 || stepInBar === 14) {
      if (!this.dayStickBuffer || this.dayStickBuffer.sampleRate !== this.ctx.sampleRate) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
        this.dayStickBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = this.dayStickBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = this.dayStickBuffer;

      const stickFilter = this.ctx.createBiquadFilter();
      stickFilter.type = 'bandpass';
      stickFilter.Q.setValueAtTime(8.0, safeTime);
      stickFilter.frequency.setValueAtTime(2800, safeTime);

      const stickGain = this.ctx.createGain();
      stickGain.gain.setValueAtTime(0.24, safeTime);
      stickGain.gain.exponentialRampToValueAtTime(0.001, safeTime + 0.035);

      noise.connect(stickFilter);
      stickFilter.connect(stickGain);
      stickGain.connect(this.masterGain);

      noise.start(safeTime);
    }

    if (stepInBar === 0 || stepInBar === 8) {
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();

      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(140, safeTime);
      kickOsc.frequency.exponentialRampToValueAtTime(45, safeTime + 0.12);

      kickGain.gain.setValueAtTime(0.35, safeTime);
      kickGain.gain.exponentialRampToValueAtTime(0.01, safeTime + 0.12);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);

      kickOsc.start(safeTime);
      kickOsc.stop(safeTime + 0.12);
    }

    if (stepInBar === 4 || stepInBar === 12) {
      const snareOsc = this.ctx.createOscillator();
      const snareGain = this.ctx.createGain();

      snareOsc.type = 'triangle';
      snareOsc.frequency.setValueAtTime(240, safeTime);
      snareOsc.frequency.exponentialRampToValueAtTime(80, safeTime + 0.09);

      snareGain.gain.setValueAtTime(0.22, safeTime);
      snareGain.gain.exponentialRampToValueAtTime(0.01, safeTime + 0.09);

      snareOsc.connect(snareGain);
      snareGain.connect(this.masterGain);

      snareOsc.start(safeTime);
      snareOsc.stop(safeTime + 0.09);
    }
  }

  // 4. Night Bush Percussion (Nocturnal shakers, muted sticks, dark sub-thumps)
  private synthesizeNightPercussion(stepInBar: number, barIdx: number, time: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    // A. Ambient nocturnal sand shaker / cricket texture (16th notes)
    if (stepInBar % 2 === 0) {
      if (!this.nightShakerBuffer || this.nightShakerBuffer.sampleRate !== this.ctx.sampleRate) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.025);
        this.nightShakerBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = this.nightShakerBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = this.nightShakerBuffer;

      const shakerFilter = this.ctx.createBiquadFilter();
      shakerFilter.type = 'highpass';
      shakerFilter.frequency.setValueAtTime(4500, safeTime);

      const shakerGain = this.ctx.createGain();
      const shakerVol = stepInBar === 4 || stepInBar === 12 ? 0.12 : 0.06;
      shakerGain.gain.setValueAtTime(shakerVol, safeTime);
      shakerGain.gain.exponentialRampToValueAtTime(0.001, safeTime + 0.022);

      noise.connect(shakerFilter);
      shakerFilter.connect(shakerGain);
      shakerGain.connect(this.masterGain);

      noise.start(safeTime);
    }

    // B. Muted nocturnal bilma woodblock (Steps 4, 10, 12, 14)
    if (stepInBar === 4 || stepInBar === 10 || stepInBar === 12 || stepInBar === 14) {
      const blockOsc = this.ctx.createOscillator();
      const blockGain = this.ctx.createGain();
      blockOsc.type = 'triangle';
      blockOsc.frequency.setValueAtTime(580, safeTime);
      blockOsc.frequency.exponentialRampToValueAtTime(180, safeTime + 0.04);

      blockGain.gain.setValueAtTime(0.18, safeTime);
      blockGain.gain.exponentialRampToValueAtTime(0.001, safeTime + 0.04);

      blockOsc.connect(blockGain);
      blockGain.connect(this.masterGain);

      blockOsc.start(safeTime);
      blockOsc.stop(safeTime + 0.04);
    }

    // C. Deep Night Sub Kick on Beats 1 and 3 (Steps 0 and 8)
    if (stepInBar === 0 || stepInBar === 8) {
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();

      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(110, safeTime);
      kickOsc.frequency.exponentialRampToValueAtTime(32, safeTime + 0.15);

      kickGain.gain.setValueAtTime(0.38, safeTime);
      kickGain.gain.exponentialRampToValueAtTime(0.01, safeTime + 0.15);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);

      kickOsc.start(safeTime);
      kickOsc.stop(safeTime + 0.15);
    }
  }

  // 5. Daytime PvZ Bouncy Synth Bass
  private synthesizeBass(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, safeTime);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, safeTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, safeTime);
    filter.frequency.exponentialRampToValueAtTime(220, safeTime + duration);

    gain.gain.setValueAtTime(0.3, safeTime);
    gain.gain.exponentialRampToValueAtTime(0.01, safeTime + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(safeTime);
    subOsc.start(safeTime);
    osc.stop(safeTime + duration);
    subOsc.stop(safeTime + duration);
  }

  // 6. Nighttime Stealth Pizzicato Walking Bass (Moongrains style)
  private synthesizeNightBass(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, safeTime);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 0.5, safeTime); // Deep round sub

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, safeTime);
    filter.frequency.exponentialRampToValueAtTime(140, safeTime + duration);

    gain.gain.setValueAtTime(0.32, safeTime);
    gain.gain.exponentialRampToValueAtTime(0.01, safeTime + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(safeTime);
    subOsc.start(safeTime);
    osc.stop(safeTime + duration);
    subOsc.stop(safeTime + duration);
  }

  // 7. Daytime PvZ Marimba / Staccato Chords
  private synthesizeChords(barIdx: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    let chordFreqs = [N.A3, N.C4, N.E4]; // Am
    if (barIdx % 4 === 1) chordFreqs = [N.D3, N.F3, N.A3, N.C4]; // Dm7
    else if (barIdx % 4 === 2) chordFreqs = [N.F3, N.A3, N.C4, N.E4]; // Fmaj7
    else if (barIdx % 4 === 3) chordFreqs = [N.E3, N.Ab3, N.B3, N.D4]; // E7

    chordFreqs.forEach((f) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, safeTime);

      gain.gain.setValueAtTime(0.08, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.001, safeTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(safeTime);
      osc.stop(safeTime + duration);
    });
  }

  // 8. Nighttime Eerie Chords (Em, Am, Cmaj7, B7)
  private synthesizeNightChords(barIdx: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    let chordFreqs = [N.E3, N.G3, N.B3]; // Em
    if (barIdx % 4 === 1) chordFreqs = [N.A3, N.C4, N.E4]; // Am
    else if (barIdx % 4 === 2) chordFreqs = [N.C3, N.E3, N.G3, N.B3]; // Cmaj7
    else if (barIdx % 4 === 3) chordFreqs = [N.B2, N.Eb3, N.Fs3, N.A3]; // B7

    chordFreqs.forEach((f) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, safeTime);

      gain.gain.setValueAtTime(0.07, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.001, safeTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(safeTime);
      osc.stop(safeTime + duration);
    });
  }

  // 9. Daytime PvZ Lead Melody
  private synthesizeLead(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'square';
    osc1.frequency.setValueAtTime(freq, safeTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.004, safeTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, safeTime);
    filter.frequency.exponentialRampToValueAtTime(1400, safeTime + duration);

    gain.gain.setValueAtTime(0.0001, safeTime);
    gain.gain.linearRampToValueAtTime(0.24, safeTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, safeTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(safeTime);
    osc2.start(safeTime);
    osc1.stop(safeTime + duration);
    osc2.stop(safeTime + duration);
  }

  // 10. Nighttime Celeste Music-Box & Glockenspiel Bells (Moongrains Sound)
  private synthesizeNightLead(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, safeTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, safeTime); // Shimmering octave harmonic

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4200, safeTime);
    filter.frequency.exponentialRampToValueAtTime(1600, safeTime + duration);

    // Use 0.0001 initial floor so exponentialRamp never errors on a 0 baseline
    gain.gain.setValueAtTime(0.0001, safeTime);
    gain.gain.linearRampToValueAtTime(0.25, safeTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, safeTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(safeTime);
    osc2.start(safeTime);
    osc1.stop(safeTime + duration);
    osc2.stop(safeTime + duration);
  }

  // 11. Atmospheric Dingo / Coyote / Wolf Suspense Howl (Synthesized inside music scheduler)
  private synthesizeDingoHowl(time: number, variant: 'lone' | 'pack' = 'lone') {
    if (!this.ctx || !this.masterGain) return;
    const safeTime = Math.max(time, this.ctx.currentTime);

    const createSingleHowl = (startTime: number, startPitch: number, peakPitch: number, endPitch: number, duration: number, maxGain: number) => {
      if (!this.ctx || !this.masterGain) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      subOsc.type = 'sawtooth';

      osc1.frequency.setValueAtTime(startPitch, startTime);
      osc1.frequency.exponentialRampToValueAtTime(peakPitch, startTime + duration * 0.35);
      osc1.frequency.linearRampToValueAtTime(peakPitch * 1.02, startTime + duration * 0.6);
      osc1.frequency.exponentialRampToValueAtTime(endPitch, startTime + duration);

      osc2.frequency.setValueAtTime(startPitch * 1.008, startTime);
      osc2.frequency.exponentialRampToValueAtTime(peakPitch * 1.008, startTime + duration * 0.35);
      osc2.frequency.linearRampToValueAtTime(peakPitch * 1.03, startTime + duration * 0.6);
      osc2.frequency.exponentialRampToValueAtTime(endPitch * 1.008, startTime + duration);

      subOsc.frequency.setValueAtTime(startPitch * 0.5, startTime);
      subOsc.frequency.exponentialRampToValueAtTime(peakPitch * 0.5, startTime + duration * 0.35);
      subOsc.frequency.exponentialRampToValueAtTime(endPitch * 0.5, startTime + duration);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(5.6, startTime);
      lfoGain.gain.setValueAtTime(0, startTime);
      lfoGain.gain.linearRampToValueAtTime(14, startTime + duration * 0.25);
      lfoGain.gain.linearRampToValueAtTime(8, startTime + duration * 0.7);
      lfoGain.gain.linearRampToValueAtTime(0, startTime + duration);

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4.5, startTime);
      filter.frequency.setValueAtTime(650, startTime);
      filter.frequency.exponentialRampToValueAtTime(1150, startTime + duration * 0.35);
      filter.frequency.exponentialRampToValueAtTime(520, startTime + duration);

      const subFilter = this.ctx.createBiquadFilter();
      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(400, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(maxGain, startTime + duration * 0.25);
      gain.gain.linearRampToValueAtTime(maxGain * 0.85, startTime + duration * 0.65);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(subFilter);
      filter.connect(gain);
      subFilter.connect(gain);
      gain.connect(this.masterGain);

      lfo.start(startTime);
      osc1.start(startTime);
      osc2.start(startTime);
      subOsc.start(startTime);

      lfo.stop(startTime + duration);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
      subOsc.stop(startTime + duration);
    };

    if (variant === 'lone') {
      createSingleHowl(safeTime, 260, 587.33, 311.13, 2.2, 0.28);
    } else {
      createSingleHowl(safeTime, 246.94, 523.25, 293.66, 2.4, 0.22);
      createSingleHowl(safeTime + 0.35, 293.66, 659.25, 349.23, 2.5, 0.20);
    }
  }
}

export const outbackMusic = new OutbackMusicEngine();

// Global resilience listeners to restore AudioContext and scheduler on user interactions or tab visibility changes
if (typeof window !== 'undefined') {
  const resumeAudio = () => {
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    outbackMusic.resumeContextIfNeeded();
  };

  window.addEventListener('click', resumeAudio, { passive: true });
  window.addEventListener('touchstart', resumeAudio, { passive: true });
  window.addEventListener('keydown', resumeAudio, { passive: true });
  window.addEventListener('focus', () => {
    resumeAudio();
  });

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        resumeAudio();
      }
    });
  }
}


