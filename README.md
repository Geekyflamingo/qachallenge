This is a repo that tests the UI for the site http://todomvc.com/examples/angular2/. Author issues and bugs are found under issues in github.

## Installation:
	clone repo
	npm install
	webdriver-manager update
	webdriver-manager start
	protractor conf.js

## Test cases:

| Test Case ID  | Test Scenario | Test Steps | Test Data | Expected | Actual | Pass/Fail |
|:-------------:|:-------------:|:----------:|:---------:|:--------:|:------:|:---------:|
| T001		| Create Todo :happypath: | <ol><li>Go to site (http://todomvc.com/examples/angular2/)</li><li>Click on input.</li><li>Type a todo.</li><li>Hit ENTER</li></ol> |
| T002	      	| Create Todo :sadpath:      |  <ol><li>Go to site (http://todomvc.com/examples/angular2/)</li><li>Click on input.</li><li>Hit ENTER</li><li>Hit space</li><li>Hit ENTER</li></ol> |
| T003          | Edit a Todo      |    <ol> <li> Test case T001</li> <li> Double Click on a todo</li> <li> Click on todo</li> <li> change input</li> <li> Hit ENTER</li></ol>|
| T004		| Delete a Todo | <ol> <li> Test case T001</li> <li> Hover over a todo</li> <li> Click on the x</li></ol> |
| T005	      	| Check off a Todo      |   <ol> <li> Test case T001</li> <li> click on circle of a todo</li> <li> observe it gets striked out</li></ol> |
| T006          | Clear Completed Todos      |   <ol> <li> Test case T001</li> <li> Test case T005</li> <li> click on Clear Completed</li> <li> click on triangle to select all todos.</li> <li> click on Clear Completed to clear all.</li></ol> |



Test Data:
	input = {normal length, long length, weird characters, space before characters}
Expected Result: Todos are added to the page.
Actual Result: As Expected
Pass/Fail: Pass

Test Data:
	input = {empty, empty string, only spaces}
Expected Result: Todos are not added to the page.
Actual Result: As Expected
Pass/Fail: Pass

Test Data:
	edit = {add characters, remove characters and change, remove characters}
Expected Result: Todos are edited except if they are an empty string.
Actual Result: As Expected
Pass/Fail: Pass


Test Data: T001
Expected Result: Todos are deleted when the x is clicked.
Actual Result: As Expected
Pass/Fail: Pass


Test Data: T001
Expected Result: Todos are marked as complete when the circle is clicked.
Actual Result: As Expected
Pass/Fail: Pass


Test Data: T001
Expected Result: Todos are marked as complete when the triangle is clicked and removed when Clear Completed is clicked.
Actual Result: As Expected
Pass/Fail: Pass
