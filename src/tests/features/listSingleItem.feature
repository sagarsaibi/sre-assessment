Feature: As a user I should be able to list one item by ID

Scenario: List items with list is empty
    Given When the list is empty
    When User lists ToDo items with ID
    Then Empty list is displayed with error message

Scenario: List items with list is has items
    Given When the list has items
    When User lists ToDo items with ID
    Then Item list is displayed with success

Scenario: List items with list is has items
    Given When the list has items
    When User lists ToDo items with wrong ID
    Then Item list is displayed with error message