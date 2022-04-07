Feature: Walk Questionnaire

    Scenario: Answer question as a user. 
        Given I am on the walk questionnaire
        When I answer a question 
        Then I should see text explaining that I am waiting for host 
