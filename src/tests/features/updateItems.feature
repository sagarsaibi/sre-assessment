Feature: As a user I should be able to update existing items description and status in ToDo List

Scenario: User is able to update description of ToDo item
    Given When the list has items to update
    When User updates description of the items
    Then Item description is updated successfully


Scenario: User is able to update status of and item
    Given When the list has items to update
    When User updates status of the items
    Then Item status is updated successfully
