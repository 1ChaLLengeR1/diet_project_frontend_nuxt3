import "cypress-real-events";
import "./commands";

export const environment = Cypress.env();

export const auth0Email = environment.AUTH0_EMAIL;
export const auth0Password = environment.AUTH0_PASSWORD;
