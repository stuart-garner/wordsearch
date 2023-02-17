import React from "react";
import * as PIXI from "pixi.js";

type GridPropsType = {
  data: any;
  grigSize: number;
  words: any;
  onDragStart: (item: any) => void;
  onDragStop: (item: any) => void;
};

class Grid extends React.Component<GridPropsType> {
  app: any;
  gridRef: any;
  squareSize: number;
  isDragging: any;
  mainContainer: any;
  selectLine: any;
  foundLines: any;
  constructor(props: any) {
    super(props);
    this.gridRef = React.createRef();
    this.app = null;
    this.squareSize = 50;
    this.isDragging = null;
    this.mainContainer = null;
    this.selectLine = new PIXI.Graphics();
    this.foundLines = new PIXI.Graphics();
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    this.app = new PIXI.Application<any>({
      width: this.squareSize * this.props.grigSize,
      height: this.squareSize * this.props.grigSize,
      background: "0x666666",
      resolution: 1,
      antialias: false,
    });

    this.mainContainer = new PIXI.Container();
    this.app.stage.addChild(this.mainContainer);
    this.gridRef.current.appendChild(this.app.view);
    let posX: number = 0;
    let posY: number = 0;

    this.props.data.forEach((item: any) => {
      const square = new PIXI.Container();
      square.interactive = true;
      square.x = posX;
      square.y = posY;
      item.centerX = posX + this.squareSize / 2;
      item.centerY = posY + this.squareSize / 2;
      square.on("pointerdown", () => {
        this.isDragging = item;
        this.props.onDragStart(item);
      });
      square.on("pointerup", () => {
        this.isDragging = null;
        this.props.onDragStop(item);
        this.selectLine.clear();
      });
      const text = item.letter === "" ? "" : item.letter.toUpperCase();
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0x989898);
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
      this.mainContainer.addChild(square);

      if (posX === this.squareSize * this.props.grigSize) {
        posX = 0;
        posY += this.squareSize;
      }
    });

    this.mainContainer.addChild(this.selectLine);
    this.mainContainer.addChild(this.foundLines);
    this.mainContainer.on("mousemove", this.onMouseMove);
  }

  onMouseMove(event: any) {
    if (this.isDragging) {
      this.selectLine.clear();
      this.selectLine.lineStyle({
        width: 35,
        color: 0xffff00,
        alpha: 0.5,
        cap: PIXI.LINE_CAP.ROUND,
      });
      this.selectLine.moveTo(this.isDragging.centerX, this.isDragging.centerY);
      this.selectLine.lineTo(event.data.global.x, event.data.global.y);
      this.mainContainer.addChild(this.selectLine);
    }
  }

  shouldComponentUpdate(nextProps: GridPropsType) {
    if (nextProps.words !== this.props.words) {
      this.foundLines.clear();
      nextProps.words.forEach((item: any) => {
        if (item.found) {
          this.foundLines.lineStyle({
            width: 35,
            color: 0xff00ff,
            alpha: 0.5,
            cap: PIXI.LINE_CAP.ROUND,
          });
          const start = item.selectedSpace[0];
          const end = item.selectedSpace[item.selectedSpace.length - 1];
          this.foundLines.moveTo(
            this.props.data[start].centerX,
            this.props.data[start].centerY
          );
          this.foundLines.lineTo(
            this.props.data[end].centerX,
            this.props.data[end].centerY
          );
        }
      });
    }
    return false;
  }

  render() {
    return <div ref={this.gridRef}></div>;
  }
}

export default Grid;
