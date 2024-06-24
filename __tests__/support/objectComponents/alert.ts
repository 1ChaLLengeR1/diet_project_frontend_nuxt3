export class Alert {
  get alertPositive() {
    return cy.get('[id="alertPositive"]');
  }
  get alertWarning() {
    return cy.get('[id="alertWarning"]');
  }
  get alertError() {
    return cy.get('[id="alertError"]');
  }

  get closeAlertPositive() {
    return cy.get('[id="closeAlertPositive"]');
  }

  closeAlert(type: string, number: number) {
    if (type === "positive") {
      this.closeAlertPositive.eq(number).should("exist").click();
    }
  }

  checkAlert(type: string, message: string, number: number) {
    if (type === "positive") {
      this.alertPositive.contains(message).eq(number).should("exist");
    }
    if (type === "warning") {
      this.alertWarning.contains(message).eq(number).should("exist");
    }
    if (type === "error") {
      this.alertError.contains(message).eq(number).should("exist");
    }
  }
}
