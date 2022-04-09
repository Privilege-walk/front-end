Given('The host shows me a link to join an event', () => {
    cy.visit('/login');
    cy.get('input[id="username-input"]').type('username-bdd')
    cy.get('input[id="password-input"]').type('password-bdd')
    cy.get('button[type="submit"]').contains('Login').should('be.visible').click()
    cy.visit('/host/walk/7');
})

When('I visit the link given', () => {
    cy.get('a[id="urlToJoin"]').click();
})

Then('I should be taken to the welcome page for the event', ()=> {
    cy.get('div[id="eventName"]').should("not.have.text", "");
    cy.get('div[id="eventDescription"]').should("not.have.text", "");
})