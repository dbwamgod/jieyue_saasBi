<template>
  <div>
    <div class="spread1 boxsStyle">
      <div class="stroe">
        <p>{{this.titleFb}}</p>
      </div>
      <div class="stroe1">
        <div id="myChart1" :style="{width: '100%', height: '300px'}" class="stroe1Chart1"></div>
        <div id="myChart2" :style="{width: '100%', height: '300px'}" class="stroe1Chart1"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name:"regionEcharts2",
    data(){
      return {
        titleFb:'',nameFb:'',valueFb:'',unitFb:'',dataEC:'',dataS3:'',dataS4:'',dataS5:'',dataS6:'',dataS7:'',dataS8:'',
      }
    },
    mounted() {
      this.dataAjax();
    },
    props:{
      arrs : Array,
      required: true,
    },
    methods : {
      dataAjax() {

        let data3  = this.arrs[3];
          //分布
        this.titleFb = data3.title;
          // x轴数据
          let dataX = data3.datas[0].axisX.data;
          let dataX1 = dataX.slice(0,dataX.length/2);
          let dataX2 = dataX.slice(dataX.length/2);
          // color
          let seriesD = data3.datas[0].series;
          let seriesD1 = data3.datas[0].series[0].name;

          let seriesDbar1 = data3.datas[0].series[0].type;

          let colorsFirst=[],legendFirst=[];
          for(let i = 0 ; i < seriesD.length; i++){
            colorsFirst.push(seriesD[i].color)
          }
          for(let i = 0 ; i < seriesD.length; i++){
            legendFirst.push(seriesD[i].name)
          }
          // 判断series 有几条数据
          if(data3.datas[0].series.length == 1){
            // series data（1）数据
            let dataS1 = data3.datas[0].series[0].data;

            this.dataS3 = dataS1.slice(0,dataS1.length/2);

            this.dataS4 = dataS1.slice(dataS1.length/2);

            let myChart1 = echarts.init(document.getElementById('myChart1'));
            // 绘制图表
            myChart1.setOption({
              color: colorsFirst,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: legendFirst , x:'center',selectedMode:false
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                show: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: dataX1,
                  splitLine: {show:false},
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: true,
                    interval:0,
                    // 找到相同标识之后换行
                    // formatter:function(params) {
                    //   let newParamsName = "";
                    //   let arr=params.split('营');
                    //   for(let i = 0 ; i <arr.length ; i++){
                    //     let b = arr[i] + '\n';
                    //     newParamsName += b;
                    //   }
                    //   return newParamsName
                    // },
                    textStyle: {
                      color: 'black' //文字颜色
                    }

                  }
                }
              ], yAxis: [
                {
                  type: 'value',
                  show:false,//y轴的横线显示
                  splitLine: {show: false}, //y轴的网格显示
                }
              ], series: [
                {
                  name: seriesD1,
                  type: seriesDbar1,
                  barGap: 0,
                  data: this.dataS3,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: "{c}%",
                        color:'black'
                      }
                    }
                  },
                },
              ]
            });

            let myChart2 = echarts.init(document.getElementById('myChart2'));
            // 绘制图表
            myChart2.setOption({
              color: colorsFirst,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              toolbox: {
                show: true
              }, grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: dataX2,
                  splitLine:{show:false},
                  axisTick: {
                    show: false
                  },
                  axisLabel:{
                    interval: 0
                  }
                }
              ], yAxis: [
                {
                  type: 'value', interval: 0 ,
                  show:false,//y轴的横线显示
                  splitLine: {show: false}, //y轴的网格显示
                }
              ], series: [
                {
                  type: seriesDbar1,
                  barGap: 0,
                  data: this.dataS4,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: "{c}%",
                        color:'black'
                      }
                    }
                  },
                },
              ]
            })

            window.addEventListener("resize",function(){
              myChart1.resize();
              myChart2.resize();
            });
          }
          else {
            let seriesD2 = data3.datas[0].series[1].name;

            // series data（1）数据
            let dataS1 = data3.datas[0].series[0].data;
            this.dataS3 = dataS1.slice(0,dataS1.length/2);
            this.dataS4 = dataS1.slice(dataS1.length/2);
            // series data（2）数据
            let dataS2 = data3.datas[0].series[1].data;
            this.dataS5 = dataS2.slice(0,dataS2.length/2);
            this.dataS6 = dataS2.slice(dataS2.length/2);
            let myChart1 = echarts.init(document.getElementById('myChart1'));
            // 绘制图表
            myChart1.setOption({
              color: colorsFirst,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                containLabel: true
              },
              legend: {
                data: legendFirst , x:'center',selectedMode:false
              },
              toolbox: {
                show: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: dataX1,
                  splitLine: {show:false},
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: true,
                    interval:0,
                    // 找到相同标识之后换行
                    // formatter:function(params) {
                    //   let newParamsName = "";
                    //   let arr=params.split('|');
                    //   for(let i = 0 ; i <arr.length ; i++){
                    //     let b = arr[i] + '\n';
                    //     newParamsName += b;
                    //   }
                    //   return newParamsName
                    // },
                    textStyle: {
                      color: 'black' //文字颜色
                    }

                  }
                }
              ], yAxis: [
                {
                  type: 'value',
                  show:false,//y轴的横线显示
                  splitLine: {show: false}, //y轴的网格显示
                }
              ], series: [
                {
                  name: seriesD1,
                  type: seriesDbar1,
                  barGap: 0,
                  data: this.dataS3,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: "{c}%",
                        color:'black'
                      }
                    }
                  },
                },
                {
                  name: seriesD2,
                  type: seriesDbar1,
                  data: this.dataS5,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        // position: 'top',
                        formatter: "{c}%",
                        color:'black'
                      }
                    }
                  },
                }
              ]
            });

            let myChart2 = echarts.init(document.getElementById('myChart2'));
            // 绘制图表
            myChart2.setOption({
              color: colorsFirst,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                show: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: dataX2,
                  splitLine:{show:false},
                  axisTick: {
                    show: false
                  },
                  axisLabel:{
                    interval: 0
                  }
                }
              ], yAxis: [
                {
                  type: 'value', interval: 0 ,
                  show:false,//y轴的横线显示
                  splitLine: {show: false}, //y轴的网格显示
                }
              ], series: [
                {
                  type: seriesDbar1,
                  barGap: 0,
                  data: this.dataS4,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: "{c}%",
                        color:'black'
                      }
                    }
                  },
                },
                {
                  type: seriesDbar1,
                  data: this.dataS6,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        formatter: "{c}%",
                        color:'black'
                      }
                    }
                  },
                }
              ]
            })

            window.addEventListener("resize",function(){
              myChart1.resize();
              myChart2.resize();
            });
          }

      }
    }
  }
</script>

<style>
  /*门店cm-2*/
  .spread1{
    padding-bottom: 20px;
  }
  .spread1 .stroe {
    padding-top: 10px;
    padding-left: 45px;
  }
  .spread1 .stroe p{
    width: 20%;
    height: 100px;
    line-height: 100px;
    color: #fff;
    background-color: #8064a2;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }
  .spread1 .stroe1{
    padding-left: 45px;
    padding-right: 50px;
  }
  .spread1 .stroe1 .stroe1Chart1{
    border: 1px solid #d9d9d9;
    margin-bottom: 10px;
    padding-top: 20px;
  }
  .boxsStyle{
    background: #fff;
    margin: 27px 55px 10px 55px;
    border-radius: 5px;
  }
</style>


