@list
Feature: As a user I should be able to list one item by ID

@negative
Scenario: List items when ToDo list is empty
    Given When the list is empty
    When User lists ToDo items with ID
    Then Error message is displayed

@smoke @positive
Scenario: List items with ToDO list has items
    Given When the list has items
    When User lists ToDo items with ID from list
    Then Item is displayed with success

@negative
Scenario: List items with incorrect ID
    Given When the list has items
    When User lists ToDo items with wrong ID
    Then Error message is displayed for wrong ID