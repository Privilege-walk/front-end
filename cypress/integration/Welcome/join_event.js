Given("I am on the welcome page for an event", ()=> {
    cy.visit('/welcome');
});

When("I click on the start button", () => {
    // cy.get('button').contains('Start').click();
});

Then("I should be taken to the questions page where I can begin answering questions", () => {
    // cy.url().should('include', '/walk');
    // cy.get('div[id="eventName"]').should("not.have.text", "");
    // cy.get('div[id="question"]').should("not.have.text", "");
    // cy.get('div[id="numQuestions"]').should("not.have.text", "");
});