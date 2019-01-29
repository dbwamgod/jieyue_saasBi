<template>
	<div class="city">
  <div class="box content-wrapper" id="pdfDom" style="background-color: #270c5f;padding: 1px;">
    <div class="headerA boxsStyleA">
      <img src="../../assets/images/logo.png" alt="">
      <p v-if="Da">捷越惠普 <i>{{this.M}}</i> 月 <i>{{this.D}}</i> 日逾期简报</p>
      <p v-else>捷越惠普 <i>{{this.monentA}}</i> 月 <i>{{this.dasA}}</i> 日逾期简报</p>
      <!--日期 -->
        <div class="date">
          <span class="demonstration primary" >日期选择：</span>
          <el-date-picker @change="dateChange" v-model="value1" type="date" placeholder="选择日期" value-format="yyyyMMdd">
          </el-date-picker>
        </div>
    </div>

    <!--各大区金额占比排名-->
    <nationwideEcharts2 :arrs1=arrList1 v-if="arrTrue1" v-show="shuju"></nationwideEcharts2>
    <!--各部分c-m2金额占比排名-->
    <nationwideEcharts3 :arrs1=arrList1 v-if="arrTrue1" v-show="shuju"></nationwideEcharts3>
    <!--各大区c-m2金额占比排名-->
    <nationwideEcharts4 :arrs1=arrList1 v-if="arrTrue1" v-show="shuju"></nationwideEcharts4>
    <!--全国营业部c-m2排名-->
    <nationwideEcharts5 :arrs1=arrList1 v-if="arrTrue1" v-show="shuju"></nationwideEcharts5>
    <div @click="getPdf" id="aa" v-show="shuju">导出PDF</div>
  </div>
  	<div class="msgData" v-show = 'msgDatas'>
     <img src="../../assets/images/wushuju.png" alt=""><span>暂无数据。。。</span>
    </div>
  </div>
</template>
<script>
  import html2Canvas from 'html2canvas';
  import JsPDF from 'jspdf';
  import api from '../../api'
  // 组件echarts
  import nationwideEcharts2 from '@/components/nationWideEcharts/nationwideEcharts2';
  import nationwideEcharts3 from '@/components/nationWideEcharts/nationwideEcharts3';
  import nationwideEcharts4 from '@/components/nationWideEcharts/nationwideEcharts4';
  import nationwideEcharts5 from '@/components/nationWideEcharts/nationwideEcharts5';
  import Moment from 'moment'

  export default {
    data() {
      return {
        htmlTitle: "全国逾期报表", //这个是pdf文件的名字
        M: '',
        D: '',
        arrList1: [],
        arrTrue1: false,
        value1:Moment(new Date().getTime()- 24*60*60*1000).format('YYYY-MM-DD'),
        Da: true,
        shuju: false,
        monent: '',
        monentA: '',
        dasA: '',
        msgDatas:false,
      }
    },
    mounted() {
      this.dateChange();
      this.newTime();
    },
    components: {
      nationwideEcharts2,
      nationwideEcharts3,
      nationwideEcharts4,
      nationwideEcharts5
    },
    methods: {
      dateChange() {
        const loading = this.$loading({
          lock: true,
          text: '玩命加载中。。。',
          spinner: 'el-icon-loading',
          background: 'white',
          target: '.content-wrapper',
        });
        setTimeout(() => {
          loading.close();
        }, 1500);
        if (this.value1.indexOf('-') == 4) {
          let value2 = Moment(new Date(this.value1).getTime()).format('YYYYMMDD');
          this.Da = true
          this.datas(value2);
        }else{
          this.Da = false;
          let monent = this.value1.substr(4, 2);
          // 月 需求
          if (!monent.indexOf(0)) {
            this.monentA = monent.substr(1, 1);
          } else {
            this.monentA = monent;
          }
          // 日需求
          let das = this.value1.substr(6, 2);
          if (!das.indexOf(0)) {
            this.dasA = das.substr(1, 1)
          } else {
            this.dasA = das;
          }
          this.datas(this.value1);
        }
      },
      datas(value2) {
        this.msgDatas = false;
        this.arrTrue1 = false;
        this.$http.post(api.getnationwide(), {
          date: value2,
          subjectId: 1
        }).then(res => {  // 请求成功
          if(res.data.data == null){
            setTimeout(() => {
              this.msgDatas = true;
            }, 1500);
          }
          if (res.data.data.length == 0) {
            setTimeout(() => {
              this.msgDatas = true;
            }, 1400);
            this.shuju = false
          }else {
            this.shuju = true;
            this.arrTrue1 = true;
            this.arrList1 = res.data.data;
          }
        }).catch(function (err) {// 请求失败
          console.log("请求失败")
        })
      },
      newTime() {
        let date = new Date();
        let preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        let M = (preDate.getMonth() + 1 < 10 ? (preDate.getMonth() + 1) : preDate.getMonth() + 1);
        let D = preDate.getDate() + ' ';
        this.M = M;
        this.D = D;
      },
      getPdf() {
        let title = this.htmlTitle;
        html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true
        }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 741.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
              console.log(1);
            }
            PDF.save(title + '.pdf')
          }
        )
      }
    }
  }
</script>
<style scoped>
   .boxsStyleA {
    background: #fff;
    margin: 30px 50px;
    border-radius: 5px;
  }

  .box {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    background-color: #270c5f;
  }

  .box .headerA {
    padding: 32px 0 1px 0;
    height: 127px;

  }

  .box .headerA img {
    width: 80px;
    height: 80px;
    float: left;
    margin-left: 44px;
    margin-right: 25px;
    border: 11px solid #e8e8e8;
    padding: 20px;
  }

  .box .headerA p {
    float: left;
    border: 11px solid #e8e8e8;
    color: #00b0f0;
    font-size: 50px;
    background-color: #fff;
    padding: 27px 50px;
    margin: 0;
    font-family: 'Microsoft YaHei';
    font-weight: bold;
    text-shadow: 3px 5px 9px #aeb3b4;
  }
    i {
    font-style: normal;
  }

   #aa {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #b5a5a58c;
    border-radius: 7%;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 50px;
    right: 60px;
  }

 #aa:hover {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #b5a5a58c;
    border-radius: 7%;
    color: #000;
    text-align: center;
    position: absolute;
    bottom: 50px;
    right: 60px;
    cursor: pointer;
  }

  .content-wrapper .date {
    position: absolute;
    right: 5%;
  }
  .content-wrapper .date span{
    font-size: 16px;
    margin-top: -6px;
    margin-left: 33px;
  }
  .content-wrapper .el-date-editor.el-input, .el-date-editor.el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: rgba(241,243,248,0.5);
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: none;
    border: none;
    width: 68%;
    margin-left: 7px;
  }

  #pdfDom .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 54%!important;
    background-color: white;
    margin-left: -6px;
  }
  #pdfDom .el-input__inner {
    -webkit-appearance: none;
    background-color: white;
    color: black;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    width: 75%;
    border: 1px solid;
    border-radius: 10px;
    padding: 0 22px;
  }
  #pdfDom .el-input__prefix {
    left: 5px;
    transition: all .3s;
    display: none;
  }
  .city .msgData{
    left: 50%;
    margin-top: 140px;
    text-align: center;
    margin-left: -110px;
  }
  .city .msgData img{
    width: 80px;
    height: 80px;
    margin-right: 30px;
    vertical-align: middle;
  }
  .msgData span{
    font-size: 30px;
    color: rgba(0, 176, 240, 0.19);
  }
  @media screen and (min-width:1366px) {
    .box .header {
      padding: 28px 0;
      height: 107px;
    }
    .date {
      position: absolute;
      right: 5%;
    }
    .box .headerA img {
      width: 35px;
      height: 42px;
      float: left;
      margin-left: 34px;
      margin-right: 25px;
      border: 11px solid #e8e8e8;
      padding: 20px;
    }

    .box .headerA p {
      float: left;
      border: 11px solid #e8e8e8;
      color: #00b0f0;
      font-size: 30px;
      background-color: #fff;
      padding: 21px 85px;
      margin: 0;
      font-family: 'Microsoft YaHei';
      font-weight: bold;
      text-shadow: 3px 5px 9px #aeb3b4;
    }
  }
  @media screen and (min-width:750px) and (max-width:1366px){
    .box .header {
      padding: 14px 0 28px 0;
      height: 87px;
    }
    .date {
      position: absolute;
      right: 2%;
    }
    .box .headerA img {
      width: 25px;
      height: 32px;
      float: left;
      margin-left: 24px;
      margin-right: 15px;
      border: 11px solid #e8e8e8;
      padding: 20px;
    }

    .box .headerA p {
      float: left;
      border: 11px solid #e8e8e8;
      color: #00b0f0;
      font-size: 30px;
      background-color: #fff;
      padding: 17px 35px;
      margin: 0;
      font-family: 'Microsoft YaHei';
      font-weight: bold;
      text-shadow: 3px 5px 9px #aeb3b4;
    }
    i {
      font-style: normal;
    }
  }

</style>

