import { paths } from "./../../../../utils/paths";
import { Spinner } from "./../../../support/objectComponents/spinner";

const spinner = new Spinner();

describe("Home Page Basic", () => {
  it("HP, check loadingSpinner info", () => {
    const spinnerLangInformation = "loadingSpinner.information";
    const spinnerLangInformationMore = "loadingSpinner.informationMore";
    const spinnerLangInformationStoreDictionary =
      "loadingSpinner.stores.dictionary";

    cy.visit(
      `${paths.testPanel}?action=loadLangs&data={"lang":["${spinnerLangInformation}", "${spinnerLangInformationMore}", "${spinnerLangInformationStoreDictionary}"]}`
    );
    cy.wait(500);

    cy.visit(paths.home);
    cy.reload();

    cy.window().then((win) => {
      const lang = win.localStorage.getItem("lang");
      const parse = JSON.parse(lang!);
      spinner.checkInfo(parse[0], "info");
      spinner.checkInfo(parse[1], "info");
      spinner.checkInfo(parse[2], "infoStores");
    });
  });
});
