export class ProfilePanelPost {
  get itemListPost() {
    return cy.get('[id="itemListPost"]');
  }

  checkItemsList(items: number) {
    this.itemListPost.its("length").should("be.within", items, 16);
  }

  openChangePost() {
    cy.get('[id="changePost"]').first().click();
  }

  deletePost(nameProject: string) {
    cy.get('[id="listProject"]')
      .should("exist")
      .find('[id="itemListPost"]')
      .then(($itemProjects) => {
        // Przekształcenie NodeList do Array i znalezienie pierwszego pasującego elementu
        const item = Array.from($itemProjects).find((project) => {
          return Cypress.$(project)
            .find("p#titlePost")
            .text()
            .includes(nameProject);
        });

        if (item) {
          cy.wrap(item).within(() => {
            cy.get('[id="confirmButtonPostCard"]').should("exist").click();
          });
          cy.get('[id="confirmButton"]').should("exist").click();
        }
      });
  }
}
