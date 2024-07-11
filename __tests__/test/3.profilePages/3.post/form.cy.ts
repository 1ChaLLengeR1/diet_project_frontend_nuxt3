import { paths } from "../../../../utils/paths";
import { loginAuth0Simple } from "../../../support/helper/auth/signIn";
import { ProfileTabsForms } from "../../../support/objectComponents/profileTabsForms";
import { ProfilePanelPost } from "../../../support/objectPages/profilePanelPost";
import { Alert } from "../../../support/objectComponents/alert";
import { nameProject } from "../../../support/e2e";
import { Selets } from "../../../support/objectComponents/selets";
import { ProjectPage } from "../../../support/objectPages/projectPage";
import { PostPage } from "../../../support/objectPages/postPage";

const profileTabsForms = new ProfileTabsForms();
const profilePanelPost = new ProfilePanelPost();
const alert = new Alert();
const selects = new Selets();
const projectPage = new ProjectPage();
const postPage = new PostPage();
const time: number = 2000;

describe("Profile Page Panel Post", () => {
  it("Login, create post -> I see alert", () => {
    const alertLnag = "alert.message.positive.post.addPost";
    const alertImageLang = "alert.message.positive.file.createFile";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}", "${alertImageLang}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPostCreate);
    profileTabsForms.createPost(1, 98, 2555, nameProject);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      alert.checkAlert("positive", parse[0], 0);
      alert.checkAlert("positive", parse[1], 0);
    });
  });

  it("Login -> I see in list profile page post", () => {
    loginAuth0Simple();
    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);
    profilePanelPost.checkItemsList(1);
  });

  it("Post Page List -> I see in list project", () => {
    cy.visit(paths.projects);
    projectPage.changeUser("Artur - artekscibor");
    projectPage.chooseProject(nameProject);
    postPage.checkItemsList(1);
  });

  it("Post Page List, click see post -> I see data post", () => {
    cy.visit(paths.projects);
    projectPage.changeUser("Artur - artekscibor");
    projectPage.chooseProject(nameProject);
    postPage.choosePost();

    const trainings: { type: string; time: string; kcal: number }[] = [
      { type: "Jazda na rowerze", time: "1:10:30", kcal: 555 },
      { type: "Pływanie", time: "00:50:30", kcal: 777 },
    ];

    postPage.seePost(1, 98, 2555, trainings);
  });

  it("Login, change post default -> I see alert and data in profile one post", () => {
    const alertLnag = "alert.message.positive.post.changePost";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();
    profileTabsForms.changePostDefault(1, 100, 3000);
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      alert.checkAlert("positive", parse[0], 0);
    });

    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();
    profileTabsForms.cheackPostFormValue(1, 100, 3000);
  });

  it("Login, delete image -> I see alert", () => {
    const alertLnag = "alert.message.positive.file.deleteFile";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      cy.get(`[aria-roledescription="❎"]`)
        .first()
        .should("exist")
        .click({ force: true });
      alert.checkAlert("positive", parse[0], 0);
    });
  });

  it("Login, add training -> I see alert and data in profile one post", () => {
    let trainingLength: number = 0;
    const tranings: { type: string; time: string; kcal: number }[] = [
      { type: "bike", time: "1:25:10", kcal: 1000 },
      { type: "bike", time: "00:25:10", kcal: 555 },
      { type: "swim", time: "2:25:10", kcal: 2555 },
      { type: "swim", time: "3:25:10", kcal: 3555 },
    ];

    const alertLnag = "alert.message.positive.post.changePost";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();

    cy.get('[role="listitem"]')
      .its("length")
      .then((length) => {
        trainingLength = length;
      });

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      profileTabsForms.addTraining(trainingLength, tranings);
      alert.checkAlert("positive", parse[0], 0);
    });

    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();
    cy.get('[role="listitem"]').its("length").should("gt", 3);
  });

  it("Login, delete training -> I see alert and data in profile one post", () => {
    const alertLnag = "alert.message.positive.post.changePost";
    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      cy.get('[id="collectionTraining-0-remove-button"]')
        .should("exist")
        .click();
      cy.get('[id="button"]').click();
      alert.checkAlert("positive", parse[0], 0);
    });

    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();
    cy.get('[role="listitem"]').its("length").should("gt", 0);
  });

  it("Login, change training -> I see alert and data in profile one post", () => {
    const alertLnag = "alert.message.positive.post.changePost";
    const tranings: { type: string; time: string; kcal: number }[] = [
      { type: "swim", time: "1:00:10", kcal: 1000 },
      { type: "swim", time: "2:00:20", kcal: 2000 },
      { type: "swim", time: "3:00:30", kcal: 3000 },
      { type: "swim", time: "4:00:40", kcal: 4000 },
    ];

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      profileTabsForms.changeTraining(tranings);
      alert.checkAlert("positive", parse[0], 0);
    });

    selects.chooseProject(nameProject);
    profilePanelPost.openChangePost();
    profileTabsForms.checkTraining(tranings);
  });

  it("Login, create post, delete post -> I see alert", () => {
    const alertLnag = "alert.message.positive.post.deletePost";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${alertLnag}"]}`
    );
    cy.wait(time);

    cy.visit(paths.profilePanelPosts);
    selects.chooseProject(nameProject);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      profilePanelPost.deletePost("Dzień - 1");
      alert.checkAlert("positive", parse[0], 0);
    });
  });
});
