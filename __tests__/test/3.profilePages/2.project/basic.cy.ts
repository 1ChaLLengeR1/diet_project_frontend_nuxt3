import { paths } from "../../../../utils/paths";
import { loginAuth0Simple } from "../../../support/helper/auth/signIn";
import { ProfileTabsForms } from "../../../support/objectComponents/profileTabsForms";

const profileTabsForms = new ProfileTabsForms();

describe("Profile Page Panel Project Basic", () => {
  it("Login, go to page project create -> I see form", () => {
    loginAuth0Simple();
    cy.visit(paths.profilePanelProjectCreate);
    profileTabsForms.checkFormProject();
  });
});
