Given('I am an existing user', () => {
    cy.visit('/signup/');
    cy.get('input[id="firstName"]').type("abc");
    cy.get('input[id="lastName"]').type("xyz");
    cy.get('input[id="password"]').type("abcxyz");
})

When('I try to use the same {string} to sign-up again', (repeated_field) => {

    var random_stuff = btoa(Math.random().toString()).substr(10, 5);

    if(repeated_field == "username")
    {
        cy.get('input[id="username"]').type("howdyman");
        cy.get('input[id="email"]').type(random_stuff + "@example.com");
    }
    else
    {
        cy.get('input[id="username"]').type(random_stuff);
        cy.get('input[id="email"]').type("howdyman@ut.edu");
    }
})

Then('I should receive an error message saying {string}', (error_msg_content) => {
    cy.get('div[data-testid="signupErrorId"]').contains(error_msg_content).should('be.visible');
})