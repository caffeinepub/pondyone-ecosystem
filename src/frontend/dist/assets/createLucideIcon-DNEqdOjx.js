import { r as reactExports } from "./index-CnBlQnJS.js";
const CATEGORY_COLORS = {
  food: "#FF8C42",
  stay: "#4A90E2",
  play: "#7ED321",
  retail: "#9B59B6"
};
const CATEGORY_EMOJIS = {
  food: "🍔",
  stay: "🏨",
  play: "⚽",
  retail: "🛒"
};
const CATEGORY_LABELS = {
  food: "Food",
  stay: "Stay",
  play: "Play",
  retail: "Retail"
};
const DEFAULT_LOCATION = {
  lat: 11.9416,
  lng: 79.8083,
  text: "Puducherry"
};
const ADMIN_PHONE = "6381110664";
const SAFFRON = "#FF6B35";
const INTENT_KEYWORDS = {
  // Food
  biryani: "food",
  food: "food",
  restaurant: "food",
  eat: "food",
  lunch: "food",
  dinner: "food",
  breakfast: "food",
  snack: "food",
  thali: "food",
  dosa: "food",
  idli: "food",
  pizza: "food",
  burger: "food",
  // Play
  cricket: "play",
  turf: "play",
  football: "play",
  badminton: "play",
  sport: "play",
  play: "play",
  game: "play",
  ground: "play",
  court: "play",
  // Stay
  room: "stay",
  hotel: "stay",
  stay: "stay",
  lodge: "stay",
  accommodation: "stay",
  hostel: "stay",
  pg: "stay",
  resort: "stay",
  // Retail
  grocery: "retail",
  medicine: "retail",
  toy: "retail",
  shop: "retail",
  store: "retail",
  buy: "retail",
  purchase: "retail",
  meds: "retail",
  pharmacy: "retail",
  supermarket: "retail"
};
function detectIntent(query) {
  const lower = query.toLowerCase();
  for (const [keyword, category] of Object.entries(INTENT_KEYWORDS)) {
    if (lower.includes(keyword)) return category;
  }
  return null;
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
export {
  ADMIN_PHONE as A,
  CATEGORY_COLORS as C,
  DEFAULT_LOCATION as D,
  SAFFRON as S,
  CATEGORY_EMOJIS as a,
  CATEGORY_LABELS as b,
  createLucideIcon as c,
  detectIntent as d
};
