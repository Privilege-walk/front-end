Feature: QRCode

    I want to be given a link I can use to join an event.

    Scenario: Join privilege walk event. 
        Given The host shows me a link to join an event 
        When I visit the link given
        Then I should be taken to the welcome page for the event 
 