import en from "./lang/en.json";
import pl from "./lang/pl.json";
import ger from "./lang/ger.json";

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: "pl",
  messages: {
    en,
    pl,
    ger,
  },
}));
