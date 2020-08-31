import films from "./films";
import tickets from "./tickets";
import cinemas from "./cinemas";
export default {
  ...films,
  ...tickets,
  ...cinemas
};
