Given('I open login page', () => {
    cy.visit('/');
})
When('I type in username and password', () => {
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('password-bdd')
})
And('I click on Login button', () => {
    cy.get('button[type="submit"]').contains('Login').should('be.visible').click()
})
Then('I should see the welcome text', () => {
    cy.get('.welcome').should('exist');
})

When('I type in username and wrong password', () => {
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('passwordbdd')
})
When('I type in wrong username and password', () => {
    cy.get('input[id="username-input"]').type('usernambdd')
    cy.get('input[id="password-input"]').type('password-bdd')
})

Then('I should see the error message', () => {
    cy.get('div[data-testid="loginErrorId"]').should('have.text', 'Please check your username or password!');
})