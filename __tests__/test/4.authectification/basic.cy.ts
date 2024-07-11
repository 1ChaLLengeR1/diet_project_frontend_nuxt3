import { paths } from "./../../../utils/paths";
import { loginAuth0Simple } from "./../../support/helper/auth/signIn";
import { SideBarMenu } from "./../../support/objectComponents/sideBar";

const sideBarMenu = new SideBarMenu();
const time: number = 2000;

describe("Authorization", () => {
  it("HP, login -> I see profilePage", () => {
    const adminPanel = "sidebar.siderbarMenu.adminPanel";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${adminPanel}"]}`
    );
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      sideBarMenu.checkLink(parse[0]);
    });
  });

  it("HP, login -> I see button logout", () => {
    const logout = "sidebar.siderbarMenu.logout";
    loginAuth0Simple();

    cy.visit(`${paths.testPanel}?action=loadLangs&data={"lang":["${logout}"]}`);
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      sideBarMenu.checkLink(parse[0]);
    });
  });

  it("HP, login -> I see button logout, click logout -> I see homePage", () => {
    const linkMainPage = "sidebar.siderbarMenu.home";
    const linlProject = "sidebar.siderbarMenu.projects";
    const linkLogin = "sidebar.siderbarMenu.login";
    const logout = "sidebar.siderbarMenu.logout";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${linkMainPage}", "${linlProject}", "${linkLogin}", "${logout}"]}`
    );
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);

      sideBarMenu.clickLink(parse[3]);

      const links = [
        { active: true, text: parse[0] },
        { active: false, text: parse[1] },
        { active: false, text: parse[2] },
      ];
      sideBarMenu.checkMenu(links);
    });
  });
});
