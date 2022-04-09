Given("I am on the walk questionnaire", () => {
    cy.visit("/host/walk/7");
});

When("I answer a question", () => {
    cy.get('*[class*="choice"]').first().click();
});

Then("I should see text explaining that I am waiting for host", () => {
    cy.contains("Waiting for host ...");
});