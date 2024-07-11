import { paths } from "./../../../utils/paths";
import { loginAuth0Simple } from "./../../support/helper/auth/signIn";
import { checkUrlPage } from "./../../support/helper/urlPage";
import { SideBarMenu } from "./../../support/objectComponents/sideBar";
import { ProfileTabs } from "./../../support/objectComponents/profileTabs";

const sideBarMenu = new SideBarMenu();
const profileTabs = new ProfileTabs();
const time: number = 2000;

describe("Profile Page Panel Form", () => {
  it("HP, go to profilePage -> I see homePage", () => {
    cy.visit(paths.home);
    cy.visit(paths.profilePanel);
    checkUrlPage(paths.home);
  });

  it("Login, go to PPP -> I see tabs - 'projects'", () => {
    const adminPanel = "sidebar.siderbarMenu.adminPanel";
    const projectTab = "profilePanel.tabs.project";
    const postTab = "profilePanel.tabs.post";
    const createProject = "profilePanel.tabs.create_project";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${adminPanel}", "${projectTab}", "${postTab}", "${createProject}"]}`
    );
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      sideBarMenu.clickLink(parse[0]);
      profileTabs.checkTabs([parse[1], parse[2], parse[3]]);
    });
  });

  it("Login, go to PPP, change tab to post -> I see tabs - 'posts'", () => {
    const adminPanel = "sidebar.siderbarMenu.adminPanel";
    const projectTab = "profilePanel.tabs.project";
    const postTab = "profilePanel.tabs.post";
    const createPost = "profilePanel.tabs.create_post";

    loginAuth0Simple();

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${adminPanel}", "${projectTab}", "${postTab}", "${createPost}"]}`
    );
    cy.wait(time);

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      sideBarMenu.clickLink(parse[0]);
      profileTabs.clickLink(parse[2]);
      profileTabs.checkTabs([parse[1], parse[2], parse[3]]);
    });
  });
});
