import { paths } from "./../../../utils/paths";
import { HomePage } from "./../../support/objectPages/homePage";
import { DropDownLanguage } from "./../../support/objectComponents/dropDownLanguage";

const homePage = new HomePage();
const dropDownLanguage = new DropDownLanguage();

export function checkLanguageHomePage() {
  cy.intercept("GET", "http://localhost:3001/api/dictionary/collection").as(
    "collectionDictionary"
  );
  cy.wait("@collectionDictionary");
  cy.wait(500);

  const linkMainPage = "sidebar.siderbarMenu.home";
  const linlProject = "sidebar.siderbarMenu.projects";
  const linkLogin = "sidebar.siderbarMenu.login";
  const dropDownTitle = "sidebar.language.title";
  cy.visit(
    `${paths.testPanel}?action=loadLangs&data={"lang":["${linkMainPage}", "${linlProject}", "${linkLogin}", "${dropDownTitle}"]}`
  );
  cy.wait(500);

  cy.window().then((win) => {
    const lang = win.localStorage.getItem("lang");
    cy.log(lang!);
    const parse = JSON.parse(lang!);
    const links = [
      { active: true, text: parse[0] },
      { active: false, text: parse[1] },
      { active: false, text: parse[2] },
    ];
    homePage.checkMenu(links);
    dropDownLanguage.checkDropDown(parse[3]);
  });
}
