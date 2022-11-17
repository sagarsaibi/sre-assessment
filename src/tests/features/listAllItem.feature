Feature: As a user I should be able to list all the items

Scenario: List items with ToDo list is empty
    Given When the list is empty
    When User lists ToDo items
    Then Empty list is displayed successfully

Scenario: List items with ToDo list is has items
    Given When the list has items
    When User lists ToDo items
    Then Item list is displayed successfully