Given('I open questions page', () => {
    cy.visit('/login');
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('password-bdd')
    cy.get('button[type="submit"]').contains('Login').should('be.visible').click()
    cy.get('div[id="eventsPageId"]').should('exist');
    cy.get('input[id="new-event-name"]').type('Christmas eve event')
    cy.get('button[type="submit"]').contains('Create Event').should('be.visible').click()
    cy.get('button[type="button"]').contains('Edit').should('be.visible').click()
})
When('I enter a question {string} and two options {string} and {string}', (question, option1, option2) => {
    cy.get('input[id="new-question-name"]').type(question);
    cy.get('input[id="new-option-desc-0"]').type(option1);
    cy.get('input[id="new-option-points-0"]').type('+1');
    cy.get('button[id="add-0"]').contains('Add').should('be.visible').click()
    cy.get('input[id="new-option-desc-1"]').type(option2);
    cy.get('input[id="new-option-points-1"]').type('-1');
    cy.get('button[id="add-1"]').contains('Add').should('be.visible').click()
})
And('I click on create question', () => {
    cy.get('button[type="submit"]').contains('Create Question').should('be.visible').click()
})
Then('I should see the question {string} and options {string} and {string}', (question, option1, option2) => {
    cy.get('table').contains('p',question).should('be.visible');
    // cy.get('table').contains('input[value="'+option1+'"]').should('be.visible');
    // cy.get('table').contains('input[value="'+option2+'"]').should('be.visible');
})
And('I edit {string} option to {string}', (option1, option2) => {
    cy.get('input[id="new-option-desc-1"]').should('have.value', option1);
    cy.get('button[id="edit-1"]').contains('Edit').should('be.visible').click()
    cy.get('input[id="new-option-desc-1"]').type(option2);
    cy.get('button[id="add-1"]').contains('Submit').should('be.visible').click()
})

When('I enter a question {string} and one option {string}', (question, option) => {
    cy.get('input[id="new-question-name"]').type(question);
    cy.get('input[id="new-option-desc-0"]').type(option);
    cy.get('input[id="new-option-points-0"]').type('+1');
    cy.get('button[id="add-0"]').contains('Add').should('be.visible').click()
})
And('I click on delete button', () => {
    cy.get('button[id="delete-0"]').contains('Delete').should('be.visible').click()
})

When('I enter a blank question', () => {
    cy.get('input[id="new-question-name"]').type('  ');
})
When('I enter a question {string} and no option', (question) => {
    cy.get('input[id="new-question-name"]').type(question);
    cy.get('input[id="new-option-desc-0"]').type('Good');
})

Then('I should not be able to create question', () => {
    cy.get('button[type="submit"]').contains('Create Question').should('be.disabled')
})

Then('I should not be able to create option', () => {
    cy.get('button[id="add-0"]').contains('Add').should('be.disabled')
})