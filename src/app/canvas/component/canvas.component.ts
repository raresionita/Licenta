import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {canvas,canvasBack,setCanvas,setCanvasBack} from '../shared/init-canvas'
import 'fabric';
import Graph from '../shared/graph';
import { actionType,objectSelected,setSelected} from '../shared/canvas.functions';

declare const fabric: any;
var id = 0
var weight = 5

@Component({
    selector:'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['../style/canvas.component.css']
})


export class CanvasComponent implements OnInit{
    @ViewChild('container',{static:true}) containerRef: ElementRef;

    ngOnInit(){

      setCanvas(new fabric.Canvas('canvas1'))
      setCanvasBack(new fabric.Canvas('canvas2'))

      canvas.on({
        'object:selected': this.onObjectSelected,
        'object:moving': this.onObjectMoving,
        'mouse:down': this.onMouseDown
      })


      window.addEventListener('resize', this.onResize,false)
      this.onResize()
    }

    onResize = () => {
      const width = this.containerRef.nativeElement.offsetWidth
      const height = this.containerRef.nativeElement.offsetHeight
      canvas.setWidth(width)
      canvas.setHeight(height)
      canvasBack.setWidth(width)
      canvasBack.setHeight(height)
    }

    onMouseDown = (event) => {
      switch(actionType){
        case 0:
          if(!objectSelected) {
            Graph.addCircle(event,id++)
          } else {
            canvas.discardActiveObject()
          }
          break
        case 1:
          (!objectSelected) ? Graph.connectIfTwo(weight) : canvas.discardActiveObject();
          break
        }
    }


    onObjectSelected = (event) => {
      if(actionType != 0){
        setSelected(event.target)
      }
      if(actionType == 1){
        Graph.selectCircle(event.target.id,weight)
      }
    }

    onObjectMoving = (event) => {
        Graph.updateEdges()
    }
}

const resetCanvas = () => {
  Graph.selected = []
  Graph.edges = []
  id = 0;
}

const CanvasVar = new CanvasComponent();

export default CanvasVar;
export {resetCanvas}
