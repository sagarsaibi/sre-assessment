Feature: As a user I should be able to list one item by ID

Scenario: List items when ToDo list is empty
    Given When the list is empty
    When User lists ToDo items with ID
    Then Empty list is displayed with error message

Scenario: List items with ToDO list has items
    Given When the list has items
    When User lists ToDo items with ID
    Then Item is displayed with success

Scenario: List items with incorrect ID
    Given When the list has items
    When User lists ToDo items with wrong ID
    Then Error message is displayed