import { environment } from "./../e2e";

export class Auth0 {
  signIn(userName: string, password: string) {
    cy.origin(
      environment.DIET_AUTH0_ENDPOINT,
      { args: { userName, password } },
      ({ userName, password }) => {
        cy.get('input[name="username"]').type(userName);
        cy.get('input[name="password"]').type(password);
        cy.get('button[name="action"]').click();
      }
    );
  }
}
