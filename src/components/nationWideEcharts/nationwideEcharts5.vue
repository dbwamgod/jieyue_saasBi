<template>
  <div>
    <div class="money3 boxsStyle">
      <p class="money3-title">{{title}}</p>
      <div class="money3Charts">
        <ul>
          <li><div id="myChartLi7" :style="{width: '100%', height: '900px'}"></div></li>
          <li><div id="myChartLi8" :style="{width: '100%', height: '900px'}"></div></li>
          <li><div id="myChartLi9" :style="{width: '100%', height: '900px'}"></div></li>
        </ul>
      </div>
      <!--<div class="money3Table">-->
        <!--<table border="1" cellpadding="0" cellspacing="0" align="center">-->
          <!--<tr align="center">-->
            <!--<td width="100" bgcolor="yellow"></td>-->
            <!--<td v-for="item in datasTr">{{item}}</td>-->
          <!--</tr>-->
          <!--<tr align="center">-->
            <!--<td width="100">总门店个数</td>-->
            <!--<td v-for="item in datastd1">{{item}}</td>-->
          <!--</tr>-->
          <!--<tr align="center" bgcolor="yellow">-->
            <!--<td width="100">前44门店个数</td>-->
            <!--<td v-for="item in datastd1">{{item}}</td>-->
          <!--</tr>-->
          <!--<tr align="center">-->
            <!--<td width="100">后44门店个数</td>-->
            <!--<td v-for="item in datastd1">{{item}}</td>-->
          <!--</tr>-->
        <!--</table>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name:"nationwideEcharts5",
    data(){
      return {
        datasTr:[], datastd1:[],datastd2:[],datastd3:[],title:'',
        maxs:''
      }
    },
    mounted() {
      this.drawLine();
    },
    props:{
      arrs1 : Array,
      required: true,
    },
    methods : {
      drawLine() {
        console.log(this.arrs1);
        if(this.arrs1[8]){
          let data8  = this.arrs1[8];
          this.title = data8.title;
          let datajs = data8.datas[0].series[0].data; // data总条数
          // let datajs = datajsR.reverse();

          let dataTl = data8.datas[0].axisX.data;

          // let dataTl = dataTlR.reverse();
          let colors = data8.datas[0].series[0].color;

          //分别是1 2 3 echarts data数据
          let datajsd = datajs.length / 3;
          this.maxs=datajs[0];
          let datajsd1 = datajs.slice(0, datajsd);
          let datajsd2 = datajs.slice(datajsd, datajsd * 2);
          let datajsd3 = datajs.slice(datajsd * 2);


          //分别是1 2 3 echarts y轴name数据
          let datajsT = dataTl.length / 3;
          let datajsT1 = dataTl.slice(0, datajsT);
          let datajsT2 = dataTl.slice(datajsT, datajsT * 2);
          let datajsT3 = dataTl.slice(datajsT * 2);
          let myChart1 = echarts.init(document.getElementById('myChartLi7'));
          myChart1.setOption({
              color:colors,
              title: {text: '',},
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {   //绘图区调整
                left: "22%",  //左留白
                bottom: '0%',
                right: '15%',
                top: '0',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'value',
                  boundaryGap: false,
                  position: 'end',
                  show: false,
                  max:this.maxs,nameTextStyle:{fontFamily:'Microsoft YaHei'},
                  axisTick: {
                    show: false,interval: 'auto',
                  }
                }
              ],
              yAxis: [
                {
                  type: 'category',
                  data: datajsT1,
                  axisLine: {show: false},     //坐标轴
                  axisTick: [{    //坐标轴小标记
                    show: true
                  }],
                  axisLabel: {
                    interval: 0, // 让文本全部显示
                    textStyle: {
                      fontSize: '13'
                    }
                  },
                  inverse: true, //实现正着的需求
                  splitArea: {show: false} //带有阴影
                }
              ],
              series: [
                {
                  type: 'bar',
                  tooltip: {show: true},
                  barMinHeight:0,  //最小柱高
                  barWidth: 14,  //柱宽度
                  barMaxWidth:20,   //最大柱宽度
                  max:this.maxs,
                  barCateGoryGap:16,
                  data: datajsd1,
                  label: {
                    normal: { //柱状颜色
                      show: true,formatter: "{c}%",
                      position: 'right', //控制文字在圆内,
                      textStyle: {color: 'black', fontSize: "12"},
                    }
                  }
                }
              ],
            }
          );

          // 第二个echarts图
          let myChart2 = echarts.init(document.getElementById('myChartLi8'));
          // 绘制图表
          myChart2.setOption({
            color:colors,
            title: {text: '',},
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {   //绘图区调整
              left: "15%",  //左留白
              bottom: '0%',
              right: '15%',
              top: '0',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value',
                boundaryGap: false,
                position: 'end',
                show: false,
                max:this.maxs,
              }
            ],
            yAxis: [
              {
                type: 'category',
                data: datajsT2,
                axisLine: {show: false},     //坐标轴
                axisTick: [{    //坐标轴小标记
                  show: true
                }],
                axisLabel: {
                  interval: 0, // 让文本全部显示
                  textStyle: {
                    fontSize: '13'
                  }
                },
                inverse: true, //实现正着的需求
                splitArea: {show: false} //带有阴影
              }
            ],
            series: [
              {
                type: 'bar',
                tooltip: {show: true},
                barMinHeight:0,  //最小柱高
                barWidth: 14,  //柱宽度
                barMaxWidth:20,   //最大柱宽度
                barCateGoryGap:16,
                max:this.maxs,
                data: datajsd2,
                label: {
                  normal: { //柱状颜色
                    show: true, formatter: "{c}%",
                    position: 'right', //控制文字在圆内
                    textStyle: {color: 'black', fontSize: "12"},
                  }
                }
              }
            ],
          });


          // 第三个echarts图
          let myChart3 = echarts.init(document.getElementById('myChartLi9'));
          // 绘制图表
          myChart3.setOption({
            color:colors,
            title: {text: '',},
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {   //绘图区调整
              left: "10%",  //左留白
              bottom: '0%',
              right: '30%',
              top: '0',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value',
                boundaryGap: false,
                position: 'end',
                show: false,
                max:this.maxs,
              }
            ],
            yAxis: [
              {
                type: 'category',
                data: datajsT3,
                axisLine: {show: false},     //坐标轴
                axisTick: [{    //坐标轴小标记
                  show: true
                }],
                axisLabel: {
                  interval: 0, // 让文本全部显示
                  textStyle: {
                    fontSize: '13'
                  }
                },
                inverse: true, //实现正着的需求
                splitArea: {show: false} //带有阴影
              }
            ],
            series: [
              {
                type: 'bar',
                tooltip: {show: true},
                barMinHeight:0,  //最小柱高
                barWidth: 14,  //柱宽度
                barMaxWidth:20,   //最大柱宽度
                // barCategoryGap:'90%',
                max:this.maxs,
                barCateGoryGap:16,
                data: datajsd3,
                label: {
                  normal: { //柱状颜色
                    show: true, formatter: "{c}%",
                    position: 'right', //控制文字在圆内
                    textStyle: {color: 'black', fontSize: "12"},
                  }
                }
              }
            ],
          });
          window.addEventListener("resize", function (){
            myChart1.resize();
            myChart2.resize();
            myChart3.resize();
          });
        }
          }
      },
      // drawTable() {
      //   this.datasTr = ['渝北','渝北','渝北','渝北','渝北','海南一','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北',
      //     '渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北','渝北'];
      //   this.datastd1=[3,4,5,6,7,8,1,1,1,1,1,3,4,5,6,7,8,1,1,1,1,1,3,4,5,6,7,8,1,1,1,1,1,4,5,6];
      //   this.datastd2=[3,4,5,6,7,8,1,1,1,1,1,3,4,5,6,7,8,1,1,1,1,1,3,4,5,6,7,8,1,1,1,1,1,4,5,6];
      //   this.datastd3=[3,4,5,6,7,8,1,1,1,1,1,3,4,5,6,7,8,1,1,1,1,1,3,4,5,6,7,8,1,1,1,1,1,4,5,6];
      // },
  }
</script>

<style>
  /*全国营业部c-m2排名*/
  .boxsStyle{
    background: #fff;
    margin: 43px 50px 43px 50px;
    border-radius: 5px;
  }
  .money3{
    position: relative;
  }
  .money3 .money3-title{
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
    box-shadow: 7px 7px 5px #adadad;
  }
  .money3 .money3Charts{
    padding-top: 100px;
  }
  .money3 .money3Charts ul{
    display: flex;
    list-style: none;
  }
  .money3 .money3Charts ul li{
    flex: 1;
    text-align: center;
    margin-left: 22px;
  }

  /*.money3 .money3Table{*/
    /*padding-bottom: 30px;*/
  /*}*/
</style>


