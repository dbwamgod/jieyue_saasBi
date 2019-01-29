<template>
  <div>
    <div class="spread5 boxsStyle">
      <div class="stroe">
        <p>{{this.title1}}</p>
      </div>
      <div class="stroe1">
        <div id="myChart7" :style="{width: '100%', height: '300px'}" class="stroe1Chart1"></div>
        <div id="myChart8"  :style="{width: '100%', height: '300px'}" class="stroe1Chart1"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name:"regionEcharts6",
    data(){
      return {
        title1:''
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
          let data9 = this.arrs[9];
          this.title1 = data9.title;
          let seriesD = data9.datas[0].series;

          let colorsFirst=[],legendFirst=[],seriesFirst=[];
          for(let i = 0 ; i < seriesD.length; i++){
            colorsFirst.push(seriesD[i].color);
          }

          for(let i = 0 ; i < seriesD.length; i++){
            legendFirst.push(seriesD[i].name)
          }
          seriesD.forEach((series)=>{
            seriesFirst.push({
              name: series.name,
              type: series.type,
              barGap: 0,
              stack: '总量',
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
          if(seriesD.length == 3){
            let seriesN1 = res.data9.datas[0].series[0].name;
            let seriesN2 = data9.datas[0].series[1].name;
            let seriesN3 = data9.datas[0].series[2].name;

            //分别是1 2 3 echarts data数据
            let datajs = data9.datas[0].series[0].data; // data总条数(0)
            let datajsd = datajs.length / 2;
            let datajsd1 = datajs.slice(0, datajsd);
            let datajsd2 = datajs.slice(datajsd);

            let datajsD = data9.datas[0].series[1].data; // data总条数(1)
            let datajsdQ = datajsD.length / 2;
            let datajsd3 = datajsD.slice(0, datajsdQ);
            let datajsd4 = datajsD.slice(datajsdQ);

            let datajsF = data9.datas[0].series[2].data; // data总条数(2)
            let datajsdW = datajsF.length / 2;
            let datajsd5 = datajsF.slice(0, datajsdW);
            let datajsd6 = datajsF.slice(datajsdW);



            //分别是1 2 3 echarts X轴name数据
            let dataTl = data9.datas[0].axisX.data;
            let datajsT = dataTl.length / 2;
            let datajsT1 = dataTl.slice(0, datajsT);
            let datajsT2 = dataTl.slice(datajsT);

            let myChart7 = echarts.init(document.getElementById('myChart7'));
            myChart7.setOption({
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              color:colorsFirst,
              legend: {
                data:legendFirst,selectedMode:false
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data : datajsT1,
                  axisTick: {
                    show: false
                  },
                  axisLabel:{
                    interval:0
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  show:false
                }
              ],
              series : [

                {
                  name:seriesN1,
                  type:'bar',
                  stack: '总量',
                  data: datajsd1,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                    }
                  },barCategoryGap : '70%',
                },
                {
                  name:seriesN2,
                  type:'bar',
                  stack: '总量',
                  data:datajsd3,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%"
                      // position: 'insideRight'
                    }
                  },
                },
                {
                  name:seriesN3,
                  type:'bar',
                  stack: '总量',
                  data:datajsd5,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%"
                      // position: 'insideRight'
                    }
                  },
                },
              ]
            });
            let myChart8 = echarts.init(document.getElementById('myChart8'));
            myChart8.setOption({
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              color:colorsFirst,
              // legend: {
              //   data:['16号回款','1号回款','多账单日回款','累计回款率'],selectedMode:false
              // },
              grid: {
                left: '0%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data : datajsT2,
                  axisTick: {
                    show: false
                  },
                  axisLabel:{
                    interval:0
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  show:false
                }
              ],
              series : [

                {
                  // name:'16号回款',
                  type:'bar',
                  stack: '总量',
                  data: datajsd2,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                    }
                  },barCategoryGap : '70%',
                },
                {
                  // name:'1号回款',
                  type:'bar',
                  stack: '总量',
                  data:datajsd4,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%"
                      // position: 'insideRight'
                    }
                  },
                },
                {
                  // name:'多账单日回款',
                  type:'bar',
                  stack: '总量',
                  data:datajsd6,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%"
                      // position: 'insideRight'
                    }
                  },
                },
              ]
            });
            window.addEventListener("resize",function(){
              myChart7.resize();
              myChart8.resize();
            });
          }else if(seriesD.length == 4){
            let seriesN1 =data9.datas[0].series[0].name;
            let seriesN2 = data9.datas[0].series[1].name;
            let seriesN3 = data9.datas[0].series[2].name;
            let seriesN4 = data9.datas[0].series[3].name;

            //分别是1 2 3 echarts data数据
            let datajs = data9.datas[0].series[0].data; // data总条数(0)
            let datajsd = datajs.length / 2;
            let datajsd1 = datajs.slice(0, datajsd);
            let datajsd2 = datajs.slice(datajsd);

            let datajsD = data9.datas[0].series[1].data; // data总条数(1)
            let datajsdQ = datajsD.length / 2;
            let datajsd3 = datajsD.slice(0, datajsdQ);
            let datajsd4 = datajsD.slice(datajsdQ);

            let datajsF = data9.datas[0].series[2].data; // data总条数(2)
            let datajsdW = datajsF.length / 2;
            let datajsd5 = datajsF.slice(0, datajsdW);
            let datajsd6 = datajsF.slice(datajsdW);

            let datajsG = data9.datas[0].series[3].data; // data总条数(3)
            let datajsdE = datajsF.length / 2;
            let datajsd7 = datajsF.slice(0, datajsdW);
            let datajsd8 = datajsF.slice(datajsdW);

            //分别是1 2 3 echarts X轴name数据
            let dataTl = data9.datas[0].axisX.data;
            let datajsT = dataTl.length / 2;
            let datajsT1 = dataTl.slice(0, datajsT);
            let datajsT2 = dataTl.slice(datajsT);

            let myChart7 = echarts.init(document.getElementById('myChart7'));
            myChart7.setOption({
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              color:colorsFirst,
              legend: {
                data:legendFirst,selectedMode:false
              },
              grid: {
                left: '0%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data : datajsT1,
                  axisTick: {
                    show: false
                  },
                  axisLabel:{
                    interval: 0
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  show:false
                }
              ],
              series : [

                {
                  name:seriesN1,
                  type:'bar',
                  stack: '总量',
                  data: datajsd1,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black'
                    }
                  },barCategoryGap : '70%',
                },
                {
                  name:seriesN2,
                  type:'bar',
                  stack: '总量',
                  data:datajsd3,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black'
                      // position: 'insideRight'
                    }
                  },
                },
                {
                  name:seriesN3,
                  type:'bar',
                  stack: '总量',
                  data:datajsd5,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black'
                      // position: 'insideRight'
                    }
                  },
                },
                {
                  name:seriesN4,
                  type:'bar',
                  stack: '总量',
                  data:datajsd7,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      position: 'top',
                      color:'black'
                    }
                  },
                },
              ]
            });
            let myChart8 = echarts.init(document.getElementById('myChart8'));
            myChart8.setOption({
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              color:colorsFirst,
              // legend: {
              //   data:['16号回款','1号回款','多账单日回款','累计回款率'],selectedMode:false
              // },
              grid: {
                left: '0%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data : datajsT2,
                  axisTick: {
                    show: false
                  },
                  axisLabel:{
                    interval: 0
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  show:false
                }
              ],
              series : [

                {
                  // name:'16号回款',
                  type:'bar',
                  stack: '总量',
                  data: datajsd2,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black'
                    }
                  },barCategoryGap : '70%',
                },
                {
                  // name:'1号回款',
                  type:'bar',
                  stack: '总量',
                  data:datajsd4,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black'
                      // position: 'insideRight'
                    }
                  },
                },
                {
                  // name:'多账单日回款',
                  type:'bar',
                  stack: '总量',
                  data:datajsd6,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black'
                      // position: 'insideRight'
                    }
                  },
                },
                {
                  // name:'累计回款率',
                  type:'bar',
                  stack: '总量',
                  data:datajsd8,
                  label: {
                    normal: {
                      show: true,
                      formatter:"{c}%",
                      color:'black',
                      position: 'top'
                    }
                  },
                },
              ]
            });
            window.addEventListener("resize",function(){
              myChart7.resize();
              myChart8.resize();
            });
          }
      },
    }
  }
</script>

<style>
  .boxsStyle{
    background: #fff;
    margin: 43px 50px 43px 50px;
    border-radius: 5px;
  }
  /*门店入流*/
  .spread5{
    padding-bottom: 20px;
  }
  .spread5 .stroe{
    padding-top: 10px;
    padding-left: 45px;
  }
  .spread5 .stroe p {
    width: 20%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: #92d050;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  .spread5 .stroe1{
    padding-left: 45px;
    padding-right: 50px;
  }
  .spread5 .stroe1 .stroe1Chart1{
    border: 1px solid #d9d9d9;
    margin-bottom: 10px;
    padding-top: 20px;
  }
</style>


