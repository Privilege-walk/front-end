Feature: Events 

    I want to create and see all my events

    Scenario: Create new event successful
        Given I open events page
        When I type a new event name 
        And I click on create event button
        Then I should see the new event created 