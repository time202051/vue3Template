<!-- 
 * @fileName: BasePieEcharts.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-03-27 16:30:08
 * @description: 
 * @remark:
 * @use: apiCallback可以实现处理接口返回值
!-->
<template>
  <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useNamespace } from "@/hook/useNamespace";
import { useECharts, mergeOptions } from "@/hook/useECharts";
import echartEmpty from "@/assets/image/echart_empty.png";
import { EChartsOption } from "echarts";

const props = withDefaults(
  defineProps<{
    api: any; //接口
    apiParams?: any; //接口参数
    optionsConfig?: any; //echarts配置(结构同echarts官网配置一致)
    paramsConfig?: any; //useEcharts的params参数，结构一致
  }>(),
  {
    xdata: () => [],
    series: () => [],
    optionsConfig: () => {
      return null;
    }
  }
);

const ns = useNamespace("baseBarEcharts");
// 未返回颜色时，根据索引给颜色
const colorList = ["#006FFF", "#FEC244", "#6ADEB5", "#5ECD62", "#00A8FF", "#6049F4"];

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
  let data = await props.api(props.apiParams);
  //处理数据结构并返回
  emit("apiCallback", {
    res: data,
    callback: (pieOption: any) => {
      if (!pieOption) return;
      data = pieOption; //返回正确的数据结构
    }
  });
  if (!data || !Array.isArray(data) || !data.length) return setNotopt();
  // value为null时候饼图的线不显示
  data.forEach((item: any) => {
    if (item.value == 0) item.value = "";
  });
  let option: EChartsOption = {
    tooltip: {
      trigger: "item"
    },
    title: {},
    grid: {
      top: 16,
      left: 16,
      right: 16,
      bottom: 50,
      containLabel: true
    },
    legend: {
      show: true,
      bottom: 10,
      left: "center",
      itemWidth: 8, // 设置宽度
      itemHeight: 8, // 设置高度
      icon: "circle",
      textStyle: {
        color: "#333333",
        fontSize: 14
      }
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        itemStyle: {
          color: (e: any) => {
            const {
              data: { color },
              dataIndex
            } = e;
            return color || colorList[dataIndex % colorList.length]; //未返回颜色则给本地颜色
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{d}%}",
          minMargin: 0,
          edgeDistance: "10%", //边缘距离
          lineHeight: 17,
          fontSize: 14,
          color: "#3F3F3F",
          rich: {
            time: {
              fontSize: 14,
              color: "#3F3F3F"
            }
          }
        },
        labelLine: {
          length: 15,
          length2: 10,
          maxSurfaceAngle: 80
        },
        data
      }
    ]
  };

  // 自定义配置项
  if (props.optionsConfig) mergeOptions(option, props.optionsConfig);
  setOptions(option);
};

onMounted(() => {
  // 参数改变时候重新执行
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
