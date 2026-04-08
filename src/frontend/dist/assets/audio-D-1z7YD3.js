import { j as jsxRuntimeExports } from "./index-DcI09W8W.js";
function BottomNav({ items, currentPath, onNavigate }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      className: "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border",
      style: { height: 64, paddingBottom: "env(safe-area-inset-bottom)" },
      "aria-label": "Bottom navigation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around h-full max-w-lg mx-auto", children: items.map((item) => {
        const isActive = currentPath === item.path || currentPath.startsWith(`${item.path}/`);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onNavigate(item.path),
            "data-ocid": `bottom-nav-${item.label.toLowerCase()}`,
            className: "relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "aria-label": item.label,
            "aria-current": isActive ? "page" : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: item.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-medium leading-none",
                  style: { color: isActive ? "#FF6B35" : "#6b7280" },
                  children: item.label
                }
              ),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute bottom-1 w-1 h-1 rounded-full",
                  style: { backgroundColor: "#FF6B35" }
                }
              )
            ]
          },
          item.path
        );
      }) })
    }
  );
}
let audioContext = null;
let alarmOscillators = [];
let alarmGain = null;
let alarmActive = false;
function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}
function playPing() {
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
      ctx.currentTime + 0.2
    );
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.2);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("playPing failed:", e);
  }
}
function createAlarmLayer(ctx, gainNode, freq) {
  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.connect(gainNode);
  osc.start();
  return osc;
}
function playAlarm() {
  if (alarmActive) return stopAlarm;
  try {
    const ctx = getAudioContext();
    alarmGain = ctx.createGain();
    alarmGain.gain.setValueAtTime(0.25, ctx.currentTime);
    alarmGain.connect(ctx.destination);
    alarmOscillators = [
      createAlarmLayer(ctx, alarmGain, 440),
      createAlarmLayer(ctx, alarmGain, 600)
    ];
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
    alarmGain._pulseInterval = pulseInterval;
  } catch (e) {
    console.warn("playAlarm failed:", e);
  }
  return stopAlarm;
}
function stopAlarm() {
  alarmActive = false;
  try {
    if (alarmGain) {
      const g = alarmGain;
      if (g._pulseInterval) clearInterval(g._pulseInterval);
    }
    for (const osc of alarmOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
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
export {
  BottomNav as B,
  playAlarm as a,
  playPing as p,
  stopAlarm as s
};
