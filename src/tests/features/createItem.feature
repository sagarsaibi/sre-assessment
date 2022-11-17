Feature: As a user I should be able to create a new item in ToDo list

Scenario: Create new item when list is empty
    Given When the ToDo list is empty
    When User creates a new ToDo item
    Then A new item is created in the list

Scenario: Create new item with no description
    Given When the ToDo list is empty
    When User creates a new ToDo item without description
    Then A new item is not created

Scenario: Create new item with duplicate data
    Given When the ToDo list is empty
    When User creates a new ToDo item with duplicate description
    Then A new item is created in the list
    And When user create item with same description
    Then Item is is not created

Scenario: Create new item with same description as of the completed task
    Given When the ToDo list is empty
    When User creates a new ToDo item with duplicate description
    Then A new item is created in the list
    When User marks the task as completed with the description
    And  When user create item with same description
    Then A new item is created in the list

Scenario Outline: Create new item with speacial character
    Given When the ToDo list is empty
    When User creates a new ToDo item with "<description>"
    Then A new item is created in the list
Examples:
    | description |
    | descriptionWith~ |

Scenario Outline: Create new item with long characters string
    Given When the ToDo list is empty
    When User creates a new ToDo item with "<description>"
    Then A new item is created in the list
Examples:
    | description |
    | d |
    | small |
    | medium |
    | bigdescription |
    | longdescriptionnnnnnnnnnnnnnnnnnnnn |
    | verrrrrryverrrrrrrrylonnnnnnngdescriptionnnnnnnnnnnnnnnnnnnnn |