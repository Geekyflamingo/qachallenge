// spec.j
describe('Todo Creation :happypath:', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  var input = element(by.css('.new-todo'));

  it('should have an empty input when first hitting the page', function() {
    var value = input.getAttribute("value");
    expect(value).toEqual('');
  });

  it('should have a placeholder in the input field saying \'What needs to be done?\'', function() {
    var placeholder= input.getAttribute('placeholder');
    expect(placeholder).toEqual('What needs to be done?');
  });

  it('should add a todo', function() {
    'Build Doghouse'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));

    expect(todoList.count()).toEqual(1);
    expect(todoList.first().getText()).toEqual('Build Doghouse');
  });

  /* TODO
   Add more happypath tests
   1. long todos.
   2. weird characters
   3. space before string
  */
});


describe('Todo Creation :sadpath:', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  var input = element(by.css('.new-todo'));

  it('should not add a todo when input is blank', function() {
    input.sendKeys(protractor.Key.ENTER);
    var todoList = element(by.css('.todo-list'));
    expect(element(by.css('.todoapp'))).not.toContain(todoList);
  });

  it('should not add a todo when input has an empty string', function() {
    input.sendKeys('', protractor.Key.ENTER);
    var todoList = element(by.css('.todo-list'));
    expect(element(by.css('.todoapp'))).not.toContain(todoList);
  });

  it('should not add a todo when input has only spaces', function() {
    input.sendKeys('     ',protractor.Key.ENTER);
    var todoList = element(by.css('.todo-list'));
    expect(element(by.css('.todoapp'))).not.toContain(todoList);
  });


});
