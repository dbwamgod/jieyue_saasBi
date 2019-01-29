<template>
  <div>
    <div class="spread4 boxsStyle">
      <div class="payment1">
        <p>{{this.title1}}</p>
        <div class="payment1Div">
          <!--<div class="paymentTable">-->
          <!--<table cellpadding="0" cellspacing="0" width="300px" height="100px">-->
          <!--<tr align="center" height="100px"><td > <span class="tdone"></span>华北区</td></tr>-->
          <!--<tr align="center"><td> <span class="tdone"></span>平日入流率</td></tr>-->
          <!--<tr align="center"><td> <span class="tdone"></span>多日账单入流率</td></tr>-->
          <!--<tr align="center"><td> <span class="tdone"></span>16号账单率</td></tr>-->
          <!--</table>-->
          <!--</div>-->
          <div id="myChart9" :style="{width: '100%', height: '240px'}" ></div>
        </div>
      </div>
      <div class="payment2">{{this.title2}}</div>
      <div class="payment3">
        <div id="myChart6" :style="{width: '100%', height: '260px'}" class="stroe1Chart1"></div>
      </div >
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name:"regionEcharts5",
    data(){
      return {
        title1:'',title2:''
      }
    },
    mounted() {
      this.dataAjax()
    },
    props:{
      arrs : Array,
      required: true,
    },
    methods : {
      dataAjax() {
          let data7 = this.arrs[7];
          this.title1 = data7.title;
          let seriesD = data7.datas[0].series;
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
              barCategoryGap : '50%',
              stack: '总量',
              data: series.data,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: "{c}%",
                    color: 'black'
                  },
                }
              },
            })
          });

          let serData =[]
          for(let i = 0 ; i<seriesD.length; i++){
            serData.push(seriesD[i].data)
          }
          let max = Math.max.apply(null, serData);

          let myChart9 = echarts.init(document.getElementById('myChart9'));
          myChart9.setOption({
            tooltip : {
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                trigger: 'axis',
              }
            },
            color: colorsFirst,

            legend: {
              data: legendFirst ,y:50,orient:'vertical',x:20,padding: 30,
            },
            grid: {
              top:'75%',
              left: '40%',
              right: '0%',
              bottom: '0%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',show:false,
                axisTick: {
                  show: false
                },

              }
            ],
            yAxis : [
              {
                type : 'value',
                show:false,
                max:max,
                min:0
              },
            ],
            series :seriesFirst
          });

          window.addEventListener("resize",function(){
            myChart9.resize();
          });
          // 第二个
          let data8 = this.arrs[8];
          this.title2 = data8.title;
          let seriesQ = data8.datas[0].series;
          let datax = data8.datas[0].axisX.data;
          let colorsFirst1=[],legendFirst1=[],seriesSecond=[];
          for(let i = 0 ; i < seriesQ.length; i++){
            colorsFirst1.push(seriesQ[i].color);
          }

          for(let i = 0 ; i < seriesQ.length; i++){
            legendFirst1.push(seriesQ[i].name)
          }
          seriesQ.forEach((series)=>{
            seriesSecond.push({
              name: series.name,
              type: series.type,
              barGap: 0,
              barCategoryGap : '45%',
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
          let myChart6 = echarts.init(document.getElementById('myChart6'));
          myChart6.setOption({
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            color:colorsFirst1,
            legend: {
              data:legendFirst1,y:20
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
                data : datax,
                axisTick: {
                  show: false
                }
              }
            ],
            yAxis : [
              {
                type : 'value',
                show:false
              }
            ],
            series : seriesSecond

          })
          window.addEventListener("resize",function(){
            myChart6.resize();
          });
      },
    }
  }
</script>

<style>
  /*大区入流*/
  .spread4{
    height: 450px;
  }
  .spread4 .payment1{
    float: left;
    width: 30%;
    margin-top: 40px;
  }
  .spread4 .payment1 p{
    width: 35%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin: 0;
    margin-left: 45px;
    background-color: #92d050;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  .spread4 .payment1 .payment1Div{
    width: 100%;
    margin-top: 25px;
    margin-left: 45px;
    border: 1px solid #d9d9d9;
    padding-top: 19px;
  }

  .spread4 .payment2{
    float: left;
    height: 8px;
    margin-top: 81px;
    padding-left: 30px;
    padding-right: 48px;
    padding-top: 16px;
    padding-bottom: 175px;
    background-color: #92d050;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    width: 15px;
    margin-left: 56px;
  }
  .spread4 .payment3{
    float: left;
    margin-left: 33px;
    width: 68%;
    margin-top: 80px;
    border: 1px solid #d9d9d9;
  }
  .spread4 .payment3 .stroe1Chart1{
    /*border: 1px solid #d9d9d9;*/
  }

  .boxsStyle{
    background: #fff;
    margin: 43px 50px 43px 50px;
    border-radius: 5px;
  }

  @media screen and (min-width:1200px){
    .spread4 .payment3{
      float: left;
      margin-left: 15px;
      width: 53%;
      height: 66%;
      padding-top: 48px;
    }
  }
  @media screen and (min-width:700px)and (max-width:1200px){
    .spread4 .payment3{
      float: left;
      margin-left: 33px;
      width: 65%;
      margin-top: 30px;
      border: 1px solid #d9d9d9;
    }
  }
  .tdone{
    width: 10px;
    height: 10px;
    background-color: red;
    display: inline-block;
    margin-right: 10px;
  }
</style>


