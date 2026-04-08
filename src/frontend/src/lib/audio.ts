let audioContext: AudioContext | null = null;
let alarmOscillators: OscillatorNode[] = [];
let alarmGain: GainNode | null = null;
let alarmActive = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

export function playPing(): void {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      600,
      ctx.currentTime + 0.2,
    );

    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("playPing failed:", e);
  }
}

function createAlarmLayer(
  ctx: AudioContext,
  gainNode: GainNode,
  freq: number,
): OscillatorNode {
  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.connect(gainNode);
  osc.start();
  return osc;
}

export function playAlarm(): () => void {
  if (alarmActive) return stopAlarm;
  try {
    const ctx = getAudioContext();
    alarmGain = ctx.createGain();
    alarmGain.gain.setValueAtTime(0.25, ctx.currentTime);
    alarmGain.connect(ctx.destination);

    alarmOscillators = [
      createAlarmLayer(ctx, alarmGain, 440),
      createAlarmLayer(ctx, alarmGain, 600),
    ];

    // Pulse the gain for urgency
    const pulseInterval = setInterval(() => {
      if (!alarmActive || !alarmGain) {
        clearInterval(pulseInterval);
        return;
      }
      const now = alarmGain.context.currentTime;
      alarmGain.gain.setValueAtTime(0.3, now);
      alarmGain.gain.setValueAtTime(0.05, now + 0.15);
      alarmGain.gain.setValueAtTime(0.3, now + 0.3);
    }, 600);

    alarmActive = true;

    // Store interval ref for cleanup
    (
      alarmGain as GainNode & {
        _pulseInterval?: ReturnType<typeof setInterval>;
      }
    )._pulseInterval = pulseInterval;
  } catch (e) {
    console.warn("playAlarm failed:", e);
  }
  return stopAlarm;
}

export function stopAlarm(): void {
  alarmActive = false;
  try {
    if (alarmGain) {
      const g = alarmGain as GainNode & {
        _pulseInterval?: ReturnType<typeof setInterval>;
      };
      if (g._pulseInterval) clearInterval(g._pulseInterval);
    }
    for (const osc of alarmOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        /* already stopped */
      }
    }
    alarmOscillators = [];
    if (alarmGain) {
      alarmGain.disconnect();
      alarmGain = null;
    }
  } catch (e) {
    console.warn("stopAlarm failed:", e);
  }
}
