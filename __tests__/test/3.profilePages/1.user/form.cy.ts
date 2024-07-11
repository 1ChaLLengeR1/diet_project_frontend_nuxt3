import { paths } from "../../../../utils/paths";
import { loginAuth0Simple } from "../../../support/helper/auth/signIn";
import { ProfileTabsForms } from "../../../support/objectComponents/profileTabsForms";
import { Alert } from "./../../../support/objectComponents/alert";

const profileTabsForms = new ProfileTabsForms();
const alert = new Alert();
const time: number = 2000;

describe("Profile Page Panel User Form", () => {
  it("Login, completing user data -> I see alert", () => {
    const alertLang = "alert.message.positive.user.change";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLang}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelUser);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      profileTabsForms.changeFormUser(
        "Artur",
        "Artur2",
        "artekartek2",
        "test@gmail.com"
      );
      alert.checkAlert("positive", parse[0], 0);
    });
  });

  it("login, checkForm data", () => {
    loginAuth0Simple();
    cy.visit(paths.profilePanelUser);
    profileTabsForms.checkParamsFormUser(
      "Artur",
      "Artur2",
      "artekartek2",
      "test@gmail.com"
    );
  });
});
