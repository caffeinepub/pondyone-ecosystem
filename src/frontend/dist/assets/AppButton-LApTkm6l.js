import { j as jsxRuntimeExports } from "./index-CnBlQnJS.js";
import { c as cn } from "./AppCard-CqGSFxNm.js";
const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
  ghost: "hover:bg-muted text-foreground",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted"
};
const sizeClasses = {
  sm: "h-8 px-3 text-sm rounded-lg",
  md: "h-10 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl font-semibold"
};
function AppButton({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className,
  disabled,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      ...props,
      disabled,
      className: cn(
        "inline-flex items-center justify-center font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      ),
      children
    }
  );
}
export {
  AppButton as A
};
