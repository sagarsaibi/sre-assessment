Feature: As a user I should be able to list all the items

Scenario: List items with list is empty
    Given When the list is empty
    When User lists ToDo items
    Then Empty list is displayed with success

Scenario: List items with list is has items
    Given When the list has items
    When User lists ToDo items
    Then Item list is displayed with success