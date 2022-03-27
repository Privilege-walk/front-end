Feature: Questions

    I want to add questions to an event

    Scenario: Create new question successfully
        Given I open questions page
        When I enter a question and options
        And I click on create question
        Then I should see the question

    Scenario: Validate create questions button
        Given I open questions page
        When I enter a blank question
        Then I should not be able to create question
        
    Scenario: Validate add options button
        Given I open questions page
        When I enter a question and no option
        Then I should not be able to create option