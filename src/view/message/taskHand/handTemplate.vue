<template>
	<div style="height:100%;width:100%">
		<div class="title_header contentTitle">
			<div class="titleFont fl">发送消息 </div>
			<div class="fr backIcon" @click="outBack">返回</div>
		</div>
    <!-- <detailsTitle title='发送消息'/>  -->
    	<div class='contentBoxBg'>
		<el-form style='' ref="form" :model="form"  label-width="100px">
				<selectMsgTemplate :values="msgTempletId" v-if="templateShow" v-on:templateList="templateList" :isDisabled='isDisabled' :disabledAll='isDisabled'></selectMsgTemplate>
		  	<el-form-item  class="redBar" >
					<div class="yjItem"><span>*</span> 接收人：</div>
					<div class="menNumBox">
			            <!--<span v-show="personneList.length==0" style="color:#C0C4CC; font-size:12px;  margin-left:15px;">已选人员展示区域</span>-->
			            <span v-for="item in personneList" style="margin-right:10px" >{{item.name}},</span>
			        </div>
		    	<!--<el-button  style="height: 30px;padding:8px 20px;" type="primary">选择人员</el-button>-->
          		<!--<selectPersonnel v-if='orgIdsType' :defaultPs="defaultP" :disabledAll="disabledAll" v-on:personneCheckedList="personneCheckedList" :orgIds="orgIds" :personneList='personneList' :defaultCheckedKeys='defaultCheckedKeys' v-show='isDisabled'></selectPersonnel>-->
              <!--<selectPersonnel :defaultPs="defaultP" :disabledAll="disabledAll" v-on:ruleOutpersonneCheckedList="ruleOutpersonneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='ruleOutpersonneList' :defaultCheckedKeys='defaultRuleOutCheckedKeys' :isRuleOut='true'></selectPersonnel>
		    -->	<!--<div class="menNumBox">
            <div class="personneListTitle">额外人员列表</div>
			    	<div class="menNum">
			            <span v-show="personneList.length==0" style="color:#C0C4CC; font-size:12px;  margin-left:15px;">已选人员展示区域</span>
			            <span v-for="item in personneList" style="margin-left:10px" >{{item.name}},</span>
			        </div>
		       </div>-->
           	<!--<div class="menNumBox">    
               <div class="personneListTitle">排他人员列表</div>
			    		<div class="menNum">
							<span v-show="ruleOutpersonneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">排他人员展示区域</span>
	            			<span v-for="item in ruleOutpersonneList" style="margin-left:10px; display: inline-block;">{{item.name}},</span>
	          			</div>
			    	</div>-->
		  	</el-form-item>

      <el-form-item  class="redBar clearfloat">
				<div class="yjItem"><span>*</span> 通知方式：</div>
        <!--<el-checkbox-group class="fl" style="margin-right:15px;" v-model="checkList"  v-for="mpb in fsArr" keys='mpb.id' :disabled='true'>
          <el-checkbox :key="mpb.id"  :label="mpb.name"  :disabled="mpb.disabled" style="margin-right:10px">{{mpb.name}}</el-checkbox>
        </el-checkbox-group>-->
        <div>{{fsArrList}}</div>
      </el-form-item>
      <!--<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 发送时间：</div>
			  		<div>{{sendTime}}</div>
			  	</el-form-item>-->


			<!-- <el-form-item style="text-align: center; width:90%;" v-show='isDisabled'>
				<template slot-scope="scope">
			        	<el-button type="info" @click="outBack"  style="height: 30px;margin-right:30px;padding:8px 20px;">取消</el-button>
			        	<el-button type="primary" @click="makeSend" style="height: 30px;padding:8px 20px;margin:0;" :disabled="disabled">立即发送</el-button>
			    </template>
			</el-form-item> -->
		</el-form>
	</div>
	</div>
</template>

<script>
import selectMsgTemplate from "@/view/message/msgZj/selectMsgTemplate";
import timeZq from "@/view/message/msgZj/timeZq";
import selectPersonnel from "@/view/message/msgZj/selectPersonnel";
import api from "@/api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      title: "新增自动任务",
      radioOne: "",
      personneList: [],
      msgInfoDetails: {},
      messageTemplateList: [],
      msgTempletId: "",
      disabled: false,
      orgIdsType:false,
      isDisabled: !!this.$route.query.isDisable,
      ruleOutpersonneList: [],//排他组件list
      defaultCheckedKeys: [],
      defaultRuleOutCheckedKeys: [],// 排他组件默认key
      orgIds: [],
      form: {},
      templateShow: false,
      disabledAll:'',
      defaultP:'',
      defaultType:true,
      checkList: [],
      sendTime:'',
      fsArrList:"",
      fsArr: [
        { id: "chlApp", name: "站内信", disabled: false, checked: false },
        { id: "chlPush", name: "手机通知", disabled: false, checked: false },
        { id: "chlEmail", name: "邮件", disabled: true, checked: false },
          { id: "chlSms", name: "短信", disabled: true, checked: false },
       
        // { id: "chlWeiXin", name: "微信公众号", disabled: true, checked: false }
      ],
      actionArr: [
        {
          title: "放款",
          list: [
            { name: "东方红", id: 1 },
            { name: "第三方", id: 2 },
            { name: "水电费", id: 3 }
          ]
        },
        {
          title: "放款",
          list: [
            { name: "东方红", id: 4 },
            { name: "第三方", id: 5 },
            { name: "水电费", id: 6 }
          ]
        }
      ],
      value: "",
    };
  },
  components: {
    timeZq,
    selectPersonnel,
    selectMsgTemplate,
  },
  created: function() {
    this.orgIds = this.$route.query.orgIds.split(",");
    if (this.$route.query.page == "edit") {
      this.title = "编辑";
      this.disabledAll = true;
    }
    this.init();
  },
  methods: {
    init() {
      this.$http.get(api.getInstanceTemp(this.$route.query.id)).then(r => {
        if (r.data.code == 200) {
        	this. sendTime = r.data.data.sendTime;
        	let storeSend = r.data.data.storeSend;
	        this.msgTempletId = r.data.data.templetId + ''  || "";
	        this.value = Number(r.data.data.templetId ) || "";
	        this.msgInfoDetails = r.data.data;
	        this.personneList = r.data.data.extraPersonnel || [] ;
	        this.defaultCheckedKeys = this.personneList.map(r => r.id);
	        this.ruleOutpersonneList = r.data.data.otherPersonnel || [] ;
	        this.defaultRuleOutCheckedKeys = this.ruleOutpersonneList.map(r => r.id);
	        this.checkboxTypeConversion(this.msgInfoDetails);
	        this.fsArrList = [];
          if(r.data.data.chlApp==1){
          	this.fsArrList.push('站内信')
          }
          if(r.data.data.chlEmail==1){
          	this.fsArrList.push('邮件')
          }
          if(r.data.data.chlPush==1){
          	this.fsArrList.push('手机通知')
          }
          if(r.data.data.chlSms==1){
          	this.fsArrList.push('短信')
          }
          if(r.data.data.chlWeiXin==1){
          	this.fsArrList.push('微信公众号')
          }
          this.fsArrList = this.fsArrList.join(',')
	        if(storeSend==0){
			    this.defaultP = false;
			}else{
			    this.defaultP = true;
			}
			this.orgIdsType = true;
            this.templateShow = true;
        }else{
        	this.$message({
				message: r.data.msg,
				duration:'1500',
				type: 'warning'
			});
        }
      });
    },
    templateList(data) {
      this.templateListArr = data;
    },
    personneCheckedList(data) {
      this.personneList = data;
      this.defaultCheckedKeys = data.map(r => r.id);
    },
     ruleOutpersonneCheckedList(data) {
      this.ruleOutpersonneList = data;
      this.defaultRuleOutCheckedKeys = data.map(r => r.id);
    },
    checkboxTypeConversion(type) {
      this.fsArr.forEach(item => {
        if (type[item.id] == 1) {
          item.checked = true;
          return this.checkList.push(item.name);
        }
      });
    },
    makeSend() {
      this.disabled = true;
      const ids = this.fsArr
        .filter(item => {
          if (this.checkList.filter(r => r == item.name)[0]) {
            return item.id;
          }
        })
        .map(r => {
          return r.id;
        });
      if (
        ids.length &&
        this.templateListArr.title !== "" &&
        this.templateListArr.title !== "" &&
        this.templateListArr.value !== "" &&
        this.personneList.length
      ) {
        this.$http
          .post(api.sendTask(), {
            id: this.$route.query.id,
            msgTitle: this.templateListArr.title,
            msgContent: this.templateListArr.desc,
            msgTemplet: this.templateListArr.value,
            chlApp: ids.indexOf("chlApp") !== -1 ? 1 : 0,
            chlEmail: ids.indexOf("chlEmail") !== -1 ? 1 : 0,
            chlPush: ids.indexOf("chlPush") !== -1 ? 1 : 0,
            chlSms: ids.indexOf("chlSms") !== -1 ? 1 : 0,
            chlWeiXin: ids.indexOf("chlWeiXin") !== -1 ? 1 : 0,
            msgTaskRecevers: this.personneList,
            masterNo: this.msgInfoDetails.masterNo
          })
          .then(r => {
            if (r.data.code == 200) {
              this.$message({
                message: "消息发送成功",
                type: "success"
              });
              this.$router.go(-1);
            }
            this.disabled = false;
          });
      } else {
        this.$message({
          message: "请正确填写信息",
          type: "error"
        });
        this.disabled = false;
      }
    },
    outBack() {
      // window.location.assign('/saas/message/taskHand');
      this.$router.go(-1);
		},
		
  }
};
</script>

<style scoped>
</style>
