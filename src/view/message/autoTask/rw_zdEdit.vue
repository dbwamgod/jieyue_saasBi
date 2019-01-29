<template>
	<div style="padding-bottom: 20px;">
    	<div class="contentTitle">
			<div class="titleFont">查看自动任务</div>
			<div class="fr backIcon" @click="outBack">返回</div>
		</div>
		
		<div class='contentBoxBg'>
			<el-form ref="form" :model="form" label-width="100px">
			  	<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 触发动作：</div>
			  		<div>{{actionName}}</div>
			  	</el-form-item>
			  	
			  	<selectMsgTemplate :disabledAll="disabledAll" :values="valueId" v-if="templateShow" v-on:templateList="templateList" :isDisabled='true'></selectMsgTemplate>
			  	<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 接收人：</div>
			  		<div class="menNumBox">
							<!--<span v-show="personneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">已选人员展示区域</span>-->
		            		<span v-for="item in personneList" style="margin-right:10px">{{item.name}},</span>
		          		</div>
			  		<!--<selectPersonnel :defaultPs="defaultP" :disabledAll="disabledAll" v-on:personneCheckedList="personneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='personneList' :defaultCheckedKeys='defaultCheckedKeys'></selectPersonnel>-->
			  	<!--<selectPersonnel :defaultPs="defaultP" :disabledAll="disabledAll" v-on:ruleOutpersonneCheckedList="ruleOutpersonneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='ruleOutpersonneList' :defaultCheckedKeys='defaultRuleOutCheckedKeys' :isRuleOut='true'></selectPersonnel>
			    -->	<!--<el-button  style="height: 30px;padding:8px 20px;" type="primary">选择人员</el-button>-->
			    	<!--<div class="menNumBox">
              		<div class="personneListTitle">人员列表</div>
				    	<div class="menNum">
							<span v-show="personneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">已选人员展示区域</span>
		            		<span v-for="item in personneList" style="margin-left:10px">{{item.name}},</span>
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
			  	
			  	<!--<timeZq :disabledAll="disabledAll" :oncType="onc" :txlBools='true' v-on:arrListEmit="arrListEmit" :typeLxRW="typeRw" :arrList="timeZqArr"></timeZq>-->
			  	<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 通知方式：</div>
			  		<div>{{fsArrList}}</div>
			  	</el-form-item>
			  	<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 发送时间：</div>
			  		<div>{{sendTime}}</div>
			  	</el-form-item>
				<el-form-item style="width:300px;margin:0 auto;" v-if="pageShows">
					<template slot-scope="scope">
				        	<el-button type="info" @click="outBack"  style="height: 30px;margin-right:30px;padding:8px 20px;">取消</el-button>
				        	<el-button type="primary" :disabled="disabled"  @click="submit" style="height: 30px;padding:8px 20px;">确定</el-button>
				    </template>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import selectMsgTemplate from "@/view/message/msgZj/selectMsgTemplate";
import timeZq from "@/view/message/msgZj/timeZq";
import api from "../../../api";
import selectPersonnel from "@/view/message/msgZj/selectPersonnel";
export default {
  data() {
    return {
      dialogTableVisible: false,
      radioOne: "",
      onc: false,
      typeRw: true,
      actionName: "",
      orgIdsType: false,
      masterNo: "",
      personneList: [],
      defaultCheckedKeys: [],
      defaultRuleOutCheckedKeys: [], // 排他组件默认key
      ruleOutpersonneList: [], //排他组件list
      actionPId: [],
      childrenList: [],
      form: {},
      orgIds: [301],
      actionArr: "",
      valueId: "",
      timeZqArr: [],
      sendTime:'',
      disabled: false,
      templateShow: false,
      disabledAll: "",
      fsArrList:"",
      pageShows: true,
      defaultType: true
    };
  },
  components: {
    timeZq,
    selectPersonnel,
    selectMsgTemplate
  },
  created: function() {
    this.initInfo();
    if (this.$route.query.detailsId) {
      this.disabledAll = true;
      this.pageShows = false;
    }
  },
  methods: {
    arrListEmit(data) {
      this.childrenList = data;
    },
    templateList(data) {
      this.templateListArr = data;
    },
    submit() {
      let vm = this;
      if (
        vm.childrenList[4].list[0] == 0 &&
        vm.childrenList[4].list[1] == 0 &&
        vm.childrenList[4].list[2] == 0 &&
        vm.childrenList[4].list[3] == 0 &&
        vm.childrenList[4].list[4] == 0
      ) {
        this.$dbwDialog("必选参数不能为空！", "提示", {
          typeVisible: true,
          align: "center",
          footerCancel: false
        });
        return false;
      }
      if (
        this.templateListArr.value == "" ||
        this.templateListArr.title == "" ||
        this.templateListArr.desc == "" ||
        vm.masterNo == "" ||
        vm.childrenList[0].sendTime == "" ||
        vm.childrenList[1].effectCycleStartEnd == null ||
        vm.childrenList[4].list.length < 0 ||
        vm.personneList.length < 0 ||
        vm.childrenList[2].type == "" ||
        vm.childrenList[3].typeArr == ""
      ) {
        this.$dbwDialog("必选参数不能为空！", "提示", {
          typeVisible: true,
          align: "center",
          footerCancel: false
        });
        return false;
      }
      let msgTaskRecevers = vm.personneList.map(function(value, key) {
        return { name: value.name, id: value.id };
      });
      let msgTaskReceversT = vm.ruleOutpersonneList.map(function(value, key) {
        return { name: value.name, id: value.id };
      });
      this.disabled = true;
      this.$http
        .post(api.updateMsgAuto(), {
          id: vm.$route.query.id,
          msgTempletId: vm.templateListArr.value,
          msgTitle: vm.templateListArr.title,
          msgContent: vm.templateListArr.desc,
          msgTempletName: vm.templateListArr.valueName,
          masterNo: vm.masterNo,
          sendTime: vm.childrenList[0].sendTime,
          effectCycleStart: vm.childrenList[1].effectCycleStartEnd[0],
          effectCycleEnd: vm.childrenList[1].effectCycleStartEnd[1],
          chlApp: vm.childrenList[4].list[0],
          chlEmail: vm.childrenList[4].list[1],
          chlPush: vm.childrenList[4].list[2],
          chlSms: vm.childrenList[4].list[3],
          chlWeiXin: vm.childrenList[4].list[4],
          sendFequencyType: vm.childrenList[2].type,
          sendFrequencyValue: vm.childrenList[3].typeArr,
          msgTaskRecevers: msgTaskRecevers,
          otherPersonnel: msgTaskReceversT
        })
        .then(res => {
          this.disabled = false;
          if (res.data.code == 200) {
            this.$dbwDialog("自动预警任务修改成功！", "提交成功", {
              typeVisible: true,
              align: "center",
              footerCancel: false,
              okClick: action => {
                this.$router.go(-1);
              }
            });
          } else {
            this.$dbwDialog(res.data.msg, "提交失败", {
              typeVisible: true,
              align: "center",
              footer: false,
              autoHidden: "auto"
            });
          }
        });
    },
    outBack() {
      this.$router.go(-1);
    },
    personneCheckedList(data) {
      this.personneList = data;
    },
    ruleOutpersonneCheckedList(data) {
      this.ruleOutpersonneList = data;
      this.defaultRuleOutCheckedKeys = data.map(r => r.id);
    },
    initInfo() {
      let vm = this;
      this.$http.get(api.getInstanceTemp(vm.$route.query.detailsId)).then(res => {
        if (res.data.code == 200) {
        	vm.sendTime = res.data.data.sendTime;
          vm.actionName = res.data.data.taskName;
          vm.valueId = res.data.data.templetId + "";
          vm.masterNo = res.data.data.masterNo;
          vm.storeSend = res.data.data.storeSend;
          vm.personneList = res.data.data.extraPersonnel;
          vm.defaultCheckedKeys = vm.personneList.map(r => r.id);
          vm.ruleOutpersonneList = res.data.data.otherPersonnel;
          vm.defaultRuleOutCheckedKeys = vm.ruleOutpersonneList.map(r => r.id);
          vm.fsArrList = [];
          if(res.data.data.chlApp==1){
          	vm.fsArrList.push('站内信')
          }
          if(res.data.data.chlEmail==1){
          	vm.fsArrList.push('邮件')
          }
          if(res.data.data.chlPush==1){
          	vm.fsArrList.push('手机通知')
          }
          if(res.data.data.chlSms==1){
          	vm.fsArrList.push('短信')
          }
          if(res.data.data.chlWeiXin==1){
          	vm.fsArrList.push('微信公众号')
          }
          vm.fsArrList = vm.fsArrList.join(',')
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
                res.data.data.chlWeiXin
              ]
            },
            {
              type: res.data.data.sendFrequencyType,
              typeList: res.data.data.sendFrequencyValue
            },
            { sendType: res.data.data.sendEvent }
          ];
          vm.orgIds = res.data.data.orgList;
          if (vm.storeSend == 0) {
            this.defaultP = false;
          } else {
            this.defaultP = true;
          }
          this.orgIdsType = true;
          this.templateShow = true;
        } else {
          vm.$message({
            message: res.data.msg,
            duration: "1500",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style>
.title {
  font-size: 16px;
  color: #333;
  margin-left: 10px;
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
</style>