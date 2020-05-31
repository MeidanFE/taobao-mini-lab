import moment from "moment";
import schema from "async-validator";
import { render } from "../../utils/template.js";

const RECEIVE_RULE_TEMPLATE = `1.活动时间：{{time}}
2.用户挑选一个盲盒分类进行购买，购买完成之后会得到该分类下一次拆盲盒机会
3.用此机会从盲盒机中打开一个盲盒，即可获得该盲盒所对应的商品
4.如果活动结束，则用户未拆盒次数将会消失`;
const dateFormat = "YYYY/MM/DD HH:mm:ss";

var descriptor = {
  name: [
    {
      type: "string",
      required: true,
      message: "活动名称必填",
    },
  ],
  startTime: [
    {
      type: "string",
      required: true,
      message: "开始时间必填",
    },
  ],
  endTime: [
    {
      type: "string",
      required: true,
      message: "结束时间必填",
    },
  ],
  rule: {
    type: "string",
    required: true,
    message: "活动规则必填",
  },
  chanceType: [
    {
      type: "enum",
      enum: ["buy", "task"],
      message: "用户购买入口有误",
    },
  ],
  limitCount: [
    {
      pattern: /^\d*$/,
      message: "购买限制次数必须为正整数",
    },
  ],
};
var validator = new schema(descriptor);

// PROMISE USAGE

Component({
  mixins: [],
  data: {
    //
    name: "test",
    startTime: moment().format(dateFormat),
    endTime: moment().add({ days: 7 }).format(dateFormat),
    rule: "",
    chanceType: "buy",
    limitCount: "",
    //
    labelCol: { fixedSpan: 8 },
    wrapperCol: { span: 16 },
  },
  props: {},
  didMount() {
    const { startTime, endTime } = this.data;

    this.setData({
      rule: render(RECEIVE_RULE_TEMPLATE, {
        time: `${startTime} - ${endTime}`,
      }),
    });
  },
  didUpdate() {
    console.log(this.form);
  },
  didUnmount() {},
  methods: {
    plus() {
      this.setData({ counter: this.data.counter + 1 });
    },
    onChange(e) {
      let {
        detail: { value },
        currentTarget: { dataset },
      } = e;
      let { name } = dataset;
      console.log(name + " onChange:", value);
      let newData;
      if (name == "startEndTime") {
        const [startTime, endTime] = value;
        newData = {
          startTime,
          endTime,
        };
        newData.rule = render(RECEIVE_RULE_TEMPLATE, {
          time: `${startTime} - ${endTime}`,
        });
      } else {
        newData = { [name]: value };
      }

      this.setData(newData);
    },
    onChangeHeihei(e) {
      let {
        detail: { value },
        // currentTarget: { dataset }
      } = e;
      // let { value } = dataset;
      // console.log('name:', name);
      // console.log('value:', value);
      // debugger;
      this.setData({ radioValue: value });
    },
    handleSubmit() {
      validator
        .validate(this.data, { first: true })
        .then(() => {
          console.log("[form submit]:", this.data);
          my.showToast({ content: JSON.stringify(this.data) });
        })
        .catch(({ errors, fields }) => {
          const err = errors[0];
          console.log(err);
          const msg = err.message;
          return my.showToast({ content: msg, type: "fail" });
        });
    },
  },
});
