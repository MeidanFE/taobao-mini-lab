//引入pixi引擎 
import * as PIXI from "@tbminiapp/pixi-miniprogram-engine"; 
// registerCanvas 注册canvas给PIXI 
const { registerCanvas, devicePixelRatio } = PIXI.miniprogram; 
Page({
  // 供pixi渲染的canvas
  pixiCanvas:null,
  // canvas的onReady事件侦听函数 onCanvasReady
  onCanvasReady() {
    // 建立canvas引用
    my._createCanvas({
      id: "canvas",
      success: (canvas) => {
        const systemInfo = my.getSystemInfoSync();  
        // 拿到当前设备像素密度
        const dpr = systemInfo.pixelRatio;
        // 拿到当前设备的宽高
        const windowWidth = systemInfo.windowWidth;
        const windowHeight = systemInfo.windowHeight;
        // 为canvas设定宽高（需要设备宽高* 像素密度）;
        canvas.width = windowWidth * dpr;
        canvas.height = windowHeight * dpr;
        this.pixiCanvas = canvas;
        //为pixi引擎注册当前的canvas  
        registerCanvas(canvas);   
        //初始化PIXI.Application  
       //计算application的宽高  
        const size = {
           width: canvas.width / devicePixelRatio,
           height: canvas.height / devicePixelRatio,  
        };  
        const context = canvas.getContext('2d'); 
       // canvas.getContext('webgl')  
        const app = new PIXI.Application({
           width: size.width,  
           height: size.height,  
           view: canvas,  
           context: context,  
           transparent: true,  
           // 强制使用2d上下文进行渲染，如果为flase,则默认使用webgl渲染  
           forceCanvas: true,  
           // 设置resolution 为像素密度  
           resolution: devicePixelRatio,  
         }); 

var container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
var texture = PIXI.Texture.fromImage('https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=920871798,3786644978&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=2634b7eeaf632903b29ad0a8c34149e3');

// Create a 5x5 grid of bunnies
for (var i = 0; i < 25; i++) {
    var bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add(function(delta) {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
});
       },  
    });  
  },  
  // 监听小程序canvas的touch事件，并触发pixi内部事件  
   onTouchHandle(event) {
     if (this.pixiCanvas && event.changedTouches && event.changedTouches.length) {
       this.pixiCanvas.dispatchEvent(event);  
     }  
   } 
}); 
