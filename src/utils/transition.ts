import { unref } from "vue";
import { throwError } from "element-plus/es/utils/error";
import { isArray, isObject } from "@vue/shared";
import { dictStore } from "@/store/dict/dict";
import { getDictByCode } from "@/api/common/dict";
import { useFloor } from "@vueuse/math";
import { useNow, useDateFormat } from "@vueuse/core";
import { cloneDeep } from "lodash";

// import { dayjs } from "element-plus";
// import { useAsyncState } from "@vueuse/core";

/**
 *daterange格式数据转成连个字段
 * @param {Object} obj
 * @param {Array} daterange //  daterange类型时间选择器的value (可能传空过来，就是起始日期都为空)
 * @param {Array} strs  // 转成起始时间的键名
 */
export const daterangeToSingle = (obj: any, daterange: any, strs: string[]) => {
  // if (!isArray(daterange))
  // return throwError("daterangeToSingle", "daterange:数组");
  strs.forEach((key, index) => {
    obj[key] = isArray(daterange) ? daterange[index] : "";
  });
  return obj;
};

/**
 *daterange格式数据转成连个字段
 * @param {Object} obj
 * @param {Array} strs //  起始时间的键名数组
 * @param {Array} key  // daterange时间选择器双向绑定的值
 */
export const singleToDaterange = (obj: any, strs: string[], key: string) => {
  if (!isArray(strs)) return throwError("singleToDaterange", "strs:数组");
  obj[key] = strs.reduce((acc: any, key) => {
    acc.push(obj[key]);
    return acc;
  }, []);
  return obj;
};
/**
 *搜索下拉框字段对象，供useTable使用(暂不考虑多级表头)
 * @param {Object} searchBarData //搜索框数据(keyType为key的默认值，默认"")
 * @param {Object} defaultObj //默认的非searchBar组件提供的查询参数
 */
export const getQueryFormKeys = (searchBarData: any, defaultObj?: any) => {
  if (!isArray(unref(searchBarData)))
    return throwError("getQueryFormKeys", "searchBarData:数组对象格式");
  // 不支持多级表头
  if (unref(searchBarData).find((e: any) => e.children))
    return throwError("getQueryFormKeys", "暂不支持多级表头");
  const searchBarObj = unref(searchBarData).reduce((acc: any, item: any) => {
    //时间范围
    if (item.type == "daterange" && item.startTime && item.endTime) {
      acc[item.startTime] = "";
      acc[item.endTime] = "";
    } else {
      acc[item.key] = Object.keys(item).includes("keyType") ? item.keyType : "";
    }
    return acc;
  }, {});
  return { ...searchBarObj, ...defaultObj };
};

//删除对象中的键
export const delObjectKeys = (obj: any, blackKeys: string[]) => {
  blackKeys.forEach((key) => {
    if (Object.keys(obj).includes(key)) delete obj[key];
  });
  return obj;
};

/**
 *获取本地下拉框options对应的值，用于表格已知下拉框的回显
 * @param {Object} params
 */
interface IgetOptionsLabelByValue {
  options: any[]; //下拉框数据
  value: any; //对应的value值
  attrs?: {
    value: string; //自定义下拉框value字段名
    label: string; //自定义下拉框label字段名
  };
}
export const getOptionsLabelByValue = (params: IgetOptionsLabelByValue) => {
  const { options, value: valueA, attrs } = params;
  // 默认value,label
  let value = "value";
  let label = "label";
  if (attrs) {
    value = attrs.value;
    label = attrs.label;
  }
  const tempItem = options.find((item: any) => item[value] == valueA);
  if (!tempItem) return "--";
  return tempItem[label];
};

/**
 * @param {string} arr 目标数组
 * @param {string} value
 * @param {string} label
 * 讲options转成{value:'',label:''} 格式
 */
interface IselectOptionToValueLabel {
  arr: any[];
  value: string | number;
  label: string | number;
}
export const selectOptionToValueLabel = (params: IselectOptionToValueLabel) => {
  const { arr, value, label } = params;
  return arr.reduce((acc: any, item: any) => {
    acc.push({
      ...item,
      value: item[value],
      label: item[label],
    });
    return acc;
  }, []);
};

/**
 *获取上传的文件图片等地址
 */
export const getFileUrl = (params: string) => {
  if (!params || params.length == 0) return;
  const dict = dictStore();
  const temp = JSON.parse(params);
  let arr = [];
  if (isObject(temp) && !isArray(temp)) arr = [temp];
  arr = temp;
  if (arr.length == 1) {
    return `${dict.filePreviewUrl}${arr[0].fileUrl}`;
  }
};

export const getFileUrlName = (params: string) => {
  if (!params) return;
  const temp = JSON.parse(params);
  let arr = [];
  if (isObject(temp) && !isArray(temp)) arr = [temp];
  arr = temp;
  if (arr.length == 1) {
    return `${arr[0].fileUrl}`;
  }
};

//获取上传文件/图片名称
export const getUrlName = (params: string) => {
  if (!params) return;
  const temp = JSON.parse(params);
  let arr = [];
  if (isObject(temp) && !isArray(temp)) arr = [temp];
  arr = temp;
  if (arr.length == 1) {
    return `${arr[0].fileName}`;
  }
};

/**
 *获取上传的文件图片等地址拼接前缀
 */
export const spliceFileUrl = (params: string) => {
  if (!params) return "";
  const dict = dictStore();
  return `${dict.filePreviewUrl}${params}`;
};

/**
 *获取当前vue文件名
 * @param {Object} proxy 上下文
 */
export const getVueFileName = (proxy: any) => {
  const strUrl = proxy.$.type.__file;
  const temp = strUrl.split(".vue");
  if (temp.length == 1) return;
  const tempItem = temp[0].split("/");
  return tempItem[tempItem.length - 1];
};

/**
 * @param {Object} proxy 上下文
 */
export const getFileName = (strUrl: string) => {
  const temp = strUrl.split(".");
  if (temp.length == 1) return;
  const tempItem = temp[0].split("/");
  return tempItem[tempItem.length - 1];
};

/**
 * 字典反查回显
 * @param {string} dictCode 字典code
 * @param {string} dictCoding 字典value
 * @param {string} attrName 期望返回的字段名(默认dictName)
 * 返回字段promise
 */
export const getDictLable = async (
  dictCode: string,
  dictCoding: string,
  attrName?: string
) => {
  const res = await getDictByCode(dictCode);
  const tempItem = res[dictCode].find(
    (item: any) => item.dictCoding == dictCoding
  );

  if (tempItem) {
    if (!attrName) return tempItem.dictName;
    return tempItem[attrName];
  }
};

/**
 * @param {string} arr
 * @param {string} key 键
 * @param {string} value 值
 * 返回数组某项(item.key == value)
 */
export const getAttrNameByEquivalent = (arr: any, key: string, value: any) => {
  const temp = arr.find((item: any) => item[key] == value);
  if (!temp) return;
  return temp;
};

// 时间格式转换 YYYY-MM-DD hh:mm:ss
export const getDayTimer = (data: any) => {
  // dayjs(new Date()).format("YYYY-MM-DD")
  const date = new Date(data);
  const y = date.getFullYear();
  let m: any = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d: any = date.getDate();
  d = d < 10 ? "0" + d : d;
  const currentdate = y + "-" + m + "-" + d;
  let hh: any = date.getHours();
  hh = hh < 10 ? "0" + hh : hh;
  let mm: any = date.getMinutes();
  mm = mm < 10 ? "0" + mm : mm;
  let ss: any = date.getSeconds();
  ss = ss < 10 ? "0" + ss : ss;
  const time = hh + ":" + mm + ":" + ss;
  return currentdate + " " + time;
};

// 通过某个属性删除数组对象结构中的某个item
export const deleteItemByAttr = (arr: any, attrName: string, value: any) => {
  const index = unref(arr).findIndex((item: any) => item[attrName] == value);
  if (index == -1) return;
  arr.splice(index, 1);
};

/**
 * @param {string} rules 校验规则
 * @param {string} keys 要修改的校验名称
 * @param {string} required 是否需要校验
 * 启用或者关闭表单现有的校验rules
 */
export const rulesRequiredChange = (
  rules: any,
  keys: string[] | string,
  required: boolean
) => {
  if (!isArray(keys)) keys = [keys];
  keys.forEach((key: string) => {
    rules[key].forEach((item: any) => {
      if (Object.keys(item).includes("required")) {
        item.required = required;
      }
    });
  });
};

/**
 * @param {string} str 逗号前是分母，逗号后是分子 eg: "2,1" 就是1/2
 * 返回 百分比。异常情况都返回0
 */
export const getStringPercent = (str: any) => {
  if (typeof str == "string" && str.includes(",")) {
    const arrStr = str.split(",");
    return getPercent(Number(arrStr[1]), Number(arrStr[0]));
  } else {
    return 0; //其他情况都返回0
  }
};

// 百分比（保留两位有效数字）
export const getPercent = (molecular: number, denominator: number) => {
  const temp = useFloor((Number(molecular) / Number(denominator)) * 100);
  // const temp = Math.floor((molecular / denominator) * 10000) / 100;
  if (!temp) return 0;
  //百分比必需在0-100之间
  if (unref(temp) < 0 || unref(temp) > 100) return 0;
  return unref(temp) || 0;
};

// 获取某月的起始日期 (日期选择器默认范围使用)
// eg：如果是12月份，则返回 [2022-12-01,2022-12-31]
export const defaultCurrentMonthDay = (): [string, string] => {
  const formatted = useDateFormat(useNow(), "YYYY-MM");
  const arr = formatted.value.split("-");
  const maxDay = new Date(Number(arr[0]), Number(arr[1]), 0).getDate(); // 获取当月最后一日
  console.log(maxDay); // 结果为30
  return [`${formatted.value}-01`, `${formatted.value}-${maxDay}`];
};

export const changeToRgb = (color: string, opacity?: number) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i <= 6; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    //此处是返回的颜色 如需要透明度,0.3是指透明度30%，直接返回
    if (opacity || opacity === 0)
      return `rgba(${sColorChange.join(",")}, ${opacity})`;
    // return "rgba(" + sColorChange.join(",") + ", opacity)";
    return `rgba(${sColorChange.join(",")})`;
  } else {
    return sColor;
  }
};

//当前时间季度
interface IquarterCurrentDay {
  month?: any; //当前月
  se?: boolean;
  months?: boolean;
}

// 获取季度，当se为true时候返回季度的起始时间 eg: ['2023-04-01','2023-06-30']
export const quarterCurrentDay = (params?: IquarterCurrentDay): any => {
  const formatted = useDateFormat(useNow(), "M");
  const m = Number(params?.month) || Number(unref(formatted));

  let quarter = 1; // 季度
  if (m < 3) {
    quarter = 1;
  } else if (m < 6) {
    quarter = 2;
  } else if (m < 9) {
    quarter = 3;
  } else {
    quarter = 4;
  }
  if (params?.se) {
    // 返回季度起始日期
    const year = useDateFormat(useNow(), "YYYY");
    const maxDay = new Date(Number(unref(year)), quarter * 3, 0).getDate(); // 获取季度最后一日
    // 公差
    const startM = 1 + 3 * (quarter - 1);
    const endM = 3 + 3 * (quarter - 1);
    return [
      `${year.value}-${startM < 10 ? `0${startM}` : startM}-01`,
      `${year.value}-${endM < 10 ? `0${endM}` : endM}-${maxDay}`,
    ];
  } else if (params?.months) {
    if (quarter == 1) {
      return ["01", "02", "03"];
    } else if (quarter == 2) {
      return ["04", "05", "06"];
    } else if (quarter == 3) {
      return ["07", "08", "09"];
    } else if (quarter == 4) {
      return ["10", "11", "12"];
    }
  } else {
    // 返回季度
    return quarter;
  }
};

export const setTableRowSpan = (tableData: any, colFields: any) => {
  colFields.forEach((targetKey: string) => {
    tableData.forEach((item: any, index: number) => {
      // 和上一项相比，相同返回[0,0],不同返回[1,1]
      item.span = {};
      if (
        index &&
        JSON.stringify(tableData[index - 1][targetKey]) ==
          JSON.stringify(item[targetKey])
      ) {
        item.span[targetKey] = [0, 0];
      } else {
        item.span[targetKey] = [1, 1];
      }
    });
  });
  const tableDataClone = cloneDeep(tableData).reverse();
  colFields.forEach((targetKey: string) => {
    // debugger;
    let pointerIndex = 0; //指针
    tableDataClone.forEach((item: any, index: number) => {
      // 是[0,0]并且和上一个不同
      if (
        JSON.stringify(item.span[targetKey]) == JSON.stringify([0, 0]) &&
        (!index ||
          JSON.stringify(tableDataClone[index - 1].span[targetKey]) !=
            JSON.stringify([0, 0]))
      ) {
        // 说明是尾项
        pointerIndex = index;
      }
      //   和上一项不是[0,0]既当前项是首项，且但前项是[1,1]
      if (
        index &&
        JSON.stringify(tableDataClone[index - 1].span[targetKey]) ==
          JSON.stringify([0, 0]) &&
        JSON.stringify(item.span[targetKey]) == JSON.stringify([1, 1])
      ) {
        const rowNum = index - pointerIndex + 1;
        item.span[targetKey] = [rowNum, 1];
        pointerIndex = index; //更新
      }
    });
  });
  tableData = tableDataClone.reverse();
  return tableData;
};

//混合
export const colourBlend = (c1: any, c2: any, ratio: any) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  const r1 = parseInt(c1.substring(1, 3), 16);
  const g1 = parseInt(c1.substring(3, 5), 16);
  const b1 = parseInt(c1.substring(5, 7), 16);
  const r2 = parseInt(c2.substring(1, 3), 16);
  const g2 = parseInt(c2.substring(3, 5), 16);
  const b2 = parseInt(c2.substring(5, 7), 16);
  let r: any = Math.round(r1 * (1 - ratio) + r2 * ratio);
  let g: any = Math.round(g1 * (1 - ratio) + g2 * ratio);
  let b: any = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ("0" + (r || 0).toString(16)).slice(-2);
  g = ("0" + (g || 0).toString(16)).slice(-2);
  b = ("0" + (b || 0).toString(16)).slice(-2);
  return "#" + r + g + b;
};
