import { paths } from "../../../../utils/paths";
import { loginAuth0Simple } from "../../../support/helper/auth/signIn";
import { ProfileTabsForms } from "../../../support/objectComponents/profileTabsForms";

const profileTabsForms = new ProfileTabsForms();

describe("Profile Page Panel Post", () => {
  it("Login, go to page post create -> I see form", () => {
    loginAuth0Simple();
    cy.visit(paths.profilePanelPostCreate);
    profileTabsForms.checkFormPost();
  });
});
