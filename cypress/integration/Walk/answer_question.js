Given("I create an event and add Questions and click on go live", () => {
    cy.visit('/login');
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('password-bdd')
    cy.get('button[type="submit"]').contains('Login').should('be.visible').click()
    // cy.get('button[id="edit-126"]').contains('Edit').should('be.visible').click()
    // let question = 'Question-';
    // let option = 'Option-';
    // for(let i=0; i<5; i++) {
    //     cy.get('input[id="new-question-name"]').type(question + i);
    //     cy.get(`input[id="new-option-desc-0"]`).type(option + i + '1');
    //     cy.get(`input[id="new-option-points-0"]`).type('-1');
    //     cy.get(`button[id="add-0"]`).contains('Add').should('be.visible').click()
    //     cy.get(`input[id="new-option-desc-1"]`).type(option + i + '2');
    //     cy.get(`input[id="new-option-points-1"]`).type('+1');
    //     cy.get(`button[id="add-1"]`).contains('Add').should('be.visible').click()
    //     cy.get('button[type="submit"]').contains('Create Question').should('be.visible').click()
    // }
    // cy.go('back');
    cy.get('button[id^="go-live-"]').contains('Go Live').should('be.visible').click()
});

When("I start the event", () => {
    
});

Then("Host should move to a page showing the current question tenants are viewing", () => {
    
});

And("Users should move to a page and be able to see and answer the first question of the event", () => {
    
});