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
});
