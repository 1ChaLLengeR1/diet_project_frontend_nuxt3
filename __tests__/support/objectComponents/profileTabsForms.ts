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

  changeProject(title: string, description: string) {
    cy.get('[id="title"]').should("exist").clear().type(title);
    cy.get('[id="description"]').should("exist").clear().type(description);
    cy.get('[id="button"]').click();
  }

  checkFormPost() {
    cy.get('[id="dayWeight.day"]').should("exist");
    cy.get('[id="dayWeight.weight"]').should("exist");
    cy.get('[id="kcalSelectProject.kcal"]').should("exist");
    cy.get('[id="kcalSelectProject.selectProject.selectProject"]').should(
      "exist"
    );
    cy.get('[id="files.fileFigure"]').should("exist");
    cy.get('[id="files.fileWeight"]').should("exist");
    cy.get('[id="files.fileKcal"]').should("exist");
    cy.get('[id="files.fileTraining"]').should("exist");
    cy.get('[id="trainingCollection-add-button"]').should("exist").click();
    cy.get('[id="trainingCollection.0.type.type"]').should("exist");
    cy.get('[id="trainingCollection.0.time"]').should("exist");
    cy.get('[id="trainingCollection.0.kcal"]').should("exist");
    cy.get('[id="button"]').should("exist");
  }

  createPost(day: number, weight: number, kcal: number, selectProject: string) {
    cy.get('[id="dayWeight.day"]').should("exist").type(day.toString());
    cy.get('[id="dayWeight.weight"]').should("exist").type(weight.toString());
    cy.get('[id="kcalSelectProject.kcal"]')
      .should("exist")
      .type(kcal.toString());
    cy.get('select[id="kcalSelectProject.selectProject.selectProject"]').select(
      selectProject
    );
    cy.get('[id="files.fileFigure"]').selectFile(
      "./__tests__/fixtures/images/test.png",
      {
        force: true,
      }
    );
    cy.get('[id="files.fileWeight"]').selectFile(
      "./__tests__/fixtures/images/test.png",
      {
        force: true,
      }
    );
    cy.get('[id="files.fileKcal"]').selectFile(
      "./__tests__/fixtures/images/test.png",
      {
        force: true,
      }
    );
    cy.get('[id="files.fileTraining"]').selectFile(
      "./__tests__/fixtures/images/test.png",
      {
        force: true,
      }
    );
    cy.get('[id="trainingCollection-add-button"]').should("exist").click();
    cy.get('select[id="trainingCollection.0.type.type"]').select("bike", {
      force: true,
    });
    cy.get('[id="trainingCollection.0.time"]').should("exist").type("1:10:30");
    cy.get('[id="trainingCollection.0.kcal"]').should("exist").type("555");
    cy.get('[id="trainingCollection-add-button"]').should("exist").click();
    cy.get('select[id="trainingCollection.1.type.type"]').select("swim", {
      force: true,
    });
    cy.get('[id="trainingCollection.1.time"]').should("exist").type("00:50:30");
    cy.get('[id="trainingCollection.1.kcal"]').should("exist").type("777");
    cy.get('[id="button"]').click();
  }

  changePostDefault(day: number, weight: number, kcal: number) {
    cy.get('[id="day"]').should("exist").clear().type(day.toString());
    cy.get('[id="weight"]').should("exist").clear().type(weight.toString());
    cy.get('[id="kcal"]').should("exist").clear().type(kcal.toString());
    cy.get('[id="button"]').click();
  }

  cheackPostFormValue(day: number, weight: number, kcal: number) {
    cy.get('[id="day"]').should("exist").should("have.value", day);
    cy.get('[id="weight"]').should("exist").should("have.value", weight);
    cy.get('[id="kcal"]').should("exist").should("have.value", kcal);
  }

  addTraining(
    index: number,
    tranings: { type: string; time: string; kcal: number }[]
  ) {
    tranings.forEach((traning) => {
      cy.get('[id="listTraining-add-button"]').should("exist").click();
      cy.get(`select[id="listTraining.${index}.type"]`).select(traning.type, {
        force: true,
      });
      cy.get(`[id="listTraining.${index}.time"]`)
        .should("exist")
        .type(traning.time);
      cy.get(`[id="listTraining.${index}.kcal"]`)
        .should("exist")
        .type(traning.kcal.toString());
      index++;
    });
    cy.get('[id="button"]').click();
  }

  changeTraining(tranings: { type: string; time: string; kcal: number }[]) {
    tranings.forEach((traning, index) => {
      cy.get(`select[id="listTraining.${index}.type"]`).select(traning.type, {
        force: true,
      });
      cy.get(`[id="listTraining.${index}.time"]`)
        .clear()
        .should("exist")
        .type(traning.time);
      cy.get(`[id="listTraining.${index}.kcal"]`)
        .clear()
        .should("exist")
        .type(traning.kcal.toString());
    });
    cy.get('[id="button"]').click();
  }

  checkTraining(trainings: { type: string; time: string; kcal: number }[]) {
    trainings.forEach((training, index) => {
      cy.get(`select[id="listTraining.${index}.type"]`)
        .should("exist")
        .should("have.value", training.type);

      cy.get(`[id="listTraining.${index}.time"]`)
        .should("exist")
        .invoke("val")
        .then((value) => {
          const formattedValue = value.toString().replace(/^0/, ""); // Usuń wiodące zero, jeśli jest
          expect(formattedValue).to.equal(training.time);
        });

      cy.get(`[id="listTraining.${index}.kcal"]`)
        .should("exist")
        .should("have.value", training.kcal.toString());
    });
  }

  checkFormUser() {
    cy.get('[id="userName"]').should("exist");
    cy.get('[id="lastName"]').should("exist");
    cy.get('[id="nickName"]').should("exist");
    cy.get('[id="email"]').should("exist");
    cy.get('[id="role"]').should("exist");
    cy.get('[id="button"]').should("exist");
  }

  changeFormUser(
    userName: string,
    lastName: string,
    nickName: string,
    email: string
  ) {
    cy.get('[id="userName"]').should("exist").clear().type(userName);
    cy.get('[id="lastName"]').should("exist").clear().type(lastName);
    cy.get('[id="nickName"]').should("exist").clear().type(nickName);
    cy.get('[id="email"]').should("exist").clear().type(email);
    cy.get('[id="role"]').should("exist");
    cy.get('[id="button"]').click();
  }

  checkParamsFormUser(
    userName: string,
    lastName: string,
    nickName: string,
    email: string
  ) {
    cy.get('[id="userName"]').should("exist").should("have.value", userName);
    cy.get('[id="lastName"]').should("exist").should("have.value", lastName);
    cy.get('[id="nickName"]').should("exist").should("have.value", nickName);
    cy.get('[id="email"]').should("exist").should("have.value", email);
    cy.get('[id="role"]').should("exist");
  }
}
