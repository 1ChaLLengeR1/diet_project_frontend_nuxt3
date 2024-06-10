export class Spinner {
  get loadingSpinner() {
    return cy.get('[id="loadingSpinner"]');
  }

  get loadingSpinnerInfo() {
    return cy.get('[id="loadingSpinnerInfo"]');
  }

  get loadingSpinnerInfoStores() {
    return cy.get('[id="loadingSpinnerInfoStores"]');
  }

  checkInfo(text: string, type: string) {
    if (type === "info") {
      this.loadingSpinnerInfo.contains(text).should("exist");
    } else if (type === "infoStores") {
      this.loadingSpinnerInfoStores.contains(text).should("exist");
    }
  }
}
