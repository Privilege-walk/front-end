Feature: SignUp

  I want to sign-up for using the app

  Scenario: Successful Sign-up
    Given I open the signup page
    When I Enter a valid First Name, Last Name, Username, Email, and Password
    And I click on the "Sign Up" button
    Then I should be taken to the "login" page for me to be able to login

  Scenario: Invalid email entry
    Given I open the signup page
    When I enter an invalid email such as "howdy.com"
    Then I should be notified that I have entered an "Invalid email address"

  Scenario: Username already exists
    Given I am an existing user
    When I try to use the same "username" to sign-up again
    And I click on the "Sign Up" button
    Then I should receive an error message saying "username exists"

  Scenario: Email already exists
    Given I am an existing user
    When I try to use the same "email" to sign-up again
    And I click on the "Sign Up" button
    Then I should receive an error message saying "email exists"
