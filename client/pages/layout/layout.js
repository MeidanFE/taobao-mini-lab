import routerInit from "miniapp-router";
import { routerConfig, basePath } from "./router";

Page({
  data: {
    activeKey: "",
    defaultActiveKey: basePath,

    /* info用于配置左侧菜单的商家应用基础信息 */

    info: {
      company: "阿里巴巴",
      miniappName: "应用DEMO",
      logo:
        "https://img.alicdn.com/tfs/TB1vVhnmnnI8KJjy0FfXXcdoVXa-300-300.png",
    },

    /* menu用于配置左侧菜单信息 */

    menu: [
      {
        name: "表单",
        key: "form",
        title: "表单校验",
      },
      {
        name: "f2图表",
        key: "chart",
        title: "f2图表",
        tabs: [
          { name: "折线图", key: "line" },
          { name: "饼图", key: "pie" },
        ],
      },
      // {
      //   /* name用于配置左侧菜单名称 */
      //   name: 'Component 组件',
      //   /* key与一级路由对应 */
      //   key: 'component',
      //   /* title用于配置右侧面板的住title */
      //   title: '基础组件',
      //   /* tabs用于配置右侧信息，一个menu菜单可以包含多个tab */
      //   tabs: [
      //     {
      //       /* name用于配置当前tab的选项卡名称 */
      //       name: 'Button 按钮',
      //       /* key与二级路由对应 */
      //       key: 'button',
      //       /* title用于配置右下侧主内容区域的标题 */
      //       title: '模块标题',
      //       /* 定义当前tab的面包屑 */
      //       breadcrumb: [{
      //          /* 名称 */
      //         name: '一级',
      //         /* 跳转路径 */
      //         path: '/api/interface'
      //       },
      //       {
      //         name: '二级',
      //         path: '/api/base'
      //       }, {
      //         name: '三级',
      //         path: '/component/button'
      //       }]
      //     },
      //     { name: 'Icon 图标', key: 'icon' }
      //   ]
      // },
      // {
      //   name: 'API',
      //   key: 'api',
      //   tabs: [
      //     { name: 'Interface 界面', key: 'interface', },
      //     { name: 'Base 基础能力', key: 'base' }
      //   ],
      // },
      // {
      //   name: 'Scene 场景',
      //   key: 'scene',
      //   title: '典型场景'
      // }
    ],
  },
  onLoad() {
    routerInit.call(this, routerConfig);
  },
  onChange({ detail: { value } }) {
    console.log("************$router", value);
    this.$router.push(value);
    this.setData({ activeKey: value });
  },
  onActiveKeyChange(event) {
    const { path } = event.target.dataset;
    this.setData({ activeKey: path });
  },
});
