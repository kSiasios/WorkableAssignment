// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("dragdrop", ($dragelement, drop) => {
//   //   cy.get(drag).should("exist").get(drop).should("exist");
//   cy.get(drop).should("exist");

//   //   const draggable = Cypress.$(darg)[0];
//   const draggable = $dragelement;
//   const droppable = Cypress.$(drop)[0];

//   const coords = droppable.getBoundingClientRect();
//   draggable.dispatchEvent(new MouseEvent("mousedown"));
//   draggable.dispatchEvent(
//     new MouseEvent("mousemove", { clientX: 10, clientY: 0 })
//   );
//   draggable.dispatchEvent(
//     new MouseEvent("mousemove", {
//       clientX: coords.left + 10,
//       clientY: coords.top + 10,
//     })
//   );
//   draggable.dispatchEvent(new MouseEvent("mouseup"));
//   return cy.get(drop);
// });
