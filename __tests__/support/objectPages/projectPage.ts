export class ProjectPage {
  get itemProject() {
    return cy.get('[id="itemProject"]');
  }

  checkItemsList(items: number) {
    this.itemProject.its("length").should("be.within", items, 16);
  }

  changeUser(name: string) {
    cy.get('[role="combobox"]').click();
    cy.wait(2000);
    cy.get(".v-list-item").contains(name).click();
  }

  chooseProject(nameProject: string) {
    cy.get('[id="listProject"]')
      .should("exist")
      .within(() => {
        cy.get('[id="itemProject"]').each(($itemProject) => {
          cy.wrap($itemProject).within(() => {
            cy.get("p#titleCard").then(($titleCard) => {
              if ($titleCard.text().includes(nameProject)) {
                cy.wrap($itemProject).as("selectedProject");
              }
            });
          });
        });
      });

    cy.get("@selectedProject").find('[id="linkPosts"]').should("exist").click();
  }
}
