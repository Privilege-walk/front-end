Given('The host shows me a link to join an event', () => {
    cy.visit('/qrcode');
})

When('I visit the link given', () => {
    cy.get('a[id="urlToJoin"]').click();
})

Then('I should be taken to the welcome page for the event', ()=> {
    cy.url().should('include', '/welcome');
    cy.get('div[id="eventName"]').should("not.have.text", "");
    cy.get('div[id="eventDescription"]').should("not.have.text", "");
})