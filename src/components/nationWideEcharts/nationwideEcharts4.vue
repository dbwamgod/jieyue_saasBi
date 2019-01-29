<template>
  <div>
    <div class="money2 boxsStyle">
      <p class="money2-title">各大区c-m2金额占比排名</p>
      <div class="money2Charts">
        <ul class="money2ChartsUl1">
          <li>
            <div id="myChartLi1" :style="{width: '100%', height: '280px'}"></div>
            <!--<div class="money2ChartsUl1-1">-->
              <!--<p>落后的部分:..............</p>-->
              <!--<p>1.甘宁需要重点跟进:..............</p>-->
              <!--<p>2.新一需要重点关注:................</p>-->
              <!--<p>3.内蒙需要重点关注:...........</p>-->
            <!--</div>-->
          </li>
          <li><div id="myChartLi2" :style="{width: '100%', height: '280px'}"></div>
            <!--<div class="money2ChartsUl1-2">-->
              <!--<p>落后的部分:..............</p>-->
              <!--<p>1.甘宁需要重点跟进:..............</p>-->
              <!--<p>2.新一需要重点关注:................</p>-->
              <!--<p>3.内蒙需要重点关注:...........</p>-->
            <!--</div>-->
          </li>
        </ul>
        <ul>
          <li><div id="myChartLi3" :style="{width: '100%', height: '280px'}"></div></li>
          <li><div id="myChartLi4" :style="{width: '100%', height: '280px'}"></div></li>
        </ul>
        <ul>
          <li><div id="myChartLi5" :style="{width: '100%', height: '280px'}"></div></li>
          <li><div id="myChartLi6" :style="{width: '100%', height: '280px'}"></div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "nationwideEcharts4",
    data() {
      return {
        seriesFirst:[], ajaxDataFirst:[], title2:''
      }
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
        let data2  = this.arrs1[2];
        // 第一个echearts
        this.title = data2.title; // 标题

        this.data1 =data2.datas[0];// y x serise
        let ajaxDataFirst = this.data1.series;
        let max1 = Math.ceil(this.data1.series[0].data[0]);
        let seriesFirst = [], colorsFirst = [], legendFirst = [];

        ajaxDataFirst.forEach((series) => {
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
          })
        });
        // color
        for (let i = 0; i < this.data1.series.length; i++) {
          colorsFirst.push(this.data1.series[i].color)
        }
        // legend
        for (let i = 0; i < this.data1.series.length; i++) {
          legendFirst.push(this.data1.series[i].name)
        }
        let myChart1 = echarts.init(document.getElementById('myChartLi1'));
        myChart1.setOption({
          color: colorsFirst,
          title: {
            text: this.title, x: 'center', borderWidth: 3, padding: 10, textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#fff'          // 主标题文字颜色
            },
            backgroundColor: '#FFA748'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: legendFirst, x: '82%', orient: 'vertical',
          },
          toolbox: {
            show: true,
            featureTitle: {
              markUndo: '删除辅助线'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: this.data1.axisX.data,
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
              show: true,//y轴的横线显示
              splitLine: {show: false}, //y轴的网格显示
              min: 0,
              max: max1, minInterval: 1,
              axisLabel: {
                formatter: '{value} %'
              },
            }
          ], series: seriesFirst
        })
        // 第个echearts二个
        let data3 = this.arrs1[3];
        if (undefined == data3) {
          ;
          this.title2 = ''
        } else {
          this.title2 = data3.title; // 标题
          this.data2 = data3.datas[0];// y x serise
          let ajaxDataSecond = this.data2.series;
          let max2 = Math.ceil(this.data2.series[0].data[0]);
          let seriesSecond = [], colorsSecond = [], legendSecond = [];
          ajaxDataSecond.forEach((series) => {
            seriesSecond.push({
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
            })
          });

          // color
          for (let i = 0; i < this.data2.series.length; i++) {
            colorsSecond.push(this.data2.series[i].color)
          }
          // legend
          for (let i = 0; i < this.data2.series.length; i++) {
            legendSecond.push(this.data2.series[i].name)
          }

          let myChart2 = echarts.init(document.getElementById('myChartLi2'));
          myChart2.setOption({
            color: colorsSecond,
            title: {
              text: this.title2, x: 'center', borderWidth: 3, padding: 10, textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#fff'          // 主标题文字颜色
              },
              backgroundColor: '#FFA748'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: legendSecond, x: '82%', orient: 'vertical',
            },
            toolbox: {
              show: true,
              featureTitle: {
                markUndo: '删除辅助线'
              }
            },
            xAxis: [
              {
                type: 'category',
                data: this.data2.axisX.data,
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
                show: true,//y轴的横线显示
                splitLine: {show: false}, //y轴的网格显示
                min: 0,
                max: max2, minInterval: 1,//设置为正整数
                axisLabel: {
                  formatter: '{value} %'
                },
              }
            ], series: seriesSecond
          })
          window.addEventListener("resize", function () {
            myChart2.resize();
          });
        }

        // 第个echearts三个
        let data4 = this.arrs1[4];
        if (undefined == data4) {
          return
        } else {
          this.title3 = data4.title; // 标题
          this.data3 = data4.datas[0];// y x serise
          let ajaxDataThree = this.data3.series;
          let max3 = parseInt(this.data3.series[0].data[0]) + 1;
          let seriesThree = [], colorsThree = [], legendThree = []
          ajaxDataThree.forEach((series) => {
            seriesThree.push({
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
            })
          });
          // color
          for (let i = 0; i < this.data3.series.length; i++) {
            colorsThree.push(this.data3.series[i].color)
          }
          // legend
          for (let i = 0; i < this.data3.series.length; i++) {
            legendThree.push(this.data3.series[i].name)
          }
          let myChart3 = echarts.init(document.getElementById('myChartLi3'));
          myChart3.setOption({
            color: colorsThree,
            title: {
              text: this.title3, x: 'center', borderWidth: 3, padding: 10, textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#fff'          // 主标题文字颜色
              },
              backgroundColor: '#FFA748'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: legendThree, x: '82%', orient: 'vertical',
            },
            toolbox: {
              show: true,
              featureTitle: {
                markUndo: '删除辅助线'
              }
            },
            xAxis: [
              {
                type: 'category',
                data: this.data3.axisX.data,
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
                show: true,//y轴的横线显示
                splitLine: {show: false}, //y轴的网格显示
                min: 0,
                max: max3, minInterval: 1,
                axisLabel: {
                  formatter: '{value} %'
                },
              }
            ], series: seriesThree
          })
          window.addEventListener("resize", function () {
            myChart3.resize();
          });
        }

        // 第个echearts四个
        let data5 = this.arrs1[5];
        this.title4 = data5.title; // 标题
        this.data4 = data5.datas[0];// y x serise
        let ajaxDataFour = this.data4.series;
        let max4 = Math.ceil(this.data4.series[0].data[0]);
        let seriesFour = [], colorsFour = [], legendFour = []
        ajaxDataFour.forEach((series) => {
          seriesFour.push({
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
          })
        });
        // color
        for (let i = 0; i < this.data4.series.length; i++) {
          colorsFour.push(this.data4.series[i].color)
        }
        // legend
        for (let i = 0; i < this.data4.series.length; i++) {
          legendFour.push(this.data4.series[i].name)
        }
        let myChart4 = echarts.init(document.getElementById('myChartLi4'));
        myChart4.setOption({
          color: colorsFour,
          title: {
            text: this.title4, x: 'center', borderWidth: 3, padding: 10, textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#fff'          // 主标题文字颜色
            },
            backgroundColor: '#FFA748'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: legendFour, x: '82%', orient: 'vertical',
          },
          toolbox: {
            show: true,
            featureTitle: {
              markUndo: '删除辅助线'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: this.data4.axisX.data,
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
              show: true,//y轴的横线显示
              splitLine: {show: false}, //y轴的网格显示
              min: 0,
              max: max4, minInterval: 1,
              axisLabel: {
                formatter: '{value} %'
              },
            }
          ], series: seriesFour
        })
        // 第个echearts五个
        let data6 = this.arrs1[6];
        this.title5 = data6.title; // 标题
        this.data5 = data6.datas[0];// y x serise
        let ajaxDataFive = this.data5.series;
        let max5 = Math.ceil(this.data5.series[0].data[0]);
        let seriesFive = [], colorsFive = [], legendFive = []
        ajaxDataFive.forEach((series) => {
          seriesFive.push({
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
          })
        });
        // color
        for (let i = 0; i < this.data5.series.length; i++) {
          colorsFive.push(this.data5.series[i].color)
        }
        // legend
        for (let i = 0; i < this.data5.series.length; i++) {
          legendFive.push(this.data5.series[i].name)
        }
        let myChart5 = echarts.init(document.getElementById('myChartLi5'));
        myChart5.setOption({
          color: colorsFive,
          title: {
            text: this.title5, x: 'center', borderWidth: 3, padding: 10, textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#fff'          // 主标题文字颜色
            },
            backgroundColor: '#FFA748'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: legendFive, x: '82%', orient: 'vertical',
          },
          toolbox: {
            show: true,
            featureTitle: {
              markUndo: '删除辅助线'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: this.data5.axisX.data,
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
              show: true,//y轴的横线显示
              splitLine: {show: false}, //y轴的网格显示
              min: 0,
              max: max5, minInterval: 1,
              axisLabel: {
                formatter: '{value} %'
              },
            }
          ], series: seriesFive
        })
        // 第个echearts六个
        let data7 = this.arrs1[7];
        this.title6 = data7.title; // 标题
        this.data6 = data7.datas[0];// y x serise
        let ajaxDataSix = this.data6.series;
        let max6 = Math.ceil(this.data6.series[0].data[0]);

        let seriesSix = [], colorsSix = [], legendSix = []
        ajaxDataSix.forEach((series) => {
          seriesSix.push({
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
          })
        });
        // color
        for (let i = 0; i < this.data6.series.length; i++) {
          colorsSix.push(this.data6.series[i].color)
        }
        // legend
        for (let i = 0; i < this.data6.series.length; i++) {
          legendSix.push(this.data6.series[i].name)
        }
        let myChart6 = echarts.init(document.getElementById('myChartLi6'));
        myChart6.setOption({
          color: colorsSix,
          title: {
            text: this.title6, x: 'center', borderWidth: 3, padding: 10, textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#fff'          // 主标题文字颜色
            },
            backgroundColor: '#FFA748'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: legendSix, x: '82%', orient: 'vertical',
          },
          toolbox: {
            show: true,
            featureTitle: {
              markUndo: '删除辅助线'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: this.data6.axisX.data,
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
              show: true,//y轴的横线显示
              splitLine: {show: false}, //y轴的网格显示
              min: 0,
              max: max6, minInterval: 1,
              axisLabel: {
                formatter: '{value} %'
              },
              // axisLabel: {
              // formatter: function (value) {
              //   var texts = [];
              //   console.log(value);
              //   if (value == 0) {
              //     texts.push('0%');
              //   }
              //   else if (value <= 1) {
              //     texts.push('1%');
              //   }
              //   else if (value <= 2) {
              //     texts.push('2%');
              //   }
              //   else if (value <= 3) {
              //     texts.push('3%');
              //   }
              //   else {
              //     texts.push(max6+'%');
              //   }
              //   return texts;
              //
              // }
              // }
            }
          ], series: seriesSix
        })
        window.addEventListener("resize", function () {
          myChart1.resize();
          myChart4.resize();
          myChart5.resize();
          myChart6.resize();
        });

      }
    }
  }
</script>

<style>
  /*各大区c-m2金额占比排名*/
  .boxsStyle{
    background: #fff;
    margin: 43px 50px 43px 50px;
    border-radius: 5px;
  }
  .money2{
    position: relative;
    padding-top: 18px;
  }
  .money2 .money2-title{
    font-size: 20px;
    padding: 4px 60px;
    background-color: #c00000;
    color: #fff;
    text-align: center;
    border:0px solid red;
    position: absolute;
    top: 5px;
    left: 45px;
    border-top-left-radius: 1em 1.5em;
    border-bottom-right-radius: 1em 1.5em;
    box-shadow: 10px 6px 5px #adadad;
  }
  .money2ChartsUl1{
    padding-top: 50px;
    padding-bottom: 30px;
  }
  /*.money2ChartsUl1 .money2ChartsUl1-1{*/
    /*width: 50%;*/
    /*border: 10px solid black;*/
    /*margin-left: 30px;*/
  /*}*/
  .money2ChartsUl1 .money2ChartsUl1-1 p{
    text-align: left;
    font-size: 20px;
    margin-left: 18px;
  }
  /*.money2ChartsUl1 .money2ChartsUl1-2{*/
    /*width: 50%;*/
    /*border: 10px solid black;*/
    /*margin-left: 30px;*/
  /*}*/
  .money2ChartsUl1 .money2ChartsUl1-2 p{
    text-align: left;
    font-size: 20px;
    margin-left: 18px;
  }
  .money2 .money2Charts ul{
    display: flex;
    list-style: none;
  }
  .money2 .money2Charts ul li{
    flex: 6;
  }

</style>


