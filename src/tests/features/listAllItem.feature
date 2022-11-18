@list
Feature: As a user I should be able to list all the items

@smoke
@positive
Scenario: List items with ToDo list is has items
    Given When the list is empty
    When User creates few items
    Then Item list is displayed successfully

@positive
Scenario: List items with ToDo list is empty
    Given When the list is empty
    When User lists ToDo items
    Then Empty list is displayed successfully
