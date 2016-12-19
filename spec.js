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
});

describe('Todo Destroy', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  var input = element(by.css('.new-todo'));

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

describe('Checking off Todos', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  it('should strike through todo when circle is clicked', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var toggle = element.all(by.css('.toggle')).first()

    expect(todoList.count()).toEqual(5);

    browser.actions().click(toggle).perform();

    expect(element.all(by.css('.todo-list li')).first().getAttribute('class')).toBe('completed');

    expect(element.all(by.css('.completed label')).first().getCssValue('text-decoration')).toEqual('line-through');

  });

  it('should unstrike todo when circle is clicked when already selected ', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var toggle = element.all(by.css('.toggle')).first()

    expect(todoList.count()).toEqual(5);

    browser.actions().click(toggle).perform();

    expect(element.all(by.css('.todo-list li')).first().getAttribute('class')).not.toBe('completed');
    expect(element.all(by.css('.view label')).first().getCssValue('text-decoration')).toEqual('none');

  });
});

describe('Clearing completed todos', function() {
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angular2/');
  });

  it('should show how many more items are left to be completed', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var toggle = element.all(by.css('.toggle')).first()

    expect(todoList.count()).toEqual(5);
    expect(element(by.css('.todo-count')).getText()).toEqual('5 items left')

    browser.actions().click(toggle).perform();

    expect(element.all(by.css('.todo-list li')).first().getAttribute('class')).toBe('completed');

    expect(element.all(by.css('.completed label')).first().getCssValue('text-decoration')).toEqual('line-through');

    expect(element(by.css('.todo-count')).getText()).toEqual('4 items left')

  });

  it('should select all todos as completed when triangle is clicked', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var toggleAll = element(by.css('.toggle-all'));

    expect(todoList.count()).toEqual(5);

    browser.actions().click(toggleAll).perform();

    var list = element.all(by.css('.todo-list li'))
    for (c = 0; c< list.count-1; c++){ expect(list.get(c).getAttribute('class')).toBe('completed') };
    var strikes = element.all(by.css('.view label'))
    for(c = 0; c< strikes.count-1; c++){ expect(strikes.get(c).getCssValue('text-decoration')).toEqual('line-through') };

    expect(element(by.css('.todo-count')).getText()).toEqual('0 items left');

  });

  it('should unselect all todos as completed when triangle is clicked', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var toggleAll = element(by.css('.toggle-all'));

    expect(todoList.count()).toEqual(5);

    browser.actions().click(toggleAll).perform();

    var list = element.all(by.css('.todo-list li'))
    for (c = 0; c< list.count-1; c++){ expect(list.get(c).getAttribute('class')).not.toBe('completed') };
    var strikes = element.all(by.css('.view label'))
    for(c = 0; c< strikes.count-1; c++){ expect(strikes.get(c).getCssValue('text-decoration')).toEqual('none') };

    expect(element(by.css('.todo-count')).getText()).toEqual('5 items left')
  });

  it('should clear completed todos when \'Clear Completed\' is clicked', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var togglefirst = element.all(by.css('.toggle')).first();
    var togglesecond = element.all(by.css('.toggle')).get(2);
    var togglelast = element.all(by.css('.toggle')).last();

    expect(todoList.count()).toEqual(5);

    browser.actions().click(togglefirst).perform();
    browser.actions().click(togglesecond).perform();
    browser.actions().click(togglelast).perform();

    var list = element.all(by.css('.todo-list li'))
    for (c = 0; c< list.count-1; c++){ expect(list.get(c).getAttribute('class')).toBe('completed') };
    var strikes = element.all(by.css('.view label'))
    for(c = 0; c< strikes.count-1; c++){ expect(strikes.get(c).getCssValue('text-decoration')).toEqual('line-through') };

    expect(element(by.css('.todo-count')).getText()).toEqual('2 items left');

    browser.actions().click(element(by.css('.clear-completed'))).perform();

    expect(element(by.css('.todoapp'))).not.toContain(todoList);

  });

  it('should select all todos as completed when triangle is clicked and then remove them all when \'Clear Completed\' is clicked', function(){

    var todoList = element.all(by.css('.view label'));
    var first = todoList.first();
    var toggleAll = element(by.css('.toggle-all'));

    expect(todoList.count()).toEqual(2);

    browser.actions().click(toggleAll).perform();

    var list = element.all(by.css('.todo-list li'))
    for (c = 0; c< list.count-1; c++){ expect(list.get(c).getAttribute('class')).toBe('completed') };
    var strikes = element.all(by.css('.view label'))
    for(c = 0; c< strikes.count-1; c++){ expect(strikes.get(c).getCssValue('text-decoration')).toEqual('line-through') };

    expect(element(by.css('.todo-count')).getText()).toEqual('0 items left');

    browser.actions().click(element(by.css('.clear-completed'))).perform();

    expect(element(by.css('.todoapp'))).not.toContain(todoList);

  });
});
