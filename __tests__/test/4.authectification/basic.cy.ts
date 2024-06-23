import { paths } from "./../../../utils/paths";
import { loginAuth0Simple } from "./../../support/helper/auth/signIn";

describe("Authorization", () => {
  it("HP, login -> I see profilePage", () => {
    loginAuth0Simple();
  });
  it("HP, login -> I see button logout", () => {});
  it("HP, login -> I see button logout, click logout -> I see homePage", () => {});
});
