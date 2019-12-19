import { Component } from "@angular/core";
import { canvas } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';

declare const fabric: any;

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})

export class NavBarComponent{
  
  confirmClear() {
    if (confirm('Are you sure?')) {
      canvas.clear();
    }
    resetCanvas()
  }

}
