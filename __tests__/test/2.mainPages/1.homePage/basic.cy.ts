import { paths } from "./../../../../utils/paths";
import { Spinner } from "./../../../support/objectComponents/spinner";
import { SideBarMenu } from "../../../support/objectComponents/sideBar";
import { DropDownLanguage } from "./../../../support/objectComponents/dropDownLanguage";
import { checkLanguageHomePage } from "./../../../helpers/homePage/dropDown";
import { link } from "./../../../support/e2e";

const spinner = new Spinner();
const sideBarMenu = new SideBarMenu();
const dropDownLanguage = new DropDownLanguage();
const time: number = 2000;

describe("Home Page Basic", () => {
  it("HP, check loadingSpinner info", () => {
    const spinnerLangInformation = "loadingSpinner.information";
    const spinnerLangInformationMore = "loadingSpinner.informationMore";
    const spinnerLangInformationStoreDictionary =
      "loadingSpinner.stores.dictionary";

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${spinnerLangInformation}", "${spinnerLangInformationMore}", "${spinnerLangInformationStoreDictionary}"]}`
    );
    cy.wait(time);

    cy.visit(paths.home);
    cy.reload();

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      spinner.checkInfo(parse[0], "info");
      spinner.checkInfo(parse[1], "info");
      spinner.checkInfo(parse[2], "infoStores");
    });
  });

  it("HP, check SiderMenu", () => {
    const linkMainPage = "sidebar.siderbarMenu.home";
    const linlProject = "sidebar.siderbarMenu.projects";
    const linkLogin = "sidebar.siderbarMenu.login";

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${linkMainPage}", "${linlProject}", "${linkLogin}"]}`
    );
    cy.wait(time);
    cy.visit(paths.home);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      const links = [
        { active: true, text: parse[0] },
        { active: false, text: parse[1] },
        { active: false, text: parse[2] },
      ];

      sideBarMenu.checkMenu(links);
    });
  });

  it("HP, check dropDown Dictionary", () => {
    const dropDownTitle = "sidebar.language.title";
    const polishDefaultLang = "language.default.pl";
    const englishDefaultLang = "language.default.en";
    const germanDefaultLang = "language.default.ger";

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${dropDownTitle}", "${polishDefaultLang}", "${englishDefaultLang}", "${germanDefaultLang}"]}`
    );
    cy.wait(time);
    cy.visit(paths.home);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      dropDownLanguage.checkDropDown(parse[0]);
      dropDownLanguage.checkDropDownLanguage([parse[1], parse[2], parse[3]]);
    });
  });

  it("HP, change language page to EN => I see dropDown, mainPage and SiderMenu in EN", () => {
    const language = "Angielski - en";
    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${language}"]}`
    );
    cy.wait(time);

    cy.visit(paths.home);

    cy.intercept("GET", `${link}/api/dictionary/collection`).as(
      "collectionDictionary"
    );
    cy.wait("@collectionDictionary");
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      dropDownLanguage.changeLanguage(parse[0]);
      win.localStorage.removeItem("lang");
    });

    checkLanguageHomePage();
  });

  it("HP, change language page to GER => I see dropDown, mainPage and SiderMenu in GER", () => {
    const language = "Niemiecki - ger";
    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${language}"]}`
    );
    cy.wait(time);

    cy.visit(paths.home);

    cy.intercept("GET", `${link}/api/dictionary/collection`).as(
      "collectionDictionary"
    );
    cy.wait("@collectionDictionary");
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      dropDownLanguage.changeLanguage(parse[0]);
      win.localStorage.removeItem("lang");
    });

    checkLanguageHomePage();
  });
});
