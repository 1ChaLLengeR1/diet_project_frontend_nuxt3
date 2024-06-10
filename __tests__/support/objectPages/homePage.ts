export class HomePage {
  get menuNavSiderbar() {
    return cy.get('[id="menuNavSiderbar"]');
  }

  get itemMenuSiderbar() {
    return cy.get('[id="itemMenuSiderbar"]');
  }

  checkMenu(links: { active: boolean; text: string }[]) {
    links.forEach((link) => {
      if (link.active) {
        this.itemMenuSiderbar
          .contains(link.text)
          .should("exist")
          .should("have.css", "color", "rgb(255, 114, 0)");
      }
      this.itemMenuSiderbar.contains(link.text).should("exist");
    });
  }
}
