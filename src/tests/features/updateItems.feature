Feature: As a user I should be update existing items description and status

Scenario: User is able to update description of and item
    Given When the list is has items
    When User updates description of the items
    Then Item description is updated successfully


Scenario: User is able to update status of and item
    Given When the list is has items
    When User updates status of the items
    Then Item status is updated successfully
