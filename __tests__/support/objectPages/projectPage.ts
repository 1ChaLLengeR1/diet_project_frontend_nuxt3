export class ProjectPage {
  get itemProject() {
    return cy.get('[id="itemProject"]');
  }

  checkItemsList(items: number) {
    this.itemProject.its("length").should("be.within", items, 16);
  }

  changeUser(name: string) {
    cy.get('[role="combobox"]').click();
    cy.wait(500);
    cy.get(".v-list-item").contains(name).click();
  }
}
