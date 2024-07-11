export class ProfileTabs {
  get profilePanelTab() {
    return cy.get('[id="profilePanelTab"]');
  }

  checkTabs(links: string[]) {
    links.forEach((link) => {
      this.profilePanelTab.contains(link).should("exist");
    });
  }

  clickLink(link: string) {
    this.profilePanelTab.contains(link).should("exist").click();
  }
}
