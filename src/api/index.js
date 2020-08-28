import films from "./films";
import tickets from "./tickets";
import home from "./home";
export default {
  ...films,
  ...tickets,
  ...home
};
