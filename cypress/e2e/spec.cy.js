describe("Test Sign Up with various inputs", () => {
  Cypress.Commands.add("login", (user) => {
    cy.get("nav #login").click();
    cy.get(".validate#email").type(user.email, { force: true });
    cy.get(".validate#password").type(user.password, { force: true });
    cy.get("button[type='submit']").click();
  });

  beforeEach("Redirect to Application", () => {
    // Redirect to Application URL
    // cy.visit("https://node-fs-app.herokuapp.com/dashboard");
    cy.visit(Cypress.config().baseUrl);
    // Go to Sign up page
    cy.get("nav #signup").click();
  });

  it("should sign up using all the form fields", () => {
    let _name = "John Doe";
    let _email = "johndoe@example.com";
    let _password = "john's secure password";
    let _company = "Workable";
    let _address = "Unknown Avenue 12";

    // fill name
    cy.get(".validate#fullName").type(_name, { force: true });
    // fill email
    cy.get(".validate#email").type(_email, { force: true });
    // fill password
    cy.get(".validate#password").type(_password, { force: true });
    // fill company
    cy.get(".validate#company").type(_company, { force: true });
    // fill address
    cy.get(".validate#address").type(_address, { force: true });

    // submit form
    cy.get("button[type='submit']").click();

    // login
    cy.login({ email: _email, password: _password });

    // Validate account creation
    cy.get("nav").should("contain", "Logout");
  });

  it("should sign up using only some of the fields", () => {
    let _name = "Jane Doe";
    let _email = "janedoe@example.com";
    let _password = "jane's secure password";
    // fill name
    cy.get(".validate#fullName").type(_name, { force: true });
    // fill email
    cy.get(".validate#email").type(_email, { force: true });
    // fill password
    cy.get(".validate#password").type(_password, { force: true });

    // submit form
    cy.get("button[type='submit']").click();
    // login
    cy.login({ email: _email, password: _password });
    // Validate account creation
    cy.get("nav").should("contain", "Logout");
  });

  it("should attempt to sign up using invalid email", () => {
    let _name = "George Lucas";
    let _email = "georgelucas#example.com";
    let _password = "lucasfilms";

    // fill name
    cy.get(".validate#fullName").type(_name, { force: true });
    // fill email
    cy.get(".validate#email").type(_email, { force: true });
    // fill password
    cy.get(".validate#password").type(_password, { force: true });

    // submit form
    cy.get("button[type='submit']").click();

    cy.login({ email: _email, password: _password });

    // Validate account creation
    cy.get("nav").should("not.contain", "Logout");
  });

  describe("User Specific Tests", () => {
    let taskIndex = 0;

    beforeEach("Log In", () => {
      let user = {
        email: "johndoe@example.com",
        password: "john's secure password",
      };

      cy.login(user);
      cy.get("nav").should("contain", "Logout");
    });

    function createProject(
      name = `John's new project${taskIndex === 0 ? "" : " " + taskIndex}`,
      desc = "This is John's new project. The most important project of his career. He has invested much to its success."
    ) {
      cy.contains("a", "Create").click();
      // fill project info
      let _projectName = name;
      let _projectDescription = desc;
      // "This is John's new project. The most important project of his career. He has invested much to its success.";
      cy.get("input#name").type(_projectName);
      cy.get("input#description").type(_projectDescription);
      cy.get("button[type='submit']").click();

      // wait for 1 sec for the process to be completed
      cy.wait(1000);

      // validate addition
      cy.get(".row")
        .eq(-2)
        .within(() => {
          cy.get("span.card-title").last().should("contain", _projectName);
          cy.get("p").should("contain", _projectDescription);
        });

      taskIndex++;

      return name;
    }

    it("should test project specific functions", () => {
      // #region CREATE PROJECT
      // fill project info
      let _projectName = "John's new project";
      let _projectDescription =
        "This is John's new project. The most important project of his career. He has invested much to its success.";
      createProject(_projectName, _projectDescription);

      // #endregion

      // #region EDIT PROJECT
      cy.contains("div.card", _projectName).within(() => {
        cy.contains("#btn_update_project", "Edit").click();
      });
      let _newProjectName = `${_projectName} (Edited)`;
      cy.get("input#name").clear().type(_newProjectName);
      cy.get("button[type='submit").click();
      // wait for 1 sec for the process to be completed
      cy.wait(1000);
      // validate edit
      cy.get(".row")
        .eq(-2)
        .within(() => {
          cy.get("span.card-title").last().should("contain", _newProjectName);
        });
      // #endregion

      // #region DELETE PROJECT
      cy.contains("div.card", _newProjectName).within(() => {
        cy.contains("#delete_project", "Delete").click();
      });
      // wait for 1 sec for the process to be completed
      cy.wait(1000);
      cy.get(".row").last().should("not.contain", _newProjectName);

      // #endregion
    });

    it("should test task specific functions", () => {
      let projectName = createProject();
      addTask(projectName);
      // validate task addition
      cy.get("#to_do_items").should("contain", taskSummary);
      //#endregion

      //#region EDIT TASK
      cy.contains(".card", taskSummary).within(() => {
        cy.get("#btn_update_task").click();
      });
      let newTaskSummary = `${taskSummary} (Edited)`;
      cy.get("#summary")
        .clear({ force: true })
        .type(newTaskSummary, { force: true });
      cy.get("#multiselectContainerReact").within(() => {
        // click input
        cy.get("#search_input").click();
        cy.contains("li", "backend").click();
      });
      cy.get("button[type='submit']").click();
      cy.wait(2000);
      // validate task addition
      cy.get("#to_do_items").should("contain", taskSummary);
      //#endregion

      // #region DELETE TASK
      cy.contains(".card", taskSummary).within(() => {
        cy.get("#btn_delete_task").click();
      });
      cy.wait(1000);
      // validate task deletion
      cy.get("#to_do_items").should("not.contain", taskSummary);
      // #endregion
    });

    it("should test view tasks functionality", () => {
      let projectName = createProject();
      cy.contains(".card", projectName).within(() => {
        cy.get("#btn_view_tasks").click();
      });

      cy.get("#root")
        .should("contain", "TO DO")
        .and("contain", "IN PROGRESS")
        .and("contain", "IN REVIEW")
        .and("contain", "DONE");
    });

    it("should validate user's info", () => {
      cy.get("a#settings").click();

      cy.get("input#fullName").should("have.value", "John Doe");
      cy.get("input#email").should("have.value", "johndoe@example.com");
      // cy.get("input#password").should("have.value", "BWqsD7m6miA8zhp");
      cy.get("input#company").should("have.value", "Workable");
      cy.get("input#address").should("have.value", "Unknown Avenue 12");
    });

    it.only("should test drag and drop to move tasks to different statuses", () => {
      // let projectName = createProject("Test Project for Drag and Drop");
      // let task1 = addTask(projectName);
      // cy.get("a#dashboard").click();
      // let task2 = addTask(projectName);
      // cy.get("a#dashboard").click();
      // let task3 = addTask(projectName);
      // cy.get("a#dashboard").click();
      // let task4 = addTask(projectName);

      let projectName = "Test Project for Drag and Drop";
      cy.contains(".card", projectName).within(() => {
        cy.get("#btn_view_tasks").click();
      });

      let id;
      cy.intercept({ method: "PUT", path: "/api/tasks/" }, (req) => {
        console.log(`ID: ${id}`);
        req.url = `${req.url}${id}`;
      }).as(`apiCall`);

      function dragDrop(dragSelector, dropSelector) {
        const dataTransfer = new DataTransfer();
        cy.get(dragSelector)
          .trigger("dragstart", { dataTransfer: dataTransfer })
          .then((ev) => {
            console.log(ev);
            id = ev.prop("id");
          });
        cy.get(dropSelector)
          .trigger("dragenter", { force: true, dataTransfer: dataTransfer })
          .trigger("dragover", { force: true, dataTransfer: dataTransfer })
          .trigger("drop", { force: true, dataTransfer: dataTransfer })
          .trigger("dragend", { force: true, dataTransfer: dataTransfer });

        cy.wait(`@apiCall`);
      }

      dragDrop("[draggable='true']:nth-child(4)", "#in_progress_items");
      // validate column in progress has task 3
      cy.get("#in_progress_items").within(() => {
        cy.get(".card").should("have.length", 1).and("contain.text", "task 3");
      });

      dragDrop("[draggable='true']:nth-child(3)", "#in_review_items");
      // validate column in review has task 2
      cy.get("#in_review_items").within(() => {
        cy.get(".card").should("have.length", 1).and("contain.text", "task 2");
      });

      dragDrop("[draggable='true']:nth-child(2)", "#done_items");
      // validate column done has task 1
      cy.get("#done_items").within(() => {
        cy.get(".card").should("have.length", 1).and("contain.text", "task 1");
      });
    });

    it("should test TaskDB page", () => {
      // navigate to TaskDB page
      cy.get("a#task_db").click();

      // sort tasks by summary decending
      cy.get("#sort_tasks").then((elem) => {
        if (elem.text().includes("arrow_circle_down")) {
          // descending
          // click to sort
          cy.wrap(elem).click();
        }
      });
      // check that the sorting happened ("john's new task" should be before "john's new task 1")
      cy.get(".card-title").then((cards) => {
        cy.wrap(cards).eq(0).should("have.text", "John's new task");
        cy.wrap(cards).eq(1).should("have.text", "John's new task 1");
      });
      // search task by text (Search for "john's new task 2")
      cy.get("input#search").clear({ force: true }).type("2", { force: true });
      // validate that every task in the task container contains the text we searched for
      cy.get(".card-title").should("have.length", 1);
    });

    it("should update user's info", () => {
      cy.get("a#settings").click();
      cy.wait(1000);

      cy.get("input#address")
        .clear({ force: true })
        .type("John's St. 15", { force: true });

      // submit form
      cy.get("button[type='submit']").click();
      cy.wait(1000);

      cy.get("a#settings").click();
      cy.wait(1000);

      cy.get("input#address").should("have.value", "John's St. 15");
    });
    // });
  });
});
