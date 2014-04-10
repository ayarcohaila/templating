import {TemplateDirective} from '../../src/annotations';
import {Injector} from 'di';
import {Inject} from 'di';
import {View, ViewPort} from '../../src/view';
import {ViewFactory} from '../../src/view_factory';


@TemplateDirective({
  selector: '[ng-if]',
  exports: ['ngIf']
})
export class NgIf {
  @Inject(ViewFactory, ViewPort, View, Injector)
  constructor(viewFactory, viewPort, parentView, injector) {
    this.viewPort = viewPort;
    this.viewFactory = viewFactory;
    this.injector = injector;
    this.parentView = parentView;
    this._ngIf = null;
    this.view = null;
  }
  get ngIf() {
    return this._ngIf;
  }
  set ngIf(value) {
    if (typeof value === 'string') {
      // parse initial attribute
      value = value === 'true';
    }
    this._ngIf = value;
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
