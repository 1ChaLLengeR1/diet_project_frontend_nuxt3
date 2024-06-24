export function checkUrlPage(path: string) {
  cy.url().should("include", path);
}
