import "cypress-real-events";
import "./commands";

export const environment = Cypress.env();

export const nameProject = "Test_Test_Test_Form_Test";
export const descriptionProject = "Test_Description";
export const link = "http://localhost:3001";

export const auth0Email = environment.AUTH0_EMAIL;
export const auth0Password = environment.AUTH0_PASSWORD;
