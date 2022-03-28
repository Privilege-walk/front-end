Feature: Questions

    I want to add questions to an event

    Scenario: Create new question successfully
        Given I open questions page
        When I enter a question "Question-1" and two options "op-1" and "op-2"
        And I click on create question
        Then I should see the question "Question-1" and options "op-1" and "op-2"

    Scenario: Edit option successfully
        Given I open questions page
        When I enter a question "Question-2" and two options "op-3" and "op-4"
        And I edit "op-4" option to "op-5"
        And I click on create question
        Then I should see the question "Question-2" and options "op-3" and "op-5"

    Scenario: Delete option successfully
        Given I open questions page
        When I enter a question "Question-1" and two options "op-1" and "op-2"
        And I click on delete button
        Then I should not be able to create question

    Scenario: Validate number of options is more than one
        Given I open questions page
        When I enter a question "Question-1" and one option "op-1"
        Then I should not be able to create question

    Scenario: Validate create questions button
        Given I open questions page
        When I enter a blank question
        Then I should not be able to create question
        
    Scenario: Validate add options button
        Given I open questions page
        When I enter a question "Question-1" and no option
        Then I should not be able to create option