export class DropDownLanguage {
  get dropDownLanguage() {
    return cy.get('[id="dropDownLanguage"]');
  }

  get dropDownButton() {
    return cy.get('[id="dropDownButton"]');
  }

  get dropDownItem() {
    return cy.get('[id="dropDownItem"]');
  }

  checkDropDown(text: string) {
    this.dropDownLanguage.contains(text).should("exist");
  }

  checkDropDownLanguage(langs: string[]) {
    this.dropDownButton.click();
    langs.forEach((lang) => {
      this.dropDownItem.contains(lang).should("exist");
    });
  }

  changeLanguage(lang: string) {
    this.dropDownButton.click();
    this.dropDownItem.contains(lang).should("exist").click();
  }
}
