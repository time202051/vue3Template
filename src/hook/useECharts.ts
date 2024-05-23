import { ref, unref, nextTick, onMounted } from "vue";
import type { Ref } from "vue";
import echarts from "@/libs/echarts";
import { EChartsOption } from "echarts";
import { useResizeObserver } from "@vueuse/core";
export const useECharts = (
  elRef: Ref<HTMLDivElement>,
  params?: {
    theme?: "light" | "dark" | "default";
    loadingText?: string;
    showLoading?: any;
    emptyOptions?: {
      emptyImage: any;
      width?: number;
      height?: number;
    };
  }
): any => {
  let chartInstancec: echarts.ECharts | null = null;
  const cacheOptions = ref({}) as Ref<EChartsOption>;

  const initCharts = () => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstancec = echarts.init(elRef.value, params?.theme || "default");
    chartInstancec?.showLoading({
      text: params?.loadingText || "正在加载数据"
    });
  };

  const setOptions = (options: any) => {
    chartInstancec?.clear(); //清除之前的echarts
    cacheOptions.value = options;
    nextTick(() => {
      if (!chartInstancec) return;
      chartInstancec?.hideLoading();
      chartInstancec?.setOption(unref(cacheOptions));
    });
  };

  //数据为空时候 (暂无数据)
  const setNotopt = () => {
    chartInstancec?.clear(); //清除之前的echarts
    const tempOpt = {
      title: {
        text: " {a|}",
        x: "center",
        y: "center",
        subtext: "暂无数据",
        itemGap: 0,
        textStyle: {
          rich: {
            a: {
              color: "#000",
              fontSize: "16",
              height: params?.emptyOptions?.height || 80,
              width: params?.emptyOptions?.width || 160,
              backgroundColor: {
                image:
                  params?.emptyOptions?.emptyImage ||
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbFJ1bGU9ImV2ZW5vZGQiPg0KICAgIDxlbGxpcHNlIGZpbGw9IiNkZGQiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3IiAvPg0KICAgIDxnIGZpbGxSdWxlPSJub256ZXJvIiBzdHJva2U9IiM5OTkiPg0KICAgICAgPHBhdGgNCiAgICAgICAgZD0iTTU1IDEyLjc2TDQ0Ljg1NCAxLjI1OEM0NC4zNjcuNDc0IDQzLjY1NiAwIDQyLjkwNyAwSDIxLjA5M2MtLjc0OSAwLTEuNDYuNDc0LTEuOTQ3IDEuMjU3TDkgMTIuNzYxVjIyaDQ2di05LjI0eiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgIGQ9Ik00MS42MTMgMTUuOTMxYzAtMS42MDUuOTk0LTIuOTMgMi4yMjctMi45MzFINTV2MTguMTM3QzU1IDMzLjI2IDUzLjY4IDM1IDUyLjA1IDM1aC00MC4xQzEwLjMyIDM1IDkgMzMuMjU5IDkgMzEuMTM3VjEzaDExLjE2YzEuMjMzIDAgMi4yMjcgMS4zMjMgMi4yMjcgMi45Mjh2LjAyMmMwIDEuNjA1IDEuMDA1IDIuOTAxIDIuMjM3IDIuOTAxaDE0Ljc1MmMxLjIzMiAwIDIuMjM3LTEuMzA4IDIuMjM3LTIuOTEzdi0uMDA3eiINCiAgICAgICAgZmlsbD0iI2UxZTFlMSIgLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg=="
              }
            }
          }
        },
        textVerticalAlign: "top",
        subtextStyle: {
          fontSize: 14
        }
      }
    };
    setOptions(tempOpt);
  };

  //获取实例
  const getInstance = () => {
    if (!chartInstancec) {
      initCharts();
    }
    return chartInstancec;
  };

  useResizeObserver(elRef, () => {
    if (chartInstancec) chartInstancec?.resize();
  });

  onMounted(() => {
    initCharts();
  });
  return [setOptions, setNotopt, getInstance];
};

// 合并echarts, 注意只合并静态数据,不考虑回调
// 将options合并到targetOptions,结构一一对应
export const mergeOptions = (targetOptions: any, options: any) => {
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      if (typeof options[key] === "object" && typeof targetOptions[key] === "object") {
        // 如果 options[key] 和 targetOptions[key] 都是对象，则递归调用 mergeOptions 函数进行合并
        mergeOptions(targetOptions[key], options[key]);
      } else {
        // 否则，直接将 options[key] 的值赋给 targetOptions[key]
        targetOptions[key] = options[key];
      }
    }
  }
};

// 柱状图期望后端返回的数据格式
export interface IOptionsData {
  xdata: string[];
  series: ISeriesItem[];
}
export interface ISeriesItem {
  data: number[] | string[];
  name?: string;
  type?: string;
  color?: string | string[]; //颜色可以是数组，一一对应
  barWidth?: number;
  [attrName: string]: any;
}

// pie饼状图
export interface IPieItem {
  value: number;
  name: string;
  color?: string;
  [attrName: string]: any;
}

// const aa = {
//   xdata: ["部门名称A", "部门名称B", "部门名称C", "部门名称D",......],
//   series: [{
//     name:'作业数',
//     data:[10,20,30,40,.....]
//     color:'#ccc'
//   },{
//     name:'闭票数',
//     data:[10,20,30,40,.....]
//     color:'#ccc'
//   }],
// };

// const pie = [
//   { value: 1048, name: "Search Engine" },
//   { value: 735, name: "Direct" },
//   { value: 580, name: "Email" },
//   { value: 484, name: "Union Ads" },
//   { value: 300, name: "Video Ads" },
// ];
