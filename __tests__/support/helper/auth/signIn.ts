import { paths } from "./../../../../utils/paths";
import { Auth0 } from "./../../external/auth0";
import { SideBarMenu } from "../../objectComponents/sideBar";
import { auth0Email, auth0Password } from "../../e2e";

export function loginAuth0Simple() {
  const auth0 = new Auth0();
  const siderBarMenu = new SideBarMenu();

  cy.visit(paths.logOut);
  siderBarMenu.clickLink("Logowanie");

  cy.log(auth0Email);
  auth0.signIn(auth0Email, auth0Password);
}
