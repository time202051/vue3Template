<!-- 
 * @fileName: BaseBarEcharts.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-03-26 14:25:27
 * @description: 最基础的柱状图 后端数据接口是useEcharts中类型结构
 * @remark: 灰色贴边的线 y轴数字，x轴名称，y轴上方是单位:个。 蓝色的柱子上方有值
 * @use: apiCallback可以实现处理接口返回值
!-->
<template>
  <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useNamespace } from "@/hook/useNamespace";
import { useECharts, ISeriesItem, mergeOptions } from "@/hook/useECharts";
import echartEmpty from "@/assets/images/echart_empty.png";
import { EChartsOption } from "echarts";
const props = withDefaults(
  defineProps<{
    api: any; //接口
    apiParams?: any; //接口参数
    optionsConfig?: any; //echarts配置(结构同echarts官网配置一致)
    type?: "horizontal" | "vertical";
    paramsConfig?: any; //useEcharts的params参数，结构一致
  }>(),
  {
    xdata: () => [],
    series: () => [],
    type: "vertical",
    optionsConfig: () => {
      return null;
    }
  }
);

const ns = useNamespace("baseBarEcharts");

const chartRef: any = ref(null);
const params = {
  showLoading: {
    color: "#008AE1",
    textColor: "#fff",
    maskColor: "rgba(8, 27, 73, 0.8)"
  },
  emptyOptions: {
    emptyImage: echartEmpty,
    height: 190,
    width: 169
  }
};
mergeOptions(params, props.paramsConfig);
const [setOptions, setNotopt] = useECharts(chartRef, params);

const emit = defineEmits(["apiCallback"]);
const setEcharts = async () => {
  let res = await props.api(props.apiParams);
  //处理数据结构并返回
  emit("apiCallback", {
    res,
    callback: (pieOption: any) => {
      if (!pieOption) return;
      res = pieOption; //返回正确的数据结构
    }
  });
  const { xdata, series } = res;
  if (!res || !xdata || !series) return setNotopt();
  const seriesData: any = series.reduce((acc: ISeriesItem[], item: any, index: number) => {
    const { name, data, type, barWidth, color } = item;
    const obj = {
      name: name,
      data,
      type: type || "bar",
      barWidth: barWidth || 20,
      itemStyle: {
        color:
          color && Array.isArray(color)
            ? (params: any) => {
                return color[params.dataIndex];
              }
            : color || "#006FFF",
        borderRadius: 0
      },
      label: {
        show: true, //开启显示
        position: props.type == "horizontal" ? "right" : "top", //柱状图值位置
        color: "black",
        fontSize: 12
      }
    };
    acc.push(obj);
    return acc;
  }, []);
  const option: EChartsOption = {
    dataZoom: [
      {
        type: "inside"
      }
    ],
    tooltip: {
      //   trigger: "item",
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: 35,
      left: 16,
      right: 16,
      bottom: 15,
      containLabel: true
    },
    legend: {
      show: false
    },
    xAxis: {
      type: "category",
      data: xdata,
      nameTextStyle: {
        color: "#999999"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#E2E2E2"
        }
      },
      axisLabel: {
        color: "#999999"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      name: "单位:个",
      nameTextStyle: {
        color: "#999999",
        align: "center"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#E2E2E2"
        }
      },
      axisLabel: {
        color: "#999999"
      },
      splitLine: {
        show: false
      },
      minInterval: 1
    },
    series: seriesData
  };
  // 水平柱状图配置
  if (props.type == "horizontal") {
    Object.assign(option, {
      dataZoom: [
        {
          type: "inside",
          orient: "vertical",
          minValueSpan: 2,
          maxValueSpan: 9
        }
      ],
      legend: {
        show: true,
        top: 16,
        right: 14,
        itemWidth: 8, // 设置宽度
        itemHeight: 8, // 设置高度
        icon: "circle",
        textStyle: {
          color: "#333333",
          fontSize: 14
        }
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
        axisLabel: {
          color: "#999999"
        },
        minInterval: 1
      },
      yAxis: {
        type: "category",
        data: xdata,
        axisLabel: {
          color: "#333333"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#E2E2E2"
          }
        },
        axisTick: {
          show: false
        }
      }
    });
  }
  // 自定义配置项
  if (props.optionsConfig) mergeOptions(option, props.optionsConfig);
  setOptions(option);
};

onMounted(() => {
  watch(
    () => props.apiParams,
    async () => {
      setEcharts();
    },
    {
      immediate: true,
      deep: true
    }
  );
});
</script>

<style lang="less" scoped></style>
