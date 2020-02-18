import { Component } from "@angular/core";
import { clearCanvas, canvas } from '../canvas/shared/init-canvas';
import 'fabric';
import { resetCanvas } from '../canvas/component/canvas.component';
import { setAction } from '../canvas/shared/canvas.functions';
import { MatDialog } from '@angular/material';
import { Dialog, setDialog } from '../dialog/dialog.functions';
import GraphVar from '../canvas/shared/graph';
import {MessageService} from 'primeng/api';


var json_data:any

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    providers: [MessageService],
})

export class NavBarComponent{

  uploadedFiles
  constructor(private messageService: MessageService,public dialog: MatDialog){
    setDialog(new Dialog(dialog))
  }

  confirmClear() {
    clearCanvas()
    resetCanvas()
  }

  addVertex(){
    setAction(0)
    GraphVar.resetGraphColorSelected()
  }

  connectVertex(){
    setAction(1)
  }

  defaultSelected(){
    setAction(2)
    GraphVar.resetGraphColorSelected()
  }

  removeObject(){
    setAction(3)
    GraphVar.resetGraphColorSelected()
  }

  import(){

    canvas.loadFromJSON(JSON.parse(json_data), function(obj) {
      canvas.renderAll();
       console.log(' this is a callback. invoked when canvas is loaded!xxx ');

      canvas.forEachObject(function(obj){
        console.log(obj.name);
        canvas.add(obj);
      });


    });
  }

  onBasicUploadAuto(event) {
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
}


  export(){
    GraphVar.exportToFile()
  }
}
//https://codepen.io/telember/pen/sDjxt

export default NavBarComponent
