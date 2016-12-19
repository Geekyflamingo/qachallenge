This is a repo that tests the UI for the site http://todomvc.com/examples/angular2/. Author issues and bugs are found under issues in github.

Installation:
	clone repo
	npm install
	webdriver-manager update
	webdriver-manager start
	protractor conf.js

Test cases:

Test Case ID: T001
Test Scenario: Create Todo :happypath:
Test Steps:
	1. Go to site (http://todomvc.com/examples/angular2/)
	2. Click on input.
	3. Type a todo.
	4. Hit ENTER
Test Data:
	input = {normal length, long length, weird characters, space before characters}
Expected Result: Todos are added to the page.
Actual Result: As Expected
Pass/Fail: Pass

Test Case ID: T002
Test Scenario: Create Todo :sadpath:
Test Steps:
	1. Go to site (http://todomvc.com/examples/angular2/)
	2. Click on input.
	4. Hit ENTER
	5. Hit space
	6. Hit ENTER
Test Data:
	input = {empty, empty string, only spaces}
Expected Result: Todos are not added to the page.
Actual Result: As Expected
Pass/Fail: Pass

Test Case ID: T003
Test Scenario: Edit a Todo
Test Steps:
	1. Test case T001
	2. Double Click on a todo
	3. Click on todo
	4. change input
	5. Hit ENTER
Test Data:
	edit = {add characters, remove characters and change, remove characters}
Expected Result: Todos are edited except if they are an empty string.
Actual Result: As Expected
Pass/Fail: Pass

Test Case ID: T004
Test Scenario: Delete a Todo
Test Steps:
	1. Test case T001
	2. Hover over a todo
	3. Click on the x
Test Data: T001
Expected Result: Todos are deleted when the x is clicked.
Actual Result: As Expected
Pass/Fail: Pass

Test Case ID: T005
Test Scenario: Check off a Todo
Test Steps:
	1. Test case T001
	2. click on circle of a todo
	3. observe it gets striked out
Test Data: T001
Expected Result: Todos are marked as complete when the circle is clicked.
Actual Result: As Expected
Pass/Fail: Pass

Test Case ID: T006
Test Scenario: Clear Completed Todos
Test Steps:
	1. Test case T001
	2. Test case T005
	3. click on Clear Completed
	4. click on triangle to select all todos.
	5. click on Clear Completed to clear all.
Test Data: T001
Expected Result: Todos are marked as complete when the triangle is clicked and removed when Clear Completed is clicked.
Actual Result: As Expected
Pass/Fail: Pass
