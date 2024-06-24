export class ProfileTabsForms {
  checkFormProject() {
    cy.get('[id="title"]').should("exist");
    cy.get('[id="description"]').should("exist");
    cy.get('[id="fileProject"]').should("exist");
    cy.get('[id="button"]');
  }

  createProject(title: string, description: string) {
    cy.get('[id="title"]').should("exist").clear().type(title);
    cy.get('[id="description"]').should("exist").clear().type(description);
    cy.get('[id="fileProject"]').selectFile(
      "./__tests__/fixtures/images/test.png",
      {
        force: true,
      }
    );
    cy.get('[id="button"]').click();
  }

  checkFormPost() {}
}
