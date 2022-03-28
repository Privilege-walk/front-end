Given('I open the signup page', () => {
    cy.visit('/signup/');
})

When('I Enter a valid First Name, Last Name, Username, Email, and Password', () => {
    var random_stuff = btoa(Math.random().toString()).substr(10, 5);

    cy.get('input[id="firstName"]').type("James");
    cy.get('input[id="lastName"]').type("Bond");
    cy.get('input[id="username"]').type(random_stuff);
    cy.get('input[id="password"]').type("queens_secret_700");
    cy.get('input[id="email"]').type(random_stuff + "@example.com");
})

And('I click on the {string} button', (button_text) => {
    cy.get('button[type="submit"]').contains(button_text).should('be.visible').click();
})

Then('I should be taken to the {string} page for me to be able to login', (page_name) => {
    cy.url().should('include', page_name);
})