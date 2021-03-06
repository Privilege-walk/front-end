Given("I open events page", () => {
    cy.visit('/login');
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('password-bdd')
    cy.get('button[type="submit"]').contains('Login').should('be.visible').click()
    cy.get('div[id="eventsPageId"]').should('exist');
})

When('I type a new event name', () => {
    cy.get('input[id="new-event-name"]').type('Christmas eve event')
    cy.get('input[id="x-label-min"]').type('Least gifts')
    cy.get('input[id="x-label-min"]').type('Most gifts')
})

And('I click on create event button', () => {
    cy.get('button[type="submit"]').contains('Create Event').should('be.visible').click()
})

Then('I should see the new event created', () => {
    cy.get('table').contains('p','Christmas eve event').should('be.visible');
})