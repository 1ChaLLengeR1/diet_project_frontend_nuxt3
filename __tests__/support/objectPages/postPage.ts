export class PostPage {
  get itemProject() {
    return cy.get('[id="itemProject"]');
  }

  checkItemsList(items: number) {
    this.itemProject.its("length").should("be.within", items, 16);
  }

  choosePost() {
    cy.get('[id="buttonSeePost"]').should("exist").first().click();
  }

  seePost(
    day: number,
    weight: number,
    kcal: number,
    tranings: { type: string; time: string; kcal: number }[]
  ) {
    cy.get('[id="day"]').contains(day).should("exist");
    cy.get('[id="weight"]').contains(weight).should("exist");
    cy.get('[id="kcal"]').contains(kcal).should("exist");

    tranings.forEach((item) => {
      cy.get(`[id="typeTraining"]`).contains(item.type).should("exist");
      cy.get('[id="timeTraining"]').contains(item.time).should("exist");
      cy.get('[id="kcalTraining"]').contains(item.kcal).should("exist");
    });
  }
}
