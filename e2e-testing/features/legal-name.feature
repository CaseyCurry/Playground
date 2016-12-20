Feature: Get User's Legal Name
  As an enrolling user
  I want provide my legal name when enrolling
  so that I can receive tax documents.

  @ContinuousIntegration
  Scenario: Display user's full name
    Given I open the url "http://localhost:9999/app.html"
    When I add "Casey" to the inputfield "#firstname"
    And I add "Curry" to the inputfield "#lastname"
    And I click on the element "#firstname"
    Then I expect that element "#fullname" contains the text "Casey Curr"
