import { paths } from "../../../../utils/paths";
import { loginAuth0Simple } from "../../../support/helper/auth/signIn";
import { ProfileTabsForms } from "../../../support/objectComponents/profileTabsForms";

const profileTabsForms = new ProfileTabsForms();

describe("Profile Page Panel User Basic", () => {
  it("Login, checkForm", () => {
    loginAuth0Simple();
    cy.visit(paths.profilePanelUser);
    profileTabsForms.checkFormUser();
  });
});
