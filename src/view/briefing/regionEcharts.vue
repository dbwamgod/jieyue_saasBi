<template>
	<div class="region">
  <div class="boxA content" id="pdfDomR">
    <div class="header boxsStyle">
      <div class="headerTitle">
        <img src="../../assets/images/graybackground.png" alt="" class="headerTitleImg">
        <p class="headerTitle1">机构逾期简报</p>
      </div>
      <!--select选择框-->
      <div class="block xl" v-show=" xiala > 1 ? true:false">
        <span class="demonstration  primary" style="margin-right: 1%">大区简报:</span>
        <el-select v-model="selectedOptions1" @change="handleChange" placeholder="请选择" style="width:70%;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <!--日期 -->
      <div class="date">
        <span class="demonstration primary">日期选择:</span>
        <el-date-picker @change="dateChange" v-model="value1" type="date" placeholder="选择日期" value-format="yyyyMMdd" style="width:70%"></el-date-picker>
      </div>

      <div class="headerContent">
        <div class="headerContentRegin">
          <img src="../../assets/images/ball.png" alt="">
          <p>{{this.title1}}</p>
        </div>
        <div class="headerContentToday">{{this.name}} <i>{{this.value}}{{this.unit}}</i></div>

        <div class="headerContentTime" v-if="Da" :style="{ backgroundImage: 'url(' + dataRi + ') '}">
          <!--<img src="../../assets/images/canlder.png">-->
          <p class="p1">{{this.M}}月</p>
          <p class="p2">{{this.D}}</p>
          <p class="p3">{{this.str}}</p>
          <p class="p4">时间进度: <i>{{this.jdu}}</i></p>
        </div>
        <div class="headerContentTime" v-else  :style="{ backgroundImage: 'url(' + dataRi + ')'}">
          <!--<img src="../../assets/images/canlder.png">-->
          <p class="p1">{{this.monentA}}月</p>
          <p class="p2">{{this.dasA}}</p>
          <p class="p3">{{this.dc}}</p>
          <p class="p4">时间进度: <i>{{this.jdu}}</i></p>
        </div>
      </div>
    </div>

    <!--分布C-M2-->
    <regionEcharts1 :arrs=arrList v-if="arrTrue" v-show="shuju"></regionEcharts1>
    <!--门店cm-2-->
    <regionEcharts2 :arrs=arrList v-if="arrTrue" v-show="shuju"></regionEcharts2>
    <!--大区回款-->
    <regionEcharts3 :arrs=arrList v-if="arrTrue" v-show="shuju"></regionEcharts3>
    <!--门店回款-->
    <regionEcharts4 :arrs=arrList v-if="arrTrue" v-show="shuju"></regionEcharts4>
    <!--大区入流-->
    <regionEcharts5 :arrs=arrList v-if="arrTrue" v-show="shuju"></regionEcharts5>
    <!--门店入流-->
    <regionEcharts6 :arrs=arrList v-if="arrTrue" v-show="shuju"></regionEcharts6>
    <div @click="getPdf" id="aaa" v-show="shuju">导出PDF</div>
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
  import Moment from 'moment'
  import regionEcharts1 from '@/components/regionEcharts/regionEcharts1';
  import regionEcharts2 from '@/components/regionEcharts/regionEcharts2';
  import regionEcharts3 from '@/components/regionEcharts/regionEcharts3';
  import regionEcharts4 from '@/components/regionEcharts/regionEcharts4';
  import regionEcharts5 from '@/components/regionEcharts/regionEcharts5';
  import regionEcharts6 from '@/components/regionEcharts/regionEcharts6';
  export default {
    data() {
      return {
        aaa: false, bbb: false,
        htmlTitle: "大区逾期报表",//这个是pdf文件的名字
        M: '',
        D: '',
        str: '',
        jdu: '',
        title1: '',
        name: '',
        value: '',
        value1: Moment(new Date().getTime()- 24*60*60*1000).format('YYYY-MM-DD'),
        unit: '',
        aa: '',
        options: [],
        selectedOptions2: [],
        arrList: [],
        arrTrue: false, xiala: '',
        selectedOptions1: "选择地区",
        Da: true, monentA: '',
        dasA: '',
        dc:'',
        shuju:false,
        msgDatas:false,
        dataRi:require('@/assets/images/canlder.png')
      }
    },
    mounted: function () {
      this.handleChange()// 地区下拉框
      this.dateChange(); // 日期选择框
    },
    created() {
      this.datasTime();
      this.xialak(); //请求地区

    },
    components: {
      regionEcharts1,
      regionEcharts2,
      regionEcharts3,
      regionEcharts4,
      regionEcharts5,
      regionEcharts6
    },
    methods: {
      dateChange() {
        const loading = this.$loading({
          lock: true,
          text: '玩命加载中。。。',
          spinner: 'el-icon-loading',
          background: 'white',
          target: '.content',
        });
        setTimeout(() => {
          loading.close();
        }, 1000);

        if (this.value1.indexOf('-') == 4) {
          let value2 = Moment(new Date(this.value1).getTime()).format('YYYYMMDD');
          this.Da = true;
          //时间进度
          let year =  this.value1.substr(0,4);  // 年
          let monent = this.value1.substr(5, 2);//月
          let das = this.value1.substr(8, 2);   //日
          var dasT = new Date(year,monent,0).getDate();
          this.jdu = parseInt(das/dasT * 100)+'%';

          this.dataxiala(value2);
        } else{
          this.Da = false;
          let monent = this.value1.substr(4, 2);
          // 月 需求
          if (!monent.indexOf(0)) {
            this.monentA = monent.substr(1, 1)
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
          // 星期需求
          let da = this.value1.split('');
          da.splice(4,0,'-')
          da.splice(7,0,'-')
          let db = da.join('');
          // let dc = new Date(db).getDay();
          this.dc =  "星期"+"日一二三四五六 ".charAt(new Date(db).getDay())
          //时间进度
          let year =  this.value1.substr(0,4);  // 年
          var dasT = new Date(year,this.monentA,0).getDate();
          this.jdu = parseInt(this.dasA/dasT * 100)+'%';
          this.dataxiala(this.value1)
        }
      },
      dataxiala(dateX) {
        this.$http.get(api.pdng(),
        ).then((res) => {
          if (res.data.data.length == 2) {
            this.xiala = 2;
            this.dataX = {
              subjectId: 2,
              orgCodeList: this.selectedOptions2,
              date:dateX
            }
          } else {
            this.xiala = 0;
            this.dataX = {
              subjectId: 2,
              date:dateX
            }

          }
          this.dataAjax(this.dataX)
        }).catch(() => {
        });
      },
      datasTime() {
        let date = new Date();
        let preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        let M = (preDate.getMonth() + 1 < 10 ? (preDate.getMonth() + 1) : preDate.getMonth() + 1);
        let D = preDate.getDate() + ' ';
        this.M = M;
        this.D = D;

        let a = new Array("日", "一", "二", "三", "四", "五", "六");
        let week = new Date().getDay()-1;
        let str = "星期" + a[week];
        this.str = str;

        //取每月多少天
        // date.setMonth(M + 1);
        // date.setDate(0);
        // date.getDate();
        // let jdu = parseInt(D / date.getDate() * 100);
        // let baifen = 100;
        // if (jdu > baifen) {
        //   jdu = 100
        // } else {
        //   let jdu = parseInt(D / date.getDate() * 100);
        // }
        //
        // this.jdu = jdu + '%';
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
            }
            PDF.save(title + '.pdf')
          }
        )
      },
      dataAjax(dataX) {
        this.msgDatas = false;
        this.arrTrue = false;
        this.$http.post(api.getnationwide(), dataX).then(res => {  // 请求成功
          if(res.data.data == null){
            setTimeout(() => {
              this.msgDatas = true;
            }, 900);
          };
          if(res.data.data.length == 0){
            setTimeout(() => {
              this.msgDatas = true;
            }, 1000);
            this.shuju = false;
            this.title1= '';
            this.name = ''
            this.value = ''
            this.unit = ''
            this.selectedOptions1= '选择地区'
          }else{
            this.shuju = true;
            this.arrTrue = true;
            this.arrList = res.data.data;
            this.title1 = res.data.data[0].title;
           	this.selectedOptions1 = this.title1
            this.name = res.data.data[0].datas[0].name;
            this.value = res.data.data[0].datas[0].value;
            this.unit = res.data.data[0].datas[0].unit;
          }
        }).catch(function (err) {// 请求失败
          console.log("请求失败")
        })
      },
      xialak() {
        this.$http.get(api.xialak(), {}).then(res => {  // 请求成功

          this.options = res.data.data;
        }).catch(function (err) {// 请求失败
          console.log("请求失败")
        })
      },
      handleChange(value,label) {
        const loading = this.$loading({
          lock: true,
          text: '玩命加载中。。。',
          spinner: 'el-icon-loading',
          background: 'white',
          target: '.content',
        });
        setTimeout(() => {
          loading.close();
        }, 1000);

        let arr = [];
        if (value) {
          arr.push(value);
          if(this.value1.indexOf('-') == 4){
            this.dataxiala(Moment(new Date(this.value1).getTime()).format('YYYYMMDD'));

          }else{
            this.dataxiala(this.value1);
          }
        } else {
          arr.push("30104")
          this.dataxiala(Moment(new Date(this.value1).getTime()).format('YYYYMMDD'));
        }
        this.selectedOptions2 = arr;

      },
    }
  }
</script>

  <style>
  .boxA {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ff536f;
    padding: 1px;
  }

  .boxsStyle {
    background: #fff;
    margin: 20px 10px 10px 10px !important;
    border-radius: 5px;
  }

  /*头部标题*/
  .header .headerTitle {
    background-color: #ff536f;
    color: #fff;
    text-align: center;
    font-size: 50px;
  }

  .header .headerTitleImg {
    width: 100%;
    height: 70px;
  }

  .header .headerTitle1 {
    position: absolute;
    top: 41px;
    left: 50%;
    font-size: 29px;
    margin-left: -105px;
    font-weight: bold;
  }

  .header .headerContent {
    background-color: #ff536f;
    border-bottom: 5px solid #fff;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;
    height: 280px;
    margin-top: -13px;
  }

  .header .headerContent .headerContentRegin {
    float: left;
    margin-left: 104px;
    margin-top: 32px;
  }

  .header .headerContent .headerContentRegin img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .header .headerContent .headerContentRegin p {
    font-size: 38px;
    margin: 0;
    margin-left: 10px;
    margin-top: 30px;
    color: aliceblue;
    font-weight: bold;
  }

  .header .headerContent .headerContentToday {
    float: left;
    margin-left: 133px;
    margin-top: 108px;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }

  .header .headerContent .headerContentTime {
    float: right;
    margin-right: 100px;
    margin-top: 30px;
    font-weight: bold;
    position: relative;
    height: 152px;
    width: 150px;
    background-size: 100%;
    text-align: center;
  }

  .header .headerContent .headerContentTime .p1 {
    margin-top: 20px;
    color: #fff;
    font-weight: bold;
  }

  .header .headerContent .headerContentTime .p2 {
    margin-top: 14px;
    font-size: 36px;
    color: #c00000;
  }

  .header .headerContent .headerContentTime .p3 {
    margin-top: 6px;
    color: #c00000;
    font-size: 30px;
    font-weight: bold
  }

  .header .headerContent .headerContentTime .p4 {
    margin-top: 15px;
    margin-bottom: 0;
    color: #fff;
  }

  .header i {
    font-style: normal;
  }

   #aaa {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #b5a5a58c;
    border-radius: 7%;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 41px;
    right: 60px;
  }

   #aaa:hover {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #b5a5a58c;
    border-radius: 7%;
    color: #000;
    text-align: center;
    position: absolute;
    bottom: 41px;
    right: 60px;
    cursor: pointer;
  }

  .header  .xl {
    width:17%;
    position: absolute;
    right: 100px;
    top: 44px;
    color: white;
    font-size: 20px;
  }
  .header  .date {
    width:17%;
    position: absolute;
    right: 25%;
    top: 44px;
    font-size: 20px;
    color: white;
  }
  @media screen and (min-width:1436px) and (max-width:1590px){
    .header .headerTitle1 {
      position: absolute;
      top: 43px;
      left: 50%;
      font-size: 29px;
      margin-left: -105px;
      font-weight: bold;
    }
    .header .xl {
      width:17%;
      position: absolute;
      right: 100px;
      top: 50px;
      color: white;
      font-size: 14px;
    }
    .header  .date {
      width:17%;
      position: absolute;
      right: 25%;
      top: 50px;
      font-size: 14px;
      color: white;
    }
    .header  .demonstration{
      font-size:12px!important;
    }
    .region .el-input__inner{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 35px;
      line-height: 35px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .region .el-input__icon {
      height: 100%;
      width: 25px;
      text-align: center;
      -webkit-transition: all .3s;
      transition: all .3s;
      line-height: 30px;
    }
    .region .el-input--suffix .el-input__inner {
      padding-right: 0px;
    }
    .region .el-input--prefix .el-input__inner {
      padding-left: 25px;
    }
    /*.el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
      width: 58%!important;
    }*/
  }
  @media screen and (min-width:750px) and (max-width:1436px){
    .header .headerTitle1 {
      position: absolute;
      top: 40px;
      left: 50%;
      font-size: 29px;
      margin-left: -135px;
      font-weight: bold;
    }
    .header  .xl {
      width:17%;
      position: absolute;
      right: 73px;
      top: 45px;
      color: white;
      font-size: 12px;
    }
    .header  .date {
      width:17%;
      position: absolute;
      right: 25%;
      top: 45px;
      font-size: 12px;
      color: white;
    }
    .header  .demonstration{
      font-size:10px!important;
    }
    .region .el-input__inner{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 30px;
      line-height: 30px;
      outline: 0;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .region .el-input__icon {
      height: 100%;
      width: 25px;
      text-align: center;
      -webkit-transition: all .3s;
      transition: all .3s;
      line-height: 30px;
    }
   .region  .el-input--suffix .el-input__inner {
      padding-right: 0px;
    }
    .region .el-input--prefix .el-input__inner {
      padding-left: 25px;
    }
    .region .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
      width: 71%!important;
    }
  }
  @media screen and (min-width:1591px){
    .header  .xl {
      width:20%;
      position: absolute;
      right: 80px;
      top: 44px;
      color: white;
      font-size: 20px;
    }
    .header  .date {
      width:18%;
      position: absolute;
      right: 25%;
      top: 44px;
      font-size: 20px;
      color: white;
    }
    .region .el-input__inner{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 30px;
      line-height: 30px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 80%;
    }
    .region .el-input__icon {
      height: 100%;
      width: 25px;
      text-align: center;
      -webkit-transition: all .3s;
      transition: all .3s;
      line-height: 30px;
    }
    .region .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
      width: 58%!important;
    }
    .region .el-select {
      display: inline-block;
      position: relative;
      width: 50% !important;
    }
  }
  #pdfDomR .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    background: #fff;
  }
  #pdfDomR .el-input__inner {
    -webkit-appearance: none;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: black;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    outline: none;
    border-radius: 0;
    /*padding: 0 10px;*/
    width: 100%;
    margin-left: 0px;
    background-color: white;
  }
  #pdfDomR .el-input__prefix{
    left: 5px;
    transition: all .3s;
    display: none;
  }
  .msgData{
    left: 50%;
    margin-top: 140px;
    text-align: center;
    margin-left: -110px;
  }
  .msgData img{
    width: 80px;
    height: 80px;
    margin-right: 30px;
    vertical-align: middle;
  }
  .msgData span{
    font-size: 30px;
    color: rgba(0, 176, 240, 0.19);
  }

</style>
    