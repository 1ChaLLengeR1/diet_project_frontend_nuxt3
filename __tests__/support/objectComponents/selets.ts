export class Selets {
  chooseProject(name: string) {
    cy.get(".v-field__field").should("exist").click();
    cy.get(".v-list-item").contains(name).should("exist").click();
  }
}
