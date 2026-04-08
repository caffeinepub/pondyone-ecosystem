import { r as reactExports, j as jsxRuntimeExports, s as saveSession } from "./index-CnBlQnJS.js";
import { E as useSignin } from "./useQueries--SjqMtRM.js";
import { A as ADMIN_PHONE } from "./createLucideIcon-DNEqdOjx.js";
import { P as Phone, L as Lock, E as EyeOff, a as Eye } from "./phone-vxl8PFW1.js";
function AdminLogin({ onLogin }) {
  const [phone, setPhone] = reactExports.useState(ADMIN_PHONE);
  const [password, setPassword] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const signin = useSignin();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await signin.mutateAsync({ phone, password });
      if (result.__kind__ === "ok") {
        const user = result.ok;
        if (user.role !== "admin") {
          setError("Access denied. This panel is for admins only.");
          return;
        }
        saveSession({
          userId: user.id,
          role: "admin",
          phone: user.phone,
          name: user.name,
          token: `admin_${Date.now()}`
        });
        onLogin();
      } else {
        setError(result.err ?? "Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4",
      style: { backgroundColor: "#0f0f1e" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg",
              style: { backgroundColor: "#FF6B35" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-3xl font-display", children: "P" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-white", children: [
            "Pondy",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#FF6B35" }, children: "One" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "#94a3b8" }, children: "Founder Admin Panel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 shadow-xl border",
            style: { backgroundColor: "#1A1A2E", borderColor: "#2d2d4a" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white mb-5", children: "Sign in to continue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "admin-phone",
                      className: "block text-xs font-medium mb-1.5",
                      style: { color: "#94a3b8" },
                      children: "Phone Number"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Phone,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: "#64748b" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "admin-phone",
                        type: "tel",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        placeholder: "Enter phone number",
                        "data-ocid": "admin-login-phone",
                        className: "w-full h-11 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 border",
                        style: {
                          backgroundColor: "#0f0f1e",
                          borderColor: "#2d2d4a",
                          color: "#ffffff",
                          // @ts-ignore
                          "--tw-ring-color": "#FF6B35"
                        },
                        required: true
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "admin-password",
                      className: "block text-xs font-medium mb-1.5",
                      style: { color: "#94a3b8" },
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: "#64748b" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "admin-password",
                        type: showPwd ? "text" : "password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: "Enter password",
                        "data-ocid": "admin-login-password",
                        className: "w-full h-11 pl-10 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 border",
                        style: {
                          backgroundColor: "#0f0f1e",
                          borderColor: "#2d2d4a",
                          color: "#ffffff"
                        },
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowPwd((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 p-0.5",
                        "aria-label": "Toggle password visibility",
                        style: { color: "#64748b" },
                        children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }),
                error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-xl px-4 py-3 text-sm",
                    style: {
                      backgroundColor: "rgba(239,68,68,0.15)",
                      color: "#ef4444"
                    },
                    children: error
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    "data-ocid": "admin-login-submit",
                    disabled: signin.isPending,
                    className: "w-full h-11 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-1",
                    style: { backgroundColor: "#FF6B35" },
                    children: signin.isPending ? "Signing in…" : "Sign In"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs mt-6", style: { color: "#475569" }, children: "PondyOne Founder Control Panel · Puducherry & Chennai" })
      ] })
    }
  );
}
export {
  AdminLogin as default
};
