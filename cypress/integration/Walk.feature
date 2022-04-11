Feature: Walk Questionnaire

    # Scenario: Answer question as a user. 
    #     Given I am on the walk questionnaire
    #     When I answer a question 
    #     Then I should see text explaining that I am waiting for host 

    Scenario: Be able to start the event
        Given I create an event and add Questions and click on go live
        When I start the event
        Then Host should move to a page showing the current question tenants are viewing
        And Users should move to a page and be able to see and answer the first question of the event