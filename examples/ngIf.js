import {TemplateDirective} from 'templating';
import {Injector} from 'di';
import {Inject} from 'di';
import {View, ViewPort} from 'templating';
import {ViewFactory} from 'templating';

@TemplateDirective({
  selector: '[ng-if]',
  observe: {'ngIf': 'ngIfChanged'},
  bind: {'ngIf': 'ngIf'}
})
export class NgIf {
  @Inject(ViewFactory, ViewPort, View, Injector)
  constructor(viewFactory, viewPort, parentView, injector) {
    this.viewPort = viewPort;
    this.viewFactory = viewFactory;
    this.injector = injector;
    this.parentView = parentView;
    this.view = null;
  }
  ngIfChanged(value) {
    if (typeof value === 'string') {
      // parse initial attribute
      value = value === 'true';
    }
    if (!value && this.view) {
      this.viewPort.remove(this.view);
      this.view = null;
    }
    if (value) {
      this.view = this.viewFactory.createChildView(this.injector, this.parentView.executionContext);
      this.viewPort.append(this.view);
    }
  }
}
