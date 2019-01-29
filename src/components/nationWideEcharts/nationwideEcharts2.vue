<template>
  <div>
    <div class="money boxsStyle">
      <p class="money-title">{{title}}</p>
      <div  id="myChart" :style="{width: '100%', height: '300px'}" class="money-chart"></div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name:"nationwideEcharts2",
    data(){
      return {
        title:'',
        seriesSetting:[],
        colors:[],
        legends:[],arrN:[]
      }
    },
    mounted() {
      this.datas()
    },
    props:{
      arrs1 : Array,
      required: true,
    },
    methods : {
      datas() {
          let data0  = this.arrs1[0];
          this.title  =  data0.title; // 标题
          this.data = data0.datas[0];// 3ge
          // data Name 放中间
          let arrN = this.data.axisX.data;
          var a = arrN.indexOf('捷越资信');
          var c = arrN.length/2;
          var f = arrN.splice(a,1)[0]
          arrN.splice(c, 0, f)
        if(this.data.series.length  == 2 ){
          //series
          this.arrD1 = this.data.series[0].data;
          var b1 = this.arrD1.length/2;
          var f1 = this.arrD1.splice(a,1)[0]
          this.arrD1.splice(b1, 0, f1)
          this.arrD2 = this.data.series[1].data;

          var b2 = this.arrD2.length/2;
          var f2 = this.arrD2.splice(a,1)[0]
          this.arrD2.splice(b2, 0, f2)
          this.dataName1 = this.data.series[0].name;
          this.dataName2 = this.data.series[1].name;
        }
        if(this.data.series.length  == 1){
          //series
          this.arrD1 = this.data.series[0].data;
          var b1 = this.arrD1.length/2;
          var f1 = this.arrD1.splice(a,1)[0]
          this.arrD1.splice(b1, 0, f1);

         this.dataName1 = this.data.series[0].name;
        }
        // legend
        for(let i = 0 ; i < this.data.series.length; i++){
          this.legends.push(
            this.data.series[i].name
          )
        }
        // color
        for(let i = 0 ; i < this.data.series.length; i++){
          this.colors.push(
            this.data.series[i].color
          )
        }

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          color: this.colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {data: this.legends,x:'70%',itemGap: 70,},
          toolbox: {
            show: true
          },
          xAxis: [
            {
              type: this.data.axisX.type,
              data: arrN,
              nameTextStyle:{fontFamily:'Microsoft YaHei'},
              splitLine:{show:false },
              axisTick: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              show:false,//y轴的横线显示
              splitLine: {show: false}, //y轴的网格显示
            }
          ],
          series: [{
            name:this.dataName1 ,
            type: 'bar',
            barGap: 0,
            data: this.arrD1,
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
              name:this.dataName2 ,
              type:'bar',
              barGap: 0,
              data: this.arrD2,
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
            }]
        })
        window.addEventListener("resize",function(){
          myChart.resize();
        });

      }
    }
  }
</script>

<style>
  /*各大区金额占比排名*/
  .boxsStyle{
    background: #191c2c;
    margin: 43px 50px 43px 50px;
    border-radius: 5px;
  }
  .money{
    position: relative;
    padding-top: 80px;
  }
  .money .money-title{
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



</style>


