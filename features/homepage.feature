Feature: 99.co Homepage UI Automation
  Scenario: Capture all homepage UI locators
    Given the 99.co app is open
    When I scan the homepage UI
    Then the homepage UI hierarchy should be saved
