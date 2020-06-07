import lottie from "@tbminiapp/lottie-miniapp";
import animationData from "../../json/catrim";
 
Page({
  onReady() {},
  init() {
    this.canvas = my._createCanvas({
      id: "canvas",
      success: (canvas) => {
        this.canvas = canvas;
        console.log("canvas=====", canvas);
        lottie.setup(canvas);
        this.ani = lottie.loadAnimation({
          loop: true,
          autoplay: true,
          // path:'https://gw.alipayobjects.com/os/lottie-asset/coupon-tip/data.json/data-80154.json',
          animationData,
          rendererSettings: {
            context: canvas.getContext("2d"),
          },
        });
      },
    });
  },
  play() {
    this.ani.play();
  },
  pause() {
    this.ani.pause();
  },
});