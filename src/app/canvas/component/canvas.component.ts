import { Component, OnInit } from "@angular/core";
import {canvas,setCanvas} from '../shared/init-canvas'
import 'fabric';
import { newCircle,circles} from '../shared/canvasFunctions';
declare const fabric: any;

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    objectSelected = false
    id = 0;
    ngOnInit(){
      setCanvas(new fabric.Canvas('canvas'))

      canvas.on('selection:created', () => {
        this.objectSelected = true
      })
      canvas.on('selection:cleared',()=>{
        this.objectSelected = false
      })
      canvas.on('mouse:down', (event:any) => {
        console.log(this.objectSelected)
        if(!this.objectSelected)
          newCircle(event,this.id++);
        else
          canvas.discardActiveObject();
      });

      canvas.on('object:selected',(event) => {
        const obj = circles[event.target.id]
        obj.showPussy()
      });

    }

  }

//   canvas.getObjects().forEach(function(o) {
//     if(o.id == 'rekt') {
//         canvas.setActiveObject(o);
//         console.log(o.id)
//     }

// })
