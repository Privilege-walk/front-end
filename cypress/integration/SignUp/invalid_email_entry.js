When("I enter an invalid email such as {string}",
    (invalid_email) => {
        cy.get('input[id="email"]').type(invalid_email);
    }
)

Then(
    "I should be notified that I have entered an {string}",
    (error_text) => {
        cy.get('div[type="invalid"]').contains(error_text).should('be.visible');
    }
)