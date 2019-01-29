<template>
	<div>
		<el-form ref="form" :model="form" label-width="100px">
			<div class="contentTitle">
				<div class="titleFont fl">{{title}}</div>
				<div class="fr backIcon" @click="qxClose">返回</div>
			</div>
			<div class="contentBox">
				<div class="titleBox">
				  	<el-form-item class="redBar fl" style="min-width:300px;">
				  		<div class="yjItem"><span>*</span> 触发动作：</div>
				    	<el-button style="height: 30px;padding:8px 20px;" @click="dialogTableVisible = true" type="primary">{{actionName}}</el-button>
				  	</el-form-item>
				  	<ewTime v-if="ifTimeValue" v-on:timeValue="timeValue" :timeValues="timeValuea"></ewTime>
				</div>
				<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 创建任务类型：</div>
					<el-radio-group v-model="sendSet" class="fl" style="margin-right:15px;margin-top:15px;">
						<el-radio :label="2" @change="sdSedn">手动任务</el-radio>
						<el-radio :label="1" @change="zdSend">自动任务</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<selectMsgTemplate :values="valuea" v-if="templateShow" v-on:templateList="templateList" :isDisabled='true'></selectMsgTemplate>
				
			  	<el-form-item  class="redBar">
			  		<div class="yjItem"><span>*</span> 接收人：</div>
			  		<selectPersonnel :defaultPs="defaultP" v-on:storeSenda = "storeSenda" v-on:personneCheckedList="personneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='personneList' :defaultCheckedKeys='defaultCheckedKeys'></selectPersonnel>
			  		<selectPersonnel v-on:ruleOutpersonneCheckedList="ruleOutpersonneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='ruleOutpersonneList' :defaultCheckedKeys='defaultRuleOutCheckedKeys' :isRuleOut='true'></selectPersonnel>
			    	<div style="clear: both;"></div>
			    	<div class="menNumBox">
              	<div class="personneListTitle">额外人员列表</div>    
			    		<div class="menNum">
							<span v-show="personneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">已选人员展示区域</span>
	            			<span v-for="item in personneList" style="margin-left:10px; display: inline-block;">{{item.name}},</span>
	          			</div>
			    	</div>
			    	<div class="menNumBox">    
               <div class="personneListTitle">排他人员列表</div>
			    		<div class="menNum">
							<span v-show="ruleOutpersonneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">排他人员展示区域</span>
	            			<span v-for="item in ruleOutpersonneList" style="margin-left:10px; display: inline-block;">{{item.name}},</span>
	          			</div>
			    	</div>
			    	
		  		</el-form-item>
			  	
			  	<timeZq :sms='sms' v-if="timeZqShow" :templateType="creatTask" :typeLxRW="typeRw" :arrList="timeZqArr" :typeCycle="typeCycle" :txlBools='true' :oncType="onc" v-on:arrListEmit="arrListEmit"></timeZq>
			  	
				<div class="btnBox">
				    <el-button type="info" class="btnLeft" @click="qxClose">取消</el-button>
				    <el-button type="primary" class="btnRight" :disabled="isDisable" @click="submit">确定</el-button>
				</div>
			</div>
		  	
		</el-form>
		
		<el-dialog title="选择触发动作" :visible.sync="dialogTableVisible" width="35%" @close="closeAction">
				<div style="margin-bottom: 30px;">
					<el-radio-group v-model="radioOne">
						<el-radio v-for="item in actionArr" style="margin-bottom: 10px;margin-right:30px;margin-left:0px;" :label="item.jobNo">{{item.jobName}}</el-radio>
					</el-radio-group>
				</div>
			<span slot="footer" class="dialog-footer">
		    	<el-button @click="closeAction">取 消</el-button>
		   	 	<el-button type="primary" @click="selectAction" >确 定</el-button>
		 	</span>
		</el-dialog>
	</div>
</template>

<script>
import timeZq from "@/view/message/msgZj/timeZq";
import ewTime from "@/view/message/msgZj/ewTime";
import selectMsgTemplate from "@/view/message/msgZj/selectMsgTemplate";
import selectPersonnel from "@/view/message/msgZj/selectPersonnel";
import api from "../../../api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      title: "创建预警调度",
      radioOne: "",
      actionId: "",
      typeCycle: false,
      sendSet: 2,
      typeRw: false,
      timeValuea:'',
      actionName: "选择预警指标",
      onc: false,
      orgIdsType: false,
      orgIds: [301],
      timeZqArr: [],
      ifTimeValue:true,
      childrenList: [],
      personneList: [],//选人组件list
      ruleOutpersonneList: [],//排他组件list
      actionArr: [],
      defaultCheckedKeys: [],//选人组件默认key
      defaultRuleOutCheckedKeys: [],// 排他组件默认key
      form: {},
      valuea: "",
      timeValues: "",
      templateListArr: {},
      isDisable: false,
      trigger:false,
      creatTask:'creatTask',
      templateShow: true,
      storeSends: "",
      taskId:'',
      defaultP:true,
      timeZqShow:true,
      sms:'SMS',
    };
  },
  components: {
    timeZq,
    selectMsgTemplate,
    selectPersonnel,
    ewTime
  },
  created: function() {
    if (this.$route.query.id) {
        this.title = "编辑预警调度";
        this.taskId = this.$route.query.id;
        this.templateShow = false;
        this.orgIdsType = false;
        this.trigger = true;
        this.ifTimeValue = false;
        this.info();
    }else{
    	this.orgIdsType = true;
    }
    this.triggerActionList();
  },
  watch:{
	templateListArr(){
	 	this.sms=this.templateListArr.SMSType;
	 	this.timeZqShow = false;
	 	this.timeZqShow = true;
	}
  },
  methods: {
  	info() {
      let vm = this;
      this.$http.get(api.getTaskTemp(vm.taskId)).then(res => {
          if (res.data.code == 200) {
            vm.sendSet = res.data.data.taskType;
            vm.valuea = res.data.data.templetId + "";
            vm.radioOne = res.data.data.jobId+'';
            vm.selectAction();
            vm.actionName = res.data.data.taskName+'';
            //vm.masterNo = res.data.data.masterNo;
            vm.storeSends = res.data.data.storeSend;
            vm.personneList = res.data.data.extraPersonnel;
            vm.ruleOutpersonneList = res.data.data.otherPersonnel;
            vm.timeValuea = JSON.parse(res.data.data.triggerTimeValue).startTime;
            if(vm.sendSet==2){
            	vm.typeRw = false;
            }else{
            	vm.typeRw = true;
            }
            
            vm.timeZqArr = [
              { sendTime: res.data.data.sendTime },
              { effectCycleStart: res.data.data.startTime },
              { effectCycleEnd: res.data.data.endTime },
              {
                fsArr: [
                  res.data.data.chlApp,
                  res.data.data.chlEmail,
                  res.data.data.chlPush,
                  res.data.data.chlSms,
                  res.data.data.chlWeixin
                ]
              },
              {
                type: res.data.data.sendFrequencyType,
                typeList: res.data.data.sendFrequencyValue
              },
              { sendType: res.data.data.sendEvent }
            ];
            vm.defaultCheckedKeys = vm.personneList.map(r => r.id);
            //vm.orgIds = res.data.data.orgList;
            if (vm.storeSends == 0) {
	            this.defaultP = false;
	        } else {
	            this.defaultP = true;
	        }
	        this.ifTimeValue = true;
            this.orgIdsType = true;
            this.templateShow = true;
          } else {
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        })
        .catch(res => {
          vm.$message({
            message: "请求错误！",
            duration: "1500",
            type: "warning"
          });
        });
    },
    storeSenda(data) {
      this.storeSends = data;
    },
    personneCheckedList(data) {
      this.personneList = data;
      this.defaultCheckedKeys = data.map(r => r.id);
    },
    ruleOutpersonneCheckedList(data) {
      this.ruleOutpersonneList = data;
      this.defaultRuleOutCheckedKeys = data.map(r => r.id);
    },
    arrListEmit(data) {
      this.childrenList = data;
    },
    templateList(data) {
      this.templateListArr = data;
    },
    timeValue(data) {
      this.timeValues = data;
    },
    qxClose() {
      this.$router.go(-1);
    },
    submit() {
      let data = [];
      let vm = this;
      let dialogSrc = [];
      if (vm.actionId == "") {
        dialogSrc.push("<p>触发动作不能为空！</p>");
      }
      if (vm.timeValues == "") {
        dialogSrc.push("<p>统计时间不能为空！</p>");
      }
      if (vm.sendSet == "") {
        dialogSrc.push("<p>模板类型不能为空！</p>");
      }
      if (
        this.templateListArr.value == "" ||
        this.templateListArr.value == undefined ||
        this.templateListArr.value == null
      ) {
        dialogSrc.push("<p>消息模板不能为空！</p>");
      }
      if (this.templateListArr.title == "") {
        dialogSrc.push("<p>模板标题不能为空！</p>");
      }
      if (this.templateListArr.desc == "") {
        dialogSrc.push("<p>模板内容不能为空！</p>");
      }
      if (this.personneList == "" && vm.storeSends == "") {
        dialogSrc.push("<p>接收人不能为空！</p>");
      }
      if (
        (vm.childrenList[4].list[0] == 0 &&
          vm.childrenList[4].list[1] == 0 &&
          vm.childrenList[4].list[2] == 0 &&
          vm.childrenList[4].list[3] == 0 &&
          vm.childrenList[4].list[4] == 0) ||
        vm.childrenList[4].list.length < 0
      ) {
        dialogSrc.push("<p>通知方式不能为空！</p>");
      }
      if (
        vm.childrenList[1].effectCycleStartEnd[0] == null ||
        vm.childrenList[1].effectCycleStartEnd[0] == "" ||
        vm.childrenList[1].effectCycleStartEnd[0] == undefined||
        vm.childrenList[1].effectCycleStartEnd[1] == null ||
        vm.childrenList[1].effectCycleStartEnd[1] == "" ||
        vm.childrenList[1].effectCycleStartEnd[1] == undefined
      ) {
        dialogSrc.push("<p>有效周期不能为空！</P>");
      }
      if (vm.childrenList[1].effectCycleStartEnd[0]>vm.childrenList[1].effectCycleStartEnd[1]) {
        dialogSrc.push("<p>开始时间不能大于结束时间！</p>");
      }
      if (dialogSrc.length > 0) {
        dialogSrc = dialogSrc.join("");
        this.$dbwDialog(dialogSrc, "提示", {
          typeVisible: true,
          align: "center",
          footerCancel: false
        });
        return false;
      }

      var temp = this.personneList.map(function(val, index) {
        return val.id;
      });
      let ruleOutOtherIds = this.ruleOutpersonneList.map(function(val, index) {
        return val.id;
      });
      if (this.sendSet == 1) {
        if (vm.childrenList[5].sendType == 1) {
        } else {
          if (vm.childrenList[0].sendTime == "") {
            this.$dbwDialog("发送时间不能为空！", "提示", {
              typeVisible: true,
              align: "center",
              footerCancel: false
            });
            return false;
          }
          if (
            vm.timeValues.substr(0, 2) >
            vm.childrenList[0].sendTime.substr(0, 2)
          ) {
            this.$dbwDialog("统计时间不能大于发送时间！", "提示", {
              typeVisible: true,
              align: "center",
              footerCancel: false
            });
            return false;
          }
        }
        data = {
          chlApp: vm.childrenList[4].list[0],
          chlEmail: vm.childrenList[4].list[1],
          chlPush: vm.childrenList[4].list[2],
          chlSms: vm.childrenList[4].list[3],
          chlWeiXin: vm.childrenList[4].list[4],
          startTime: vm.childrenList[1].effectCycleStartEnd[0],
          endTime: vm.childrenList[1].effectCycleStartEnd[1],
          sendTime: vm.childrenList[0].sendTime,
          extraPersonnel: temp,
          otherPersonnel:ruleOutOtherIds,
          jobId: vm.actionId,
          sendFrequencyType: "",
          sendFrequencyValue: "",
          masterNo: "01",
          sendEvent: vm.childrenList[5].sendType,
          storeSend: vm.storeSends,
          taskName: "",
          taskType: vm.sendSet,
          templetId: vm.templateListArr.value,
          msgTitile: vm.templateListArr.title,
          msgContent: vm.templateListArr.desc,
          triggerStartTime: vm.timeValues,
          triggerTimeType: 0,
          triggerFrequencyType: 1,
          triggerFrequencyValue: 1
        };
      } else {
        data = {
          chlApp: vm.childrenList[4].list[0],
          chlEmail: vm.childrenList[4].list[1],
          chlPush: vm.childrenList[4].list[2],
          chlSms: vm.childrenList[4].list[3],
          chlWeiXin: vm.childrenList[4].list[4],
          startTime: vm.childrenList[1].effectCycleStartEnd[0],
          endTime: vm.childrenList[1].effectCycleStartEnd[1],
          sendTime: "",
          extraPersonnel: temp,
          otherPersonnel:ruleOutOtherIds,
          jobId: vm.actionId,
          sendFrequencyType: "",
          sendFrequencyValue: "",
          masterNo: "01",
          sendEvent: "",
          storeSend: vm.storeSends,
          taskName: "",
          taskType: vm.sendSet,
          templetId: vm.templateListArr.value,
          msgTitle: vm.templateListArr.title,
          msgContent: vm.templateListArr.desc,
          triggerStartTime: vm.timeValues,
          triggerTimeType: 0,
          triggerFrequencyType: 1,
          triggerFrequencyValue: 1
        };
      }
      this.isDisable = true;
      if(this.taskId!=""){
      	let data = {};
      	if (this.sendSet == 1) {
      		data = {
      			id:this.taskId,
	          chlApp: vm.childrenList[4].list[0],
	          chlEmail: vm.childrenList[4].list[1],
	          chlPush: vm.childrenList[4].list[2],
	          chlSms: vm.childrenList[4].list[3],
	          chlWeiXin: vm.childrenList[4].list[4],
	          startTime: vm.childrenList[1].effectCycleStartEnd[0],
	          endTime: vm.childrenList[1].effectCycleStartEnd[1],
	          sendTime: vm.childrenList[0].sendTime,
            extraPersonnel: temp,
            otherPersonnel:ruleOutOtherIds,
	          jobId: vm.actionId,
	          sendFrequencyType: "",
	          sendFrequencyValue: "",
	          masterNo: "01",
	          sendEvent: vm.childrenList[5].sendType,
	          storeSend: vm.storeSends,
	          taskName: "",
	          taskType: vm.sendSet,
	          templetId: vm.templateListArr.value,
	          msgTitile: vm.templateListArr.title,
	          msgContent: vm.templateListArr.desc,
	          triggerStartTime: vm.timeValues,
	          triggerTimeType: 0,
	          triggerFrequencyType: 1,
	          triggerFrequencyValue: 1
	        };
	      } else {
	        data = {
	        	id:this.taskId,
	          chlApp: vm.childrenList[4].list[0],
	          chlEmail: vm.childrenList[4].list[1],
	          chlPush: vm.childrenList[4].list[2],
	          chlSms: vm.childrenList[4].list[3],
	          chlWeiXin: vm.childrenList[4].list[4],
	          startTime: vm.childrenList[1].effectCycleStartEnd[0],
	          endTime: vm.childrenList[1].effectCycleStartEnd[1],
	          sendTime: "",
            extraPersonnel: temp,
            otherPersonnel:ruleOutOtherIds,
	          jobId: vm.actionId,
	          sendFrequencyType: "",
	          sendFrequencyValue: "",
	          masterNo: "01",
	          sendEvent: "",
	          storeSend: vm.storeSends,
	          taskName: "",
	          taskType: vm.sendSet,
	          templetId: vm.templateListArr.value,
	          msgTitle: vm.templateListArr.title,
	          msgContent: vm.templateListArr.desc,
	          triggerStartTime: vm.timeValues,
	          triggerTimeType: 0,
	          triggerFrequencyType: 1,
	          triggerFrequencyValue: 1
	        };
	    }
	    this.$http.post(api.renewTask(), data).then(res => {
	        if (res.data.code == 200) {
	          let taskName = "";
	          if (vm.sendSet == 1) {
	            taskName = "自动";
	          } else {
	            taskName = "手动";
	          }
	          this.$dbwDialog('修改'+taskName+'预警消息成功！', "提交成功", {
		          typeVisible: true,
	              align: "center",
	              footerCancel: false,
	              okClick: action => {
	                this.$router.go(-1);
	              },
	              cancelClick: action=>{
	              	this.$router.go(-1);
	              }
		        });
	        } else {
	          vm.$message({
	            message: res.data.msg,
	            duration: "1500",
	            type: "warning"
	          });
	          this.isDisable = false;
	        }
	      });
      }else{
      	this.$http.post(api.createdTask(), data).then(res => {
	        if (res.data.code == 200) {
	          let taskName = "";
	          if (vm.sendSet == 1) {
	            taskName = "自动";
	          } else {
	            taskName = "手动";
	          }
	          this.$dbwDialog('创建'+taskName+'预警消息成功！', "提交成功", {
		         typeVisible: true,
	              align: "center",
	              footerCancel: false,
	              cancelClick: action=>{
	              	this.$router.go(-1);
	              },
	              okClick: action => {
	                this.$router.go(-1);
	              }
		        });
	        } else {
	          vm.$message({
	            message: res.data.msg,
	            duration: "1500",
	            type: "warning"
	          });
	          this.isDisable = false;
	        }
	      });
      }
      
      
    },
    zdSend() {
      this.typeRw = true;
    },
    sdSedn() {
      this.typeRw = false;
    },
    triggerActionList() {
      let vm = this;
      this.$http.get(api.triggerList()).then(res => {
        if (res.data.code == 200) {
          vm.actionArr = res.data.data;
        } else {
          vm.$message({
            message: res.data.msg,
            duration: "1500",
            type: "warning"
          });
        }
      });
    },
    closeAction() {
      this.radioOne = this.actionId;
      this.dialogTableVisible = false;
    },
    selectAction() {
      let vm = this;
      this.actionId = vm.radioOne;
      this.actionArr.forEach(function(value) {
        if (vm.actionId == value.jobNo) {
          vm.actionName = value.jobName;
        }
      });
      this.dialogTableVisible = false;
    }
  }
};
</script>

<style>
.titleBox {
  width: 100%;
  height: auto;
  background: #fff;
  border-bottom: 1px solid #E1E1E1;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.title_header {
  font-size: 18px;
  color: #333744;
  letter-spacing: 0.43px;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
}
.title_header .title {
  margin-left: 20px;
}
.contentBox {
  width: 100%;
  height: auto;
  background: #fff;
  padding-bottom: 20px;
  padding-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.close {
  margin-right: 40px;
  font-size: 35px;
  margin-top: -5px;
  cursor: pointer;
}
.el-textarea__inner {
  min-height: 120px !important;
}
.el-message-box__headerbtn {
}
</style>