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

describe('Todo Edit', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  var input = element(by.css('.new-todo'));

  it('should be able to edit and add characters a todo.', function(){

    'Edit me'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));
    var fourth = todoList.get(4);
    expect(todoList.count()).toEqual(5);

    browser.actions().doubleClick(fourth).perform();
    var edit = element(by.css('.edit'));
    browser.actions().click(edit).perform();

    ' please'.split('').forEach((c) => edit.sendKeys(c))
    edit.sendKeys(protractor.Key.ENTER);

    expect(fourth.getText()).toEqual('Edit me please');
  });

  it('should be able to edit and completely change a todo.', function(){

    var todoList = element.all(by.css('.view label'));
    var fourth = todoList.get(4);
    var text = fourth.getText().toString();

    browser.actions().doubleClick(fourth).perform();
    var edit = element(by.css('.edit'));
    browser.actions().click(edit).perform();

    text.split('').forEach((c) => edit.sendKeys(protractor.Key.BACK_SPACE));

    'My edited todo'.split('').forEach((c) => edit.sendKeys(c))
    edit.sendKeys(protractor.Key.ENTER);

    expect(fourth.getText()).toEqual('My edited todo');
  });

  it('should be remove a todo when you edit it to have an empty string.', function(){

    'Delete me through edit'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));
    var fifth = todoList.get(5);
    var text = fifth.getText().toString();

    expect(todoList.count()).toEqual(6);

    browser.actions().doubleClick(fifth).perform();

    var edit = element(by.css('.edit'));

    edit.clear();

    edit.sendKeys(protractor.Key.ENTER);

    expect(todoList.count()).toEqual(5);
    });

describe('Todo Destroy', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  it('should remove todo when clicking on the x', function(){

    'Delete me'.split('').forEach((c) => input.sendKeys(c))
    input.sendKeys(protractor.Key.ENTER);

    var todoList = element.all(by.css('.view label'));
    var fifth = todoList.get(5);

    expect(todoList.count()).toEqual(6);

    browser.actions().mouseMove(fifth).perform();
    element.all(by.css('.destroy')).get(5).click();

    expect(todoList.count()).toEqual(5);
  });
});

});
