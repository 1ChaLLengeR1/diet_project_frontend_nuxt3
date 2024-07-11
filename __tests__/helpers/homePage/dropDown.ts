import { paths } from "./../../../utils/paths";
import { SideBarMenu } from "./../../support/objectComponents/sideBar";
import { DropDownLanguage } from "./../../support/objectComponents/dropDownLanguage";
import { link } from "./../../support/e2e";

const sideBarMenu = new SideBarMenu();
const dropDownLanguage = new DropDownLanguage();
const time: number = 2000;

export function checkLanguageHomePage() {
  cy.intercept("GET", `${link}/api/dictionary/collection`).as(
    "collectionDictionary"
  );
  cy.wait("@collectionDictionary");
  cy.wait(time);

  const linkMainPage = "sidebar.siderbarMenu.home";
  const linlProject = "sidebar.siderbarMenu.projects";
  const linkLogin = "sidebar.siderbarMenu.login";
  const dropDownTitle = "sidebar.language.title";
  cy.visit(
    `${paths.testPanel}?action=loadLangs&data={"lang":["${linkMainPage}", "${linlProject}", "${linkLogin}", "${dropDownTitle}"]}`
  );
  cy.wait(time);

  cy.window().then((win) => {
    const lang = win.localStorage.getItem("lang");
    cy.log(lang!);
    const parse = JSON.parse(lang!);
    const links = [
      { active: true, text: parse[0] },
      { active: false, text: parse[1] },
      { active: false, text: parse[2] },
    ];
    sideBarMenu.checkMenu(links);
    dropDownLanguage.checkDropDown(parse[3]);
  });
}
