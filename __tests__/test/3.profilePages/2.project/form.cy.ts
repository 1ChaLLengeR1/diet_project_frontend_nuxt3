import { paths } from "../../../../utils/paths";
import { loginAuth0Simple } from "../../../support/helper/auth/signIn";
import { ProfileTabsForms } from "../../../support/objectComponents/profileTabsForms";
import { Alert } from "../../../support/objectComponents/alert";
import { ProfilePanelProject } from "../../../support/objectPages/profilePanelProject";
import { ProjectPage } from "../../../support/objectPages/projectPage";

const profileTabsForms = new ProfileTabsForms();
const alert = new Alert();
const profilePanelProject = new ProfilePanelProject();
const projectPage = new ProjectPage();
const time: number = 2000;

describe("Profile Page Panel Project Form", () => {
  it("Login, create project -> I see alert", () => {
    const alertLnag = "alert.message.positive.project.addProject";
    const alertImageLang = "alert.message.positive.file.createFile";
    const title = `title_${Math.random().toFixed(4)}`;
    const description = `description_${Math.random().toFixed(4)}`;

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}", "${alertImageLang}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelProjectCreate);
    profileTabsForms.createProject(title, description);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      alert.checkAlert("positive", parse[0], 0);
      alert.checkAlert("positive", parse[1], 0);
    });
  });

  it("Login, I see project in Profile Panel list", () => {
    loginAuth0Simple();
    cy.visit(paths.profilePanelProject);
    profilePanelProject.checkItemsList(1);
  });

  it("PP, I see project in page project", () => {
    cy.visit(paths.projects);
    projectPage.changeUser("Artur - artekscibor");
    projectPage.checkItemsList(1);
  });

  it("Login, create project, delete project -> I see alert", () => {
    const title = `title_${Math.random().toFixed(4)}`;
    const description = `description_${Math.random().toFixed(4)}`;
    const alertLnag = "alert.message.positive.project.deleteProject";
    const alertImageLang = "alert.message.positive.file.deleteAllFile";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}", "${alertImageLang}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelProjectCreate);
    profileTabsForms.createProject(title, description);
    profilePanelProject.deleteProject(title);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      alert.checkAlert("positive", parse[0], 0);
      alert.checkAlert("positive", parse[1], 0);
    });
  });

  it("Login, create project, delete image -> I see alert", () => {
    const title = `title_${Math.random().toFixed(4)}`;
    const description = `description_${Math.random().toFixed(4)}`;
    const alertLnag = "alert.message.positive.file.deleteFile";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelProjectCreate);
    profileTabsForms.createProject(title, description);
    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      profilePanelProject.deleteImage(title);
      alert.checkAlert("positive", parse[0], 0);
    });
  });

  it("Login, create project, change project -> I see alert", () => {
    const title = `title_${Math.random().toFixed(4)}`;
    const description = `description_${Math.random().toFixed(4)}`;
    const changeTitle = `${title}_change`;
    const changeDescription = `${description}_change`;
    const alertLnag = "alert.message.positive.project.changeProject";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelProjectCreate);
    profileTabsForms.createProject(title, description);
    profilePanelProject.openChnageProject(title);
    profilePanelProject.deleteImage(title);
    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      profileTabsForms.changeProject(changeTitle, changeDescription);
      alert.checkAlert("positive", parse[0], 0);
    });
  });
});
