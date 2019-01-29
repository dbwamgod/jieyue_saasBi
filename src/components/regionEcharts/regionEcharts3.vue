<template>
  <div>
    <div class="spread2 boxsStyle">
      <div class="payment1">
        <p>{{this.title1}}</p>
        <div class="payment1Div">
          <div id="myChart10" :style="{width: '100%', height: '180px'}"></div>
          <!--<div class="paymentTable">-->
          <!--<table cellpadding="0" cellspacing="0" width="100%">-->
          <!--<tr align="center" ><td>平日入流率</td></tr>-->
          <!--<tr align="center" ><td>多日账单入流率</td></tr>-->
          <!--<tr align="center" ><td>1号账单率</td></tr>-->
          <!--<tr align="center" ><td>16号账单率</td></tr>-->
          <!--</table>-->
          <!--</div>-->
        </div>
      </div>
      <div class="payment2">{{this.title2}}</div>
      <div class="payment3">
        <div id="myChart3" :style="{width: '100%', height: '260px'}" ></div>
      </div>

    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name:"regionEcharts3",
    data(){
      return {
        title1:'',title2:''
      }
    },
    props:{
      arrs : Array,
      required: true,
    },
    mounted() {
      this.dataAjax();
    },
    methods : {
      dataAjax() {
          let data4  = this.arrs[4];
        this.title1 = data4.title;
          let seriesD = data4.datas[0].series;
          let colorsFirst=[],legendFirst=[],seriesFirst=[];
          for(let i = 0 ; i < seriesD.length; i++){
            colorsFirst.push(seriesD[i].color);
          }
          for(let i = 0 ; i < seriesD.length; i++){
            legendFirst.push(seriesD[i].name)
          }

          let serData =[]
          for(let i = 0 ; i<seriesD.length; i++){
            serData.push(seriesD[i].data)
          }
          let max = Math.max.apply(null, serData);

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
                  }
                }
              },
            })
          });
          let myChart10 = echarts.init(document.getElementById('myChart10'));
          myChart10.setOption({
            tooltip : {
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                trigger: 'axis',
              }
            },
            color: colorsFirst,

            legend: {
              data: legendFirst ,y:50,orient:'vertical',x:20,padding: 20,
            },
            grid: {
              top:'75%',
              left: '30%',
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
            //   [
            //
            //   {
            //     name:'16号回款',
            //     type:'bar',
            //     stack: '总量',
            //     data: [20],
            //     label: {
            //       normal: {
            //         show: true,
            //         formatter:"{c}%",
            //       }
            //     },
            //     barCategoryGap : '30%',
            //   },
            //   {
            //     name:'1号回款',
            //     type:'bar',
            //     stack: '总量',
            //     data:[20],
            //     label: {
            //       normal: {
            //         show: true,
            //         formatter:"{c}%"
            //       }
            //     },
            //   },
            //   {
            //     name:'多账单日回款',
            //     type:'bar',
            //     stack: '总量',
            //     data:[50],
            //     label: {
            //       normal: {
            //         show: true,
            //         formatter:"{c}%"
            //       }
            //     },
            //   },
            //   {
            //     name:'累计回款率',
            //     type:'bar',
            //     stack: '总量',
            //     data:[50],
            //     label: {
            //       normal: {
            //         show: true,
            //         formatter:"{c}%"
            //       }
            //     },
            //   },
            // ]
          })
          window.addEventListener("resize",function(){
            myChart10.resize();
          });
          // 第二个
        let data5  = this.arrs[5];
          this.title2 = data5.title;
          let seriesQ = data5.datas[0].series;
          let datax = data5.datas[0].axisX.data;
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
          let myChart3 = echarts.init(document.getElementById('myChart3'));
          myChart3.setOption({
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
            myChart3.resize();
          });
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
  /*大区回款*/
  .spread2{
    height: 390px;
  }
  .spread2 .payment1{
    float: left;
    width: 30%;
    margin-top: 40px;
  }
  .spread2 .payment1 p{
    width: 52%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin: 0;
    margin-left: 45px;
    background-color: #c00000;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  .spread2 .payment1 .payment1Div{
    width: 100%;
    margin-top: 25px;
    margin-left: 45px;
    border: 1px solid #d9d9d9;
    padding-top: 19px;
  }
  .spread2 .payment1 .payment1Div .paymentTable{
    padding-left: 50px;
  }
  .spread2 .payment2{
    float: left;
    height: 8px;
    margin-top: 71px;
    padding-left: 30px;
    padding-right: 48px;
    padding-top: 16px;
    padding-bottom: 175px;
    background-color: #c00000;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    width: 15px;
    margin-left: 56px;
  }
  .spread2 .payment3{
    float: left;
    margin-top: 70px;
    border: 1px solid #d9d9d9;
  }
  @media screen and (min-width:1200px){
    .spread2 .payment3{
      float: left;
      margin-left: 15px;
      width: 53%;
      height: 75%;
    }
  }
  @media screen and (min-width:700px)and (max-width:1200px){
    .spread2 .payment3{
      float: left;
      width: 65%;
      border: 1px solid #d9d9d9;
    }
  }
  .clear {
    clear: both;
  }
</style>


