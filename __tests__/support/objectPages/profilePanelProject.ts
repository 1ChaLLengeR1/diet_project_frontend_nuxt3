export class ProfilePanelProject {
  get listProject() {
    return cy.get('[id="listProject"]');
  }

  get itemProject() {
    return cy.get('[id="itemProject"]');
  }

  get confirmButtonProjectCard() {
    return cy.get('[id="confirmButtonProjectCard"]');
  }

  get confirmButton() {
    return cy.get('[id="confirmButton"]');
  }

  checkItemsList(items: number) {
    this.itemProject.its("length").should("be.within", items, 16);
  }

  openChnageProject(nameProject: string) {
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

    cy.get("@selectedProject")
      .find('[id="changeProjectCard"]')
      .should("exist")
      .click();
  }

  deleteProject(nameProject: string) {
    cy.get('[id="listProject"]')
      .should("exist")
      .within(() => {
        cy.get('[id="itemProject"]').each(($itemProject) => {
          cy.wrap($itemProject).within(() => {
            cy.get("p#titleCard").then(($titleCard) => {
              if ($titleCard.text().includes(nameProject)) {
                cy.get('[id="confirmButtonProjectCard"]')
                  .should("exist")
                  .click();
              }
            });
          });
        });
      });
    cy.get('[id="confirmButton"]').should("exist").click();
  }

  deleteImage(nameProject: string) {
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

    cy.get("@selectedProject")
      .find('[id="changeProjectCard"]')
      .should("exist")
      .click();

    cy.get(`[aria-roledescription="❎"]`)
      .should("exist")
      .click({ force: true });
  }
}
