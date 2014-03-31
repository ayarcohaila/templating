import {assert} from 'rtts-assert';

class DirectiveArgs {
  static assert(obj) {
    if (obj.selector) {
      assert(obj.selector).is(assert.string);
    }
    if (obj.exports) {
      assert(obj.exports).is(assert.arrayOf(assert.string));
    }
  }
}

export class Directive {
  constructor(data:DirectiveArgs=null) {
    if (data) {
      for (var prop in data) {
        this[prop] = data[prop];
      }    
    }    
  }
}

export class DecoratorDirective extends Directive {
  constructor(data:DirectiveArgs=null) {
    super(data);
  }
}

export class TemplateDirective extends Directive {
  constructor(data:DirectiveArgs=null) {
    super(data);
  }
}

class ComponentArgs {
  static assert(obj) {
    DirectiveArgs.assert(obj);
    if (obj.template) {
      // TODO: this should be: assert(obj).is(ViewFactoryPromise).
      // Can't use this here as:
      // - importing ViewFactory into annotations would lead to cyclic type dependencies
      assert(obj.template).is(Object);
    }
  }
}

export class ComponentDirective extends Directive {
  constructor(data:ComponentArgs=null) {
    super(data);   
  }
}
