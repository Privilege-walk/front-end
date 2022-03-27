Feature: Login

    I want to login to the app

    Scenario: App login
        Given I open login page
        When I type in username and password
        And I click on Login button
        Then I should see the events page

    Scenario: App login with wrong username
        Given I open login page
        When I type in wrong username and password
        And I click on Login button
        Then I should see the error message
        
    Scenario: App login with wrong password
        Given I open login page
        When I type in username and wrong password
        And I click on Login button
        Then I should see the error message