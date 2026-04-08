import { r as reactExports, j as jsxRuntimeExports, s as saveSession } from "./index-CnBlQnJS.js";
import { E as useSignin } from "./useQueries--SjqMtRM.js";
import { S as SAFFRON } from "./createLucideIcon-DNEqdOjx.js";
import { P as Phone, L as Lock, E as EyeOff, a as Eye } from "./phone-vxl8PFW1.js";
function SignIn({
  onNavigateToSignup,
  onNavigateToAdmin,
  onSuccess
}) {
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const signin = useSignin();
  const isBackendReady = signin.isBackendReady;
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!phone.trim() || !password.trim()) {
      setError("Please enter your phone number and password.");
      return;
    }
    try {
      const result = await signin.mutateAsync({
        phone: phone.trim(),
        password
      });
      if (result.__kind__ === "ok") {
        const user = result.ok;
        if (user.isBanned) {
          setError("Your account has been suspended. Contact support.");
          return;
        }
        const role = user.role;
        saveSession({
          userId: user.id,
          role,
          phone: user.phone,
          name: user.name,
          token: `${user.id}_${Date.now()}`
        });
        onSuccess(role);
      } else {
        setError(result.err ?? "Invalid phone number or password.");
      }
    } catch {
      setError("Sign in failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-center p-5",
      style: {
        background: `linear-gradient(160deg, ${SAFFRON}12 0%, transparent 60%)`,
        backgroundColor: "#fafaf9"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg",
              style: { backgroundColor: SAFFRON },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-3xl font-display", children: "P" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h1",
            {
              className: "text-3xl font-bold font-display",
              style: { color: "#1A1A2E" },
              children: [
                "Pondy",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: SAFFRON }, children: "One" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 text-muted-foreground", children: "Puducherry's Own Marketplace" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-lg border border-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-5", children: "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "signin-phone",
                  className: "text-sm font-medium text-foreground",
                  children: "Phone Number"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "signin-phone",
                    type: "tel",
                    inputMode: "numeric",
                    autoComplete: "tel",
                    placeholder: "10-digit mobile number",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    "data-ocid": "signin-phone",
                    className: "w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors",
                    style: { "--tw-ring-color": SAFFRON },
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "signin-password",
                  className: "text-sm font-medium text-foreground",
                  children: "Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "signin-password",
                    type: showPwd ? "text" : "password",
                    autoComplete: "current-password",
                    placeholder: "Enter your password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    "data-ocid": "signin-password",
                    className: "w-full h-12 pl-10 pr-11 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPwd((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": showPwd ? "Hide password" : "Show password",
                    children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3", children: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                "data-ocid": "signin-submit",
                disabled: signin.isPending || !isBackendReady,
                className: "w-full h-12 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-1",
                style: { backgroundColor: SAFFRON },
                children: !isBackendReady ? "Connecting…" : signin.isPending ? "Signing in…" : "Sign In"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onNavigateToSignup,
                "data-ocid": "goto-signup",
                className: "font-semibold transition-colors hover:opacity-80",
                style: { color: SAFFRON },
                children: "Sign Up"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onNavigateToAdmin,
            "data-ocid": "goto-admin-login",
            className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
            children: "Admin Login →"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "Serving Puducherry & Chennai 📍" })
      ] })
    }
  );
}
export {
  SignIn as default
};
