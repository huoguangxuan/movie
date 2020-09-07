import films from "./films";
import tickets from "./tickets";
import user from "./user";
export default {
  films,
  tickets,
  ...tickets,
  ...user
};
