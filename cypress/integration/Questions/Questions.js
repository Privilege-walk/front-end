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
When('I enter a question and options', () => {
    cy.get('input[id="new-question-name"]').type('How are you?');
    cy.get('input[id="new-option-desc"]').type('Good');
    cy.get('input[id="new-option-points"]').type('+1');
    cy.get('button[type="submit"]').contains('Add').should('be.visible').click()
})
And('I click on create question', () => {
    cy.get('button[type="submit"]').contains('Create Question').should('be.visible').click()
})
Then('I should see the question', () => {
    cy.get('table').contains('p','How are you?').should('be.visible');
})

When('I enter a blank question', () => {
    cy.get('input[id="new-question-name"]').type('  ');
})
When('I enter a question and no option', () => {
    cy.get('input[id="new-question-name"]').type('How are you?');
    cy.get('input[id="new-option-desc"]').type('Good');
})

Then('I should not be able to create question', () => {
    cy.get('button[type="submit"]').contains('Create Question').should('be.disabled')
})

Then('I should not be able to create option', () => {
    cy.get('button[type="submit"]').contains('Add').should('be.disabled')
})