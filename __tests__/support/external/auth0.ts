import { environment } from "./../e2e";

export class Auth0 {
  signIn(userName: string, password: string) {
    cy.origin(
      environment.DIET_AUTH0_ENDPOINT,
      { args: { userName, password } },
      ({ userName, password }) => {
        cy.once("uncaught:exception", () => false);
        cy.get('[id="email"]').type(userName);
        cy.get('[id="password"]').type(password);
        cy.get('[id="btn-login"]').click();
      }
    );
  }
}
