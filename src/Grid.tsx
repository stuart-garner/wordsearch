import React from "react";
import * as PIXI from "pixi.js";

type GridPropsType = {
  data: any;
  grigSize: number;
  onDragStart: (item: any) => void;
  onDragStop: (item: any) => void;
};

class Grid extends React.Component<GridPropsType> {
  app: any;
  gridRef: any;
  squareSize: number;
  isDragging: boolean;
  constructor(props: any) {
    super(props);
    this.gridRef = React.createRef();
    this.app = null;
    this.squareSize = 50;
    this.isDragging = false;
  }

  componentDidMount() {
    this.app = new PIXI.Application<any>({
      width: this.squareSize * this.props.grigSize,
      height: this.squareSize * this.props.grigSize,
      background: "0x666666",
      resolution: 1,
      antialias: false,
    });

    let mainContainer = new PIXI.Container();
    this.app.stage.addChild(mainContainer);
    this.gridRef.current.appendChild(this.app.view);
    let posX: number = 0;
    let posY: number = 0;
    this.props.data.forEach((item: any) => {
      const square = new PIXI.Container();
      square.interactive = true;
      square.x = posX;
      square.y = posY;
      square.on("pointerdown", () => {
        this.isDragging = true;
        this.props.onDragStart(item);
      });
      square.on("pointerup", () => {
        this.isDragging = false;
        this.props.onDragStop(item);
      });
      const text = item.letter === "" ? "" : item.letter.toUpperCase();
      const graphics = new PIXI.Graphics();
      graphics.beginFill(item.letter === "" ? 0x989898 : 0xffff00);
      graphics.lineStyle(1, 0xaaaaaa);
      graphics.drawRect(0, 0, this.squareSize, this.squareSize);
      graphics.endFill();
      square.addChild(graphics);
      const basicText = new PIXI.Text(text);
      basicText.x = this.squareSize / 2;
      basicText.y = this.squareSize / 2;
      basicText.anchor.set(0.5);
      square.addChild(basicText);
      posX += this.squareSize;
      mainContainer.addChild(square);

      if (posX === this.squareSize * this.props.grigSize) {
        posX = 0;
        posY += this.squareSize;
      }
    });
  }

  shouldComponentUpdate(nextProps: GridPropsType) {
    return false;
  }

  render() {
    console.log("RENDER");
    return <div ref={this.gridRef}></div>;
  }
}

export default Grid;
