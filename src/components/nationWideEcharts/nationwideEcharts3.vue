<template>
  <div>
    <div class="money1 boxsStyle">
      <p class="money1-title">{{title}}</p>
      <div>
        <div id="myChart1" :style="{width: '100%', height: '240px'}" class="money1-chart1"></div>
        <div id="myChart2" :style="{width: '100%', height: '240px'}" class="money1-chart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name: "nationwideEcharts3",
    data() {
      return {
        title: '',
        datalist: [],
        aa:false,
        legendData:[],
      }
    },
    created(){

    },
    mounted() {
      this.datas();
    },
    props:{
      arrs1 : Array,
      required: true,
    },
    methods: {
      datas() {
          let data1  = this.arrs1[1];
          this.title = data1.title; // 标题
          this.data = data1.datas[0];// y x serise
          let ajaxData = this.data.series;
        let seriesFirst = [],
              seriesSecond = [],dataName=[],dataName1=[],
              dataLen = ajaxData[0].data.length;
          if(dataLen>20){
              if(dataLen>20){
                dataName = this.data.axisX.data.slice(0,19)
              }
              if(this.data.axisX.data.slice(19).length > 0){
                dataName1 = this.data.axisX.data.slice(19);
              }

            ajaxData.forEach((series)=> {
              seriesFirst.push({
                name: series.name,
                type: series.type,
                barGap: 0,
                data: series.data.slice(0, 19),
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: "{c}%",
                      color: 'black'
                    }
                  }
                },
              });
            });
            ajaxData.forEach((series)=> {
              seriesSecond.push({
                name: series.name,
                type: series.type,
                barGap: 0,
                data: series.data.slice(19),
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: "{c}%",
                      color: 'black'
                    }
                  }
                },
              });
              // console.log(series.data.slice(19));
            })

          }
          else {
            ajaxData.forEach((series)=>{
              seriesFirst.push({
                name: series.name,
                type: series.type,
                barGap: 0,
                data: series.data,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: "{c}%",
                      color: 'black'
                    }
                  }
                },
              });
            })
          }

          // 颜色
          let colors = [];
          for(let i = 0 ; i < ajaxData.length ; i++){
             colors.push(ajaxData[i].color)
          }
          // legend标题
          let legendData =[];
          for(let i = 0 ; i < ajaxData.length ; i++){
            legendData.push(ajaxData[i].name);
          }

          if (dataLen > 20) {
            // 基于准备好的dom，初始化echarts实例
            let myChart1 = echarts.init(document.getElementById('myChart1'));
            // 绘制图表

            myChart1.setOption({
              color: colors,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data:legendData,
                x: '70%', selectedMode: false,
              },
              grid: {
                x2: 50,
                x:50
              },
              toolbox: {
                show: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: dataName,

                  axisLabel: {
                    interval: 0,
                  }, axisTick: {
                    show: false
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  show: false,//y轴的横线显示
                  splitLine: {show: false}, //y轴的网格显示
                }
              ],
              series:seriesFirst
            })
            window.addEventListener("resize", function () {
              myChart1.resize();
            });
            let myChart2 = echarts.init(document.getElementById('myChart2'));
            // 绘制图表
            myChart2.setOption({
              color:colors,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                x2: 50,
                x:50
              },
              toolbox: {
                show: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: dataName1,
                  axisLabel: {
                    interval: 0,
                  },
                  axisTick: {
                    show: false
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  show: false,//y轴的横线显示
                  splitLine: {show: false}, //y轴的网格显示
                }
              ],
              series: seriesSecond
            })
            window.addEventListener("resize", function () {
              myChart2.resize();
            });
          }
      }
    }
  }
</script>

<style>
  /*各部分c-m2金额占比排名*/
  .boxsStyle{
    background: #fff;
    margin: 43px 50px 43px 50px;
    border-radius: 5px;
  }
  .money1{
    position: relative;
    padding-top: 18px;
  }
  .money1 .money1-title{
    font-size: 20px;
    padding: 4px 60px;
    background-color: #c00000;
    color: #fff;
    text-align: center;
    border: 0px solid red;
    position: absolute;
    top: 5px;
    left: 45px;
    border-top-left-radius: 1em 1.5em;
    border-bottom-right-radius: 1em 1.5em;
    -webkit-box-shadow: 10px 12px 5px #adadad;
    box-shadow: 4px 7px 5px #adadad;
  }
  .money1 .money1-chart1{
    padding-top: 100px;
  }
  .money1 .money1-chart2{
    padding-bottom: 10px;
  }

</style>


