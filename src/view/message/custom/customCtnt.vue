<template>
	<div style="padding-bottom: 20px;">
		<div class="contentTitle">
			<div class="titleFont">{{title}}</div>
			<div class="fr backIcon" @click="outBack">返回</div>
		</div>
		<div class='contentBoxBg'>
			<el-form ref="form" :model="form" label-width="100px">
			  	<el-form-item class="redBar input_box">
			  		<div class="yjItem"><span>*</span> 任务标题：</div>
			  		<div style="position: relative;width:80%;float: left;">
			    		<el-input v-model.trim="form.rw_title" maxlength="30" :disabled="isType"></el-input>
				    	<div class="total_num">
				          <span class="current_num">{{form.rw_title.length}}</span>
				          <span>/30</span>
				        </div>
			        </div>
			 	</el-form-item>
			 	<el-form-item class="redBar">
			 		<div class="yjItem"><span>*</span> 内容设置：</div>
					<el-radio-group v-model="selectSet" class="fl" style="margin-right:15px;margin-top:15px;" :disabled="isType">
						<el-radio :label="2" >自定义消息</el-radio>
						<el-radio :label="1" >消息模板</el-radio>
					</el-radio-group>
				</el-form-item>
				<div v-if='selectSet == 2 ? false : true'>
					<selectMsgTemplate :disabledAll="isType" :values="valueId" v-if="templateShow" v-on:templateList="templateList" :isDisabled='true'></selectMsgTemplate>
			  	</div>
			  	<div v-if='selectSet == 1 ? false : true'>
			  		<el-form-item class="redBar input_box">
			  			<div class="yjItem"><span>*</span> 消息标题：</div>
			  			<div style="position: relative;width:80%;float: left;">
						    <el-input maxlength="35" v-model.trim="form.zdy_title" :disabled="isType"></el-input>
						    <div class="total_num">
					          <span class="current_num">{{form.zdy_title.length}}</span>
					          <span>/35</span>
					        </div>
					    </div>
					</el-form-item>
					<div style="clear: both;"></div>
					<quillEditor :templateType='templateType' :isDisabled="isType" v-on:quillContent="quillContents" v-if="qullBool" :initQuill="initQuill"></quillEditor>
			  	</div>
			  	
			  	<el-form-item  v-show="isType" class="redBar">
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
			  	<el-form-item v-show="!isType" class="redBar">
			  		<div class="yjItem"><span>*</span> 接收人：</div>
			  		<selectPersonnel :disabledAll="isType" :templateType='templateType' v-on:storeSenda = "storeSenda" v-on:personneCheckedList="personneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='personneList' :defaultCheckedKeys='defaultCheckedKeys'></selectPersonnel>
			  	  <!--<selectPersonnel :disabledAll="isType" :templateType='templateType' v-on:storeSenda = "storeSenda"  v-on:ruleOutpersonneCheckedList="ruleOutpersonneCheckedList" :orgIds="orgIds" v-if='orgIdsType' :personneList='ruleOutpersonneList' :defaultCheckedKeys='defaultRuleOutCheckedKeys' :isRuleOut='true'></selectPersonnel>
-->
			    	<div style="clear: both;"></div>
			    	<div class='menNumBox'>
              		<div class="personneListTitle">选择人员列表</div>
				    	<div class="menNum">
							<span v-show="personneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">已选人员展示区域</span>
		            		<span v-for="item in personneList" style="margin-left:10px">{{item.name}},</span>
		          		</div>
	          		</div>
	            	<!--<div class="menNumBox">    
	              		<div class="personneListTitle">额外人员列表</div>
				    	<div class="menNum">
							<span v-show="ruleOutpersonneList.length==0" style="color:#C0C4CC; font-size:'12px';  margin-left:15px;">排他人员展示区域</span>
		            		<span v-for="item in ruleOutpersonneList" style="margin-left:10px; display: inline-block;">{{item.name}},</span>
		          		</div>
				    </div> -->   
			  	</el-form-item>
			  	
			  	<div v-show="!isType">
			  		<timeZq :sms='sms' v-if="timeZqShow" :disabledAll="isType" :templateType='templateType' :oncType="onc" :typeCycle="typeCycle" :txlBools="txlBool" v-on:arrListEmit="arrListEmit" :typeLxRW="typeRw" :arrList="timeZqArr"></timeZq>
			  	</div>
			  	<div v-show="isType">
			  		<el-form-item class="redBar">
			  		<div class="yjItem"><span>*</span> 通知方式：</div>
			  		<div>{{fsArrList}}</div>
				  	</el-form-item>
				  	<el-form-item class="redBar">
				  		<div class="yjItem"><span>*</span> 发送时间：</div>
				  		<div>{{sendTime}}</div>
				  	</el-form-item>
			  	</div>
			  	
				<div class="btnBox" v-show="!isType">
				    <el-button type="info" class="btnLeft" @click="outBack">取消</el-button>
				    <el-button type="primary" class="btnRight" :disabled="disabled" @click="subMit">确定</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import selectMsgTemplate from "@/view/message/msgZj/selectMsgTemplate";
import timeZq from "@/view/message/msgZj/timeZq";
import api from "../../../api";
import selectPersonnel from "@/view/message/msgZj/selectPersonnel";
import quillEditor from "@/view/message/msgZj/quillEditor";
export default {
  data() {
    return {
      title: "创建普通任务",
      dialogTableVisible: false,
      dialogTableVisibleZM: false,
      disabled: false,
      valueId: "",
      typeCycle: true,
      defaultCheckedKeys: [],
      typeRw: true,
      selectSet: '',
      onc: true,
      sendTime:'',
      storeSends: "",
      forms: {
        type: []
      },
      forma: {
        type: []
      },
      form: {
        rw_title: "",
        zdy_title: "",
        zdy_desc: ""
      },
      templateListArr:{},
      timeZqArr: [],
      childrenList: [],
      personneList: [],
      defaultRuleOutCheckedKeys: [],// 排他组件默认key
      //ruleOutpersonneList: [],//排他组件list
      orgIdsType: true,
      orgIds: [301],
      txlBool: true,
      templateShow: true,
      taskId: "",
      masterNo: "01",
      quillContent: { html: "", content: "" },
      initQuill: "",
      qullBool: true,
      fsArrList:"",
      templateType: "custom",
      isType:false,
      timeZqShow:true,
      sms:'SMS',
    };
  },
  components: {
    timeZq,
    selectPersonnel,
    selectMsgTemplate,
    quillEditor
  },
  created: function() {
  	this.selectSet = 2;
    //console.log(this.$route.query.id);
    let type = this.$route.query.isType;

    if (this.$route.query.id) {
      this.title = "编辑普通任务";
      this.taskId = this.$route.query.id;
      this.qullBool = false;
      if(type=="false"||type==false){
        this.title = "查看普通任务";
        this.isType=true;//区分是不是查看
        //return this.info();
      }
      this.info();
    }
   
  },
  watch:{
	templateListArr(){
	 	this.sms=this.templateListArr.SMSType;
	 	this.timeZqShow = false;
	 	this.timeZqShow = true;
	},
	selectSet(){
		if(this.selectSet==2){
			this.sms='';
	 		this.timeZqShow = false;
	 		this.timeZqShow = true;
		}else{
			this.sms='SMS';
	 		this.timeZqShow = false;
	 		this.timeZqShow = true;
		}
	}
  },
  methods: {
    storeSenda(data) {
      this.storeSends = data;
    },
    quillContents(data) {
      this.quillContent = data;
    },
    info() {
      let vm = this;
      console.log(this.$route.query.isType)
      let httpId="";
      if(this.$route.query.isType=='true'|| this.$route.query.isType==true){
      	httpId=api.getTaskTemp(vm.taskId)
      }else{
      	httpId=api.getInstanceTemp(vm.taskId)
      }
      this.$http.get(httpId).then(res => {
          if (res.data.code == 200) {
          	vm.sendTime = res.data.data.sendTime;
            vm.selectSet = res.data.data.msgTempletType;
            vm.form.rw_title = res.data.data.taskName;
            if (res.data.data.msgTempletType == 1) {
              vm.valueId = res.data.data.templetId + "";
            } else {
              vm.form.zdy_title = res.data.data.msgTitile;
              vm.initQuill = res.data.data.msgContent;
              vm.quillContent.html = res.data.data.msgContent;
              vm.quillContent.content = res.data.data.msgContent;
            }
            vm.masterNo = res.data.data.masterNo;
            vm.personneList = res.data.data.extraPersonnel;
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
            //vm.ruleOutpersonneList = res.data.data.otherPersonnel;
            //vm.defaultRuleOutCheckedKeys = vm.ruleOutpersonneList.map(r => r.id);
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
            vm.orgIds = res.data.data.orgList;
            console.log(vm.valueId,'====')
            this.orgIdsType = true;
            this.templateShow = false;
            this.templateShow = true;
            this.qullBool = true;
          } else {
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        }).catch(res => {
          vm.$message({
            message: "请求错误！",
            duration: "1500",
            type: "warning"
          });
        });
       
    },
    arrListEmit(data) {
      this.childrenList = data;
    },
    templateList(data) {
      this.templateListArr = data;
    },
    personneCheckedList(data) {
      this.personneList = data;
      this.defaultCheckedKeys = this.personneList.map(r => r.id);
    },
    /*ruleOutpersonneCheckedList(data) {
      this.ruleOutpersonneList = data;
      this.defaultRuleOutCheckedKeys = data.map(r => r.id);
    },*/
    subMit() {
      this.disabled = true;
      let vm = this;
      if(vm.childrenList[5].sendType == 1){
      	vm.childrenList[3].typeArr = "";
      	vm.childrenList[2].type = "";
      	vm.childrenList[1].effectCycleStartEnd[0] = "";
      	vm.childrenList[1].effectCycleStartEnd[1] = "";
      }
      vm.form.rw_title = this.form.rw_title.replace(/\s/g, "");
      let titles = "";
      let content = "";
      let templateId = "";
      let teplateName = "";
      let dialogSrc = [];
      let textContent = '';
      if (vm.form.rw_title == "") {
        dialogSrc.push("<p>任务标题不能为空！</P>");
      }
      if (vm.selectSet == 1) {
        this.templateShow = false;
        this.templateShow = true;
        if (this.templateListArr == undefined ||this.templateListArr == null ||this.templateListArr == ""){
        } else {
          titles = this.templateListArr.title;
          content = this.templateListArr.desc;
          teplateName = this.templateListArr.valueName;
          templateId = this.templateListArr.value;
          textContent = this.templateListArr.desc.replace(/<[^>]+>/g, "");
        }
      } else {
        titles = vm.form.zdy_title;
        content = vm.quillContent.html;
        textContent = vm.quillContent.content.replace(/<[^>]+>/g, "");
        teplateName = "";
        templateId = "";
        if (content == "") {
          dialogSrc.push("<p>推送内容不能为空！</P>");
        }
        if (
          content != "" &&
          vm.quillContent.content.replace(/\s/g, "") == "<p></p>"
        ) {
          dialogSrc.push("<p>推送内容不能为空！</P>");
        }
        if (content != "" && vm.quillContent.content.replace(/\s/g, "") == "") {
          dialogSrc.push("<p>推送内容不能为空！</P>");
        }
      }
      if (titles == "") {
        dialogSrc.push("<p>消息标题不能为空！</P>");
      }
      if (this.personneList == "") {
        dialogSrc.push("<p>接收人不能为空！</P>");
      }
      if (
        vm.childrenList[4].list[0] == 0 &&
        vm.childrenList[4].list[1] == 0 &&
        vm.childrenList[4].list[2] == 0 &&
        vm.childrenList[4].list[3] == 0 &&
        vm.childrenList[4].list[4] == 0
      ) {
        dialogSrc.push("<p>通知方式不能为空！</P>");
      }
      if (vm.childrenList[5].sendType == 1) {
      } else{
      	if (vm.childrenList[0].sendTime == "") {
        	dialogSrc.push("<p>发送时间不能为空！</P>");
      	}
      	vm.childrenList[3].typeArr=vm.childrenList[3].typeArr+''
      	if (vm.childrenList[3].typeArr == 'NaN'||vm.childrenList[3].typeArr==""||vm.childrenList[3].typeArr=="0") {
        	dialogSrc.push("<p>发送频次不能为空！</P>");
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
      } 
      
      if (dialogSrc.length > 0) {
        dialogSrc = dialogSrc.join("");
        console.log('1231231231',this.$dbwDialog,this)
        this.$dbwDialog(dialogSrc, "提示", {
          typeVisible: true,
          align: "center",
          footerCancel: false
        });
        this.disabled = false;
        return false;
      }

      let msgTaskRecevers = vm.personneList.map(function(value, key) {
        return value.id;
      });
      /*let msgTaskReceversT = vm.ruleOutpersonneList.map(function(value, key) {
        return value.id;
      });*/
      if (this.$route.query.id) {
        this.$http.post(api.renewTask(), {
            id: vm.$route.query.id,
            msgTempletType: vm.selectSet,
            taskName: vm.form.rw_title,
            templetId: templateId,
            msgTitile: titles,
            msgContent: content,
            masterNo: vm.masterNo,
            chlApp: vm.childrenList[4].list[0],
            chlEmail: vm.childrenList[4].list[1],
            chlPush: vm.childrenList[4].list[2],
            chlSms: vm.childrenList[4].list[3],
            chlWeiXin: vm.childrenList[4].list[4],
            startTime: vm.childrenList[1].effectCycleStartEnd[0],
            endTime: vm.childrenList[1].effectCycleStartEnd[1],
            sendTime: vm.childrenList[0].sendTime,
            sendFrequencyType: vm.childrenList[2].type,
            sendFrequencyValue: vm.childrenList[3].typeArr,
            extraPersonnel: msgTaskRecevers,
            taskType: 3,
            jobId: "",
            storeSend: "",
            textContent:textContent,
            sendEvent: vm.childrenList[5].sendType,
            triggerStartTime: "",
            triggerTimeType: "",
            triggerFrequencyType: "",
            triggerFrequencyValue: "",
            //otherPersonnel: msgTaskReceversT
          })
          .then(res => {
            this.disabled = false;
            if (res.data.code == 200) {
              this.$dbwDialog("普通预警任务修改成功！", "提交成功", {
                typeVisible: true,
                footerCancel: false,
                align: "center",
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
            }
          })
          .catch(() => {
            this.disabled = false;
          });
      } else {
        this.$http
          .post(api.createdTask(), {
            msgTempletType: vm.selectSet,
            taskName: vm.form.rw_title,
            templetId: templateId,
            msgTitile: titles,
            msgContent: content,
            masterNo: vm.masterNo,
            textContent:textContent,
            chlApp: vm.childrenList[4].list[0],
            chlEmail: vm.childrenList[4].list[1],
            chlPush: vm.childrenList[4].list[2],
            chlSms: vm.childrenList[4].list[3],
            chlWeiXin: vm.childrenList[4].list[4],
            startTime: vm.childrenList[1].effectCycleStartEnd[0],
            endTime: vm.childrenList[1].effectCycleStartEnd[1],
            sendTime: vm.childrenList[0].sendTime,
            sendFrequencyType: vm.childrenList[2].type,
            sendFrequencyValue: vm.childrenList[3].typeArr,
            extraPersonnel: msgTaskRecevers,
            taskType: 3,
            jobId: "",
            storeSend: "",
            sendEvent: vm.childrenList[5].sendType,
            triggerStartTime: "",
            triggerTimeType: "",
            triggerFrequencyType: "",
            triggerFrequencyValue: "",
            //otherPersonnel: msgTaskReceversT
          })
          .then(res => {
            this.disabled = false;
            if (res.data.code == 200) {
              this.$dbwDialog("普通预警任务创建成功！", "提交成功", {
                typeVisible: true,
                footerCancel: false,
                align: "center",
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
            }
          })
          .catch(() => {
            this.disabled = false;
            /*vm.$message({
							message: res.data.msg,
							duration:'1500',
							type: 'warning'
						});  */
          });
      }
    },
    outBack() {
      this.$router.go(-1);
    },
    dqMb: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
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
.contentBoxBg {
  .input_box {
    position: relative;
    .total_num {
      position: absolute;
      right: 0%;
      top: -33px;
    }
    .total_num_desc {
      position: absolute;
      right: 0%;
      top: -33px;
    }
    .current_num {
      color: red;
    }
  }
}
</style>