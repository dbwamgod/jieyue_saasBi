<template>
  <div>
    <div class="spread boxsStyle">
      <div class="fenbu1">
        <div class="fenbu1-1">{{this.titleFb}}</div>
        <div class="fenbu1-2">最差的分部是{{this.dataWorst}}:{{this.nameFb}}{{this.valueFb}}{{this.unitFb}}</div>
        <div class="fenbu1-3">共{{this.dataEC}}个部分</div>
      </div>
      <div class="fenbu2"><div id="myChart" :style="{width: '100%', height: '260px'}"></div></div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name:"regionEcharts1",
    data(){
      return {
        titleFb:'',nameFb:'',valueFb:'',unitFb:'',dataEC:'',dataWorst:''
      }
    },
    props:{
      arrs : Array,
      required: true,
    },
    watch:{
        // arrs:function(){
        //   console.log(this.arrs[1],"----1122211----")
        // }
    },
    mounted() {
     this.dataAjax()
    },
    methods : {
      dataAjax() {
          let data1  = this.arrs[1];
        //分布
          this.titleFb = data1.title;
          this.nameFb = data1.datas[0].name;
          this.valueFb = data1.datas[0].value;
          this.unitFb =data1.datas[0].unit;

          // echarts
          let colorsFirst=[],legendFirst=[],seriesSecond=[];
        let data2  = this.arrs[2];
          let dataE =  data2.datas[0].axisX.data;
         this.dataWorst = dataE[0];
          let seriesD = data2.datas[0].series;
          this.dataEC = dataE.length // changdu
          for(let i = 0 ; i < seriesD.length; i++){
            legendFirst.push(seriesD[i].name)
          }
          for(let i = 0 ; i < seriesD.length; i++){
            colorsFirst.push(seriesD[i].color)
          }
          seriesD.forEach((series)=>{
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

          let myChart = echarts.init(document.getElementById('myChart'));
          // 绘制图表
          myChart.setOption({
            color: colorsFirst,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: legendFirst,x:'center'
            },
            toolbox: {
              show: true
            },
            grid:{
              y2:20
            },
            xAxis: [
              {
                type: 'category',
                data: dataE,
                splitLine: {show:false},
                axisTick: {
                  show: false
                }
              }
            ], yAxis: [
              {
                type: 'value',
                show:false,//y轴的横线显示
                splitLine: {show: false}, //y轴的网格显示
              }
            ], series:seriesSecond
            //   [
            //   {
            //     name: '目标',
            //     type: 'bar',
            //     barGap: 0,
            //     data: [1.2, 1.3, 1.3, 1.3, 1.3, 1.3, 1.5],
            //     itemStyle: {
            //       normal: {
            //         label: {
            //           show: true,
            //           position: 'top',
            //           formatter: "{c}%",
            //           color:'black'
            //         }
            //       }
            //     },
            //   },
            //   {
            //     name: 'C M2',
            //     type: 'bar',
            //     data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.4, 2.5],
            //     itemStyle: {
            //       normal: {
            //         label: {
            //           show: true,
            //           formatter: "{c}%",
            //           color:'black'
            //         }
            //       }
            //     },
            //   }
            //
            // ]
          })
          window.addEventListener("resize",function(){
            myChart.resize();
          });
      }
    }
  }
</script>

<style>
  /*分布C-M2*/
  .spread{
    height: 300px;
    padding-top: 20px;
    padding-bottom: 50px;
  }
  .spread .fenbu1{
    width: 25%;
    float: left;
    margin-left: 45px;
    padding-top: 9px;
    text-align: center;
  }
  .spread .fenbu1 .fenbu1-1{
    width: 80%;
    height: 100px;
    line-height: 100px;
    background-color: #8064a2;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  .spread .fenbu1 .fenbu1-2{
    width: 80%;
    height: 50px;
    font-size: 16px;
    margin-top: 59px;
    margin-bottom: 2.5rem
  }
  .spread .fenbu1 .fenbu1-3{
    width: 80%;
    height: 69px;
    line-height: 69px;
    background-color: #8064a2;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  /*.spread .fenbu2{*/
  /*height: 95%;*/
  /*width: 75%;*/
  /*float: left;*/
  /*margin-top: 40px;*/
  /*border: 1px solid red;*/
  /*}*/
  .spread .fenbu2 div{
    padding-top: 30px;
  }
  .boxsStyle{
    background: #fff;
    margin: 27px 55px 10px 55px;
    border-radius: 5px;
  }
  @media screen and (min-width:1200px){
    .spread .fenbu2{
      width: 69%;
      float: left;
      margin-top: 26px;
      border: 1px solid #d9d9d9;    height: 100%;
    }
  }
  @media screen and (min-width:700px)and (max-width:1200px){
    .spread .fenbu2{
      /*height: 92%;*/
      width: 68%;
      float: left;
      margin-top: 40px;
      border: 1px solid #d9d9d9;    height: 100%;
    }
  }




</style>


