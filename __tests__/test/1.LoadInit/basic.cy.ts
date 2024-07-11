import { loginAuth0Simple } from "./../../support/helper/auth/signIn";
import { ProfileTabsForms } from "./../../support/objectComponents/profileTabsForms";
import { nameProject, descriptionProject } from "./../../support/e2e";
import { paths } from "./../../../utils/paths";
import { Alert } from "./../../support/objectComponents/alert";

const profileTabsForms = new ProfileTabsForms();
const alert = new Alert();
const time: number = 2000;

describe("LoadInit basic", () => {
  it("Create test projet for post", () => {
    const title = nameProject;
    const description = descriptionProject;

    loginAuth0Simple();

    cy.visit(paths.profilePanelProjectCreate);
    profileTabsForms.createProject(title, description);
  });

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
});
