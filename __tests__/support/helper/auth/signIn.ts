import { paths } from "./../../../../utils/paths";
import { Auth0 } from "./../../external/auth0";
import { SideBarMenu } from "../../objectComponents/sideBar";
import { auth0Email, auth0Password } from "../../e2e";

export function loginAuth0Simple() {
  const auth0 = new Auth0();
  const siderBarMenu = new SideBarMenu();
  const sidebarItem = "sidebar.siderbarMenu.login";

  cy.visit(
    `${paths.testPanel}?action=loadLangs&data={"lang":["${sidebarItem}"]}`
  );
  cy.wait(1000);

  cy.visit(paths.logOut);

  cy.window().then((win) => {
    const lang = win.localStorage.getItem("lang");
    const parse = JSON.parse(lang!);
    siderBarMenu.clickLink(parse[0]);
    auth0.signIn(auth0Email, auth0Password);
    cy.wait(2000);
  });
}
