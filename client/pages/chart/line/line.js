Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    console.log("line")
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onInitChart(F2, config) {
        var Shape = F2.Shape;
  var Util = F2.Util;
  Shape.registerShape('interval', 'text', {
    draw: function draw(cfg, container) {
      var points = this.parsePoints(cfg.points);
      // points 顶点的顺序
      // 1 ---- 2
      // |      |
      // 0 ---- 3
      var style = Util.mix({
        fill: cfg.color,
        z: true // 需要闭合
      }, cfg.style);
      var intervalShape = container.addShape('rect', {
        attrs: Util.mix({
          x: points[1].x,
          y: points[1].y,
          width: points[2].x - points[1].x,
          height: points[0].y - points[1].y
        }, style)
      });

      var origin = cfg.origin._origin; // 获取对应的原始数据记录
      var textShape = container.addShape('text', {
        zIndex: 1,
        attrs: {
          x: (points[1].x + points[2].x) / 2,
          y: points[1].y - 5, // 往上偏移 5 像素
          text: origin['月均降雨量'],
          fill: '#808080',
          textAlign: 'center',
          textBaseline: 'bottom',
          fontSize: 10 // 字体大小
        }
      });
      container.sort();
      return [intervalShape, textShape];
    }
  });

  var data = [{
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9
  }, {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8
  }, {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3
  }, {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4
  }, {
    name: 'London',
    月份: 'May.',
    月均降雨量: 47
  }, {
    name: 'London',
    月份: 'Jun.',
    月均降雨量: 20.3
  }, {
    name: 'London',
    月份: 'Jul.',
    月均降雨量: 24
  }, {
    name: 'London',
    月份: 'Aug.',
    月均降雨量: 35.6
  }, {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 12.4
  }, {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2
  }, {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5
  }, {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7
  }, {
    name: 'Berlin',
    月份: 'May.',
    月均降雨量: 52.6
  }, {
    name: 'Berlin',
    月份: 'Jun.',
    月均降雨量: 35.5
  }, {
    name: 'Berlin',
    月份: 'Jul.',
    月均降雨量: 37.4
  }, {
    name: 'Berlin',
    月份: 'Aug.',
    月均降雨量: 42.4
  }];
  var chart = new F2.Chart({
    ...config
  });
  chart.source(data);
  chart.legend(false);

  chart.interval().position('月份*月均降雨量').color('name').shape('text').adjust({
    type: 'dodge',
    marginRatio: 0.2
  }).style({
    radius: [4, 4, 0, 0]
  });

  chart.render();
      // 注意：需要把chart return 出来
      return chart;
    },
    onInitChart2(F2, config) {
      var data = [{
        year: '2012',
        sales: 850
      }, {
        year: '2013',
        sales: 894
      }, {
        year: '2014',
        sales: 912
      }, {
        year: '2015',
        sales: 974
      }, {
        year: '2016',
        sales: 997
      }, {
        year: '2017',
        sales: 1013
      }, {
        year: '2018',
        sales: 1130
      }, {
        year: '2019',
        sales: 1204
      }, {
        year: '2020',
        sales: 1250
      }];

      var chart = new F2.Chart({
        // id: 'mountNode',
        padding: ['auto', 20, 'auto', 'auto'],
        ...config
      });

      chart.source(data, {
        year: {
          range: [0, 1]
        },
        sales: {
          tickCount: 5
        }
      });
      chart.axis('year', {
        tickLine: {
          length: 4,
          lineWidth: 1,
          stroke: '#e8e8e8'
        }
      });
      chart.tooltip(false);
      chart.line().position('year*sales');
      chart.point().position('year*sales').style('year', {
        stroke: '#1890ff',
        lineWidth: 1,
        fill: '#FFF',
        r: function r(val) {
          if (val * 1 < 2018) {
            return 5;
          }
          return 0;
        }
      });

      // chart.guide().regionFilter({
      //   start: ['64%', '0%'],
      //   end: ['100%', '100%'],
      //   color: '#fff',
      //   style: {
      //     lineDash: [3, 8]
      //   }
      // });
      // 2018 年开始为预测数据
      var forecastData = data.slice(6);
      forecastData.map(function (obj) {
        chart.guide().point({
          position: [obj.year, obj.sales],
          style: {
            fill: '#1890ff',
            r: 3
          }
        });
        chart.guide().text({
          position: [obj.year, obj.sales],
          content: '$' + obj.sales,
          style: {
            fill: '#1890ff',
            textAlign: 'center'
          },
          offsetY: -15
        });
      });
      chart.guide().rect({
        start: ['2017', 'min'],
        end: ['max', 'max'],
        style: {
          fill: '#1890ff',
          fillOpacity: 0.05
        }
      });
      chart.guide().text({
        position: ['2017', 'max'],
        content: '预测',
        style: {
          fill: '#808080',
          textAlign: 'start',
          textBaseline: 'top',
          fontWeight: 'bold'
        },
        offsetX: 8,
        offsetY: 8
      });
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    },
     onInitChart3(F2, config){
var data = [{
    day: '周一',
    value: 300
  }, {
    day: '周二',
    value: 400
  }, {
    day: '周三',
    value: 350
  }, {
    day: '周四',
    value: 500
  }, {
    day: '周五',
    value: 490
  }, {
    day: '周六',
    value: 600
  }, {
    day: '周日',
    value: 900
  }];
  var chart = new F2.Chart({
    
  });

  chart.source(data, {
    value: {
      tickCount: 5,
      min: 0
    },
    day: {
      range: [0, 1]
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    showItemMarker: false,
    onShow: function onShow(ev) {
      var items = ev.items;
      items[0].name = null;
      items[0].value = '$ ' + items[0].value;
    }
  });
  chart.axis('day', {
    label: function label(text, index, total) {
      var textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.line().position('day*value');
  chart.point().position('day*value').style({
    stroke: '#fff',
    lineWidth: 1
  });
  chart.render();
  return chart
     }
  },
});
