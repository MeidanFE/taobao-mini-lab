const Matter = require("./lib.js")
var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine, world;
var egg = [];

Page({
  onReady() {
    this.ctx = my.createCanvasContext('canvas');

    // create engine
    engine = Engine.create(),
      world = engine.world;

    this.engine = engine


    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    World.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);


    var bodyOptions = {
      frictionAir: 0,
      friction: 1,
      restitution: 1
    };

    // add some small bouncy circles... remember Swordfish?
    World.add(world, Composites.stack(0, 10, 5, 2, 10, 10, function (x, y) {

      return Bodies.circle(x, y, 60, bodyOptions);
    }));
    // var bodies = Composite.allBodies(engine.world);

    // for (var i = 0; i < bodies.length; i++) {
    //   var body = bodies[i];

    //   if (!body.isStatic) {
    //     egg.push(body)
    //   }
    // }
    

    this.interval = setInterval(this.draw.bind(this), 17);

  },
  start() {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];

      if (!body.isStatic && body.position.y >= 100) {
        var forceMagnitude = 0.05 * body.mass;

        Body.applyForce(body, body.position, {
          x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
          y: -forceMagnitude + Common.random() * -forceMagnitude
        });
      }
    }
  },
  draw() {
    const { ctx } = this;
    var bodies = Composite.allBodies(engine.world);
  
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      const { x, y } = body.position;

      const { angle, circleRadius } = body;
      ctx.save()
      ctx.translate(x, y); // 将画布偏移到物体中心
      // console.log(angle)
      ctx.rotate(angle)
      ctx.translate(-x, -y);

      // ctx.arc( body.position.x, body.position.y, body.circleRadius,0,2*Math.PI);
      ctx.drawImage('https://img.alicdn.com/imgextra/i2/826052692/O1CN01OJheGK1VkynUNEY1F_!!826052692.png', x - circleRadius, y - circleRadius, circleRadius * 2, circleRadius * 2)

      ctx.restore()

    }

    ctx.draw();

  },

  log(e) {
    if (e.touches && e.touches[0]) {
      console.log(e.type, e.touches[0].x, e.touches[0].y);
    } else {
      console.log(e.type);
    }
  },
  onUnload() {
    clearInterval(this.interval);
  },
});
