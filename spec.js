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

  it('should add a todo.', function() {
    'Build Doghouse'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));

    expect(todoList.count()).toEqual(1);
    expect(todoList.first().getText()).toEqual('Build Doghouse');
  });

  it('should add a really long todo.', function() {
    'this is my really really really long todo. I need to buy bananas lots and lots of bananas maybe some strawberries too. Make sure I get enough food for a very very fun party I am having. Let\'s pick up some beer while we are at it. Maybe several kinds'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));

    expect(todoList.count()).toEqual(2);
    expect(todoList.get(1).getText()).toEqual('this is my really really really long todo. I need to buy bananas lots and lots of bananas maybe some strawberries too. Make sure I get enough food for a very very fun party I am having. Let\'s pick up some beer while we are at it. Maybe several kinds');
  });

  it('should add a todo that has weird characters in it.', function() {
    '~`!@#%^&*()*}{:;'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));

    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('~`!@#%^&*()*}{:;');
  });

  it('should add a todo and strip leading spaces.', function() {
    ' A space was before this.'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));

    expect(todoList.count()).toEqual(4);
    expect(todoList.get(3).getText()).toEqual('A space was before this.');
  });
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
