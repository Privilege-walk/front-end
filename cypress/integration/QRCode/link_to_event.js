Given('The host shows me a link to join an event', () => {
    cy.visit('/login');
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('password-bdd')
    cy.get('button[type="submit"]').contains('Login').should('be.visible').click()
    cy.get('button[id^="go-live-"]').contains('Go Live').should('be.visible').click()
})

When('I visit the link given', () => {
    cy.get('a[id="urlToJoin"]').click();
})

Then("I should see text explaining that I am waiting for host", () => {
    cy.contains("Waiting for host ...");
});