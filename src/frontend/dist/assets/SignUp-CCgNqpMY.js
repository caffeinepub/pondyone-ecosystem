import { r as reactExports, j as jsxRuntimeExports, s as saveSession } from "./index-DcI09W8W.js";
import { I as useSignup } from "./useQueries-CSZps6Zw.js";
import { c as createLucideIcon, D as DEFAULT_LOCATION, S as SAFFRON } from "./createLucideIcon-BoNvu6Kr.js";
import { P as Phone, L as Lock, E as EyeOff, a as Eye } from "./phone-DlF7MnP3.js";
import { U as UserRole } from "./backend.d-DzWmo78T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function SignUp({ onNavigateToSignin, onSuccess }) {
  const [selectedRole, setSelectedRole] = reactExports.useState("user");
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState(DEFAULT_LOCATION.text);
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const signup = useSignup();
  const isBackendReady = signup.isBackendReady;
  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!/^\d{10}$/.test(phone.trim()))
      e.phone = "Enter a valid 10-digit phone number.";
    if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const result = await signup.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        password,
        role: selectedRole === "owner" ? UserRole.owner : UserRole.user,
        gpsLat: DEFAULT_LOCATION.lat,
        gpsLng: DEFAULT_LOCATION.lng,
        locationText: location.trim() || DEFAULT_LOCATION.text
      });
      if (result.__kind__ === "ok") {
        const user = result.ok;
        saveSession({
          userId: user.id,
          role: selectedRole,
          phone: user.phone,
          name: user.name,
          token: `${user.id}_${Date.now()}`
        });
        onSuccess(selectedRole);
      } else {
        setErrors({
          form: result.err ?? "Sign up failed. Try a different phone number."
        });
      }
    } catch {
      setErrors({ form: "Sign up failed. Please try again." });
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-3 shadow-lg",
              style: { backgroundColor: SAFFRON },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-2xl font-display", children: "P" })
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 text-muted-foreground", children: "Create your account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-lg border border-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5", children: "I am a…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "role-toggle-customer",
                  onClick: () => setSelectedRole("user"),
                  className: "flex-1 h-11 rounded-xl text-sm font-semibold transition-all",
                  style: {
                    backgroundColor: selectedRole === "user" ? SAFFRON : "#f1f1f1",
                    color: selectedRole === "user" ? "#ffffff" : "#374151"
                  },
                  children: "🛍️ Customer"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "role-toggle-owner",
                  onClick: () => setSelectedRole("owner"),
                  className: "flex-1 h-11 rounded-xl text-sm font-semibold transition-all",
                  style: {
                    backgroundColor: selectedRole === "owner" ? SAFFRON : "#f1f1f1",
                    color: selectedRole === "owner" ? "#ffffff" : "#374151"
                  },
                  children: "🏪 Business Owner"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "su-name",
                  className: "text-sm font-medium text-foreground",
                  children: "Full Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "su-name",
                    type: "text",
                    autoComplete: "name",
                    placeholder: "Your full name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    "data-ocid": "signup-name",
                    className: "w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                  }
                )
              ] }),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "su-phone",
                  className: "text-sm font-medium text-foreground",
                  children: "Phone Number"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "su-phone",
                    type: "tel",
                    inputMode: "numeric",
                    autoComplete: "tel",
                    placeholder: "10-digit mobile number",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    "data-ocid": "signup-phone",
                    className: "w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                  }
                )
              ] }),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: errors.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "su-password",
                  className: "text-sm font-medium text-foreground",
                  children: "Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "su-password",
                    type: showPwd ? "text" : "password",
                    autoComplete: "new-password",
                    placeholder: "Minimum 6 characters",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    "data-ocid": "signup-password",
                    className: "w-full h-12 pl-10 pr-11 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
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
              ] }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: errors.password })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "su-location",
                  className: "text-sm font-medium text-foreground",
                  children: [
                    "City / Area",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "su-location",
                    type: "text",
                    placeholder: "e.g. White Town, Puducherry",
                    value: location,
                    onChange: (e) => setLocation(e.target.value),
                    "data-ocid": "signup-location",
                    className: "w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-colors"
                  }
                )
              ] })
            ] }),
            errors.form && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3", children: errors.form }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                "data-ocid": "signup-submit",
                disabled: signup.isPending || !isBackendReady,
                className: "w-full h-12 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 mt-1",
                style: { backgroundColor: SAFFRON },
                children: !isBackendReady ? "Connecting…" : signup.isPending ? "Creating account…" : selectedRole === "owner" ? "Register as Business Owner" : "Create Account"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onNavigateToSignin,
                "data-ocid": "goto-signin",
                className: "font-semibold transition-colors hover:opacity-80",
                style: { color: SAFFRON },
                children: "Sign In"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "Serving Puducherry & Chennai 📍" })
      ] })
    }
  );
}
export {
  SignUp as default
};
