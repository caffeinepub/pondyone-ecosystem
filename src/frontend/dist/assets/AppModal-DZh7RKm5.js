import { r as reactExports, j as jsxRuntimeExports } from "./index-DcI09W8W.js";
import { c as cn } from "./AppCard-T1oYP_Vp.js";
import { X } from "./x-DiEn2gaL.js";
function AppModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  persistent = false
}) {
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape" && !persistent) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, persistent]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: isOpen,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent",
      "aria-label": title,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: persistent ? void 0 : onClose,
            onKeyDown: persistent ? void 0 : (e) => {
              if (e.key === "Enter") onClose();
            },
            role: persistent ? void 0 : "button",
            tabIndex: persistent ? void 0 : -1,
            "aria-label": "Close"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative z-10 bg-card rounded-2xl shadow-alarm w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up",
              className
            ),
            children: [
              (title || !persistent) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border", children: [
                title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground font-display", children: title }),
                !persistent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors",
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children })
            ]
          }
        )
      ]
    }
  );
}
export {
  AppModal as A
};
