<template>
  <div>
    <div class="contentTitle">
				<div class="titleFont">{{title}}</div>
				<div class="fr backIcon" @click="outBack">返回</div>
		</div>
		<div class='contentBoxBg'>
		    <el-form ref="form" :model="form">
		    	<div class="fl">
			      <el-form-item class="redBar" prop="checked">
			      	<div class="yjItem"><span>*</span> 脱敏渠道：</div>
			        <el-checkbox-group class="fl" style="margin-right:15px;" v-model="checkList" v-for="mpb in fsArr">
			          <el-checkbox :key="mpb.id" :checked="mpb.checked" :label="mpb.id" :disabled="mpb.disabled">{{mpb.name}}
			          </el-checkbox>
			        </el-checkbox-group>
			      </el-form-item>
			      <el-form-item  class="redBar" prop="content">
			      	<div class="yjItem"><span>*</span> 脱敏词：</div>
			        <el-row :gutter="8" style="margin-bottom:10px;">
			          <el-col :span="4" style="width:50%">
			            <el-input v-model="replaceAgo"  placeholder="请输入内容"></el-input>
			          </el-col>
			        </el-row>
			      </el-form-item>
			      <el-form-item  class="redBar" prop="content">
			      	<div class="yjItem">替换为：</div>
			        <el-row :gutter="8" style="margin-bottom:10px;">
			          <el-col :span="4" style="width:50%">
			            <el-input v-model="replaceLater" width="50%" placeholder="请输入内容"></el-input>
			          </el-col>
			        </el-row>
			      </el-form-item>
		      </div>
		      <div class="fr" style="margin-right:50px;">
		      	<div class="boxContent">
		      		<div class="boxContent_title"><i></i>应用说明</div>
		      		<div class="boxContent_content">
		      			<p>设置脱敏渠道和脱敏词后，在对应的脱敏渠道，敏感词将按替换词进行展示</p>
		      			<div class="box_item">
		      				<div class="fl box_item_title">例子</div>
		      				<div class='fl box_item_font'>
		      						<p>渠道：手机通知</p>
											<p>脱敏词：放款任务</p>
											<p>替换为：业绩</p>
		      				</div>
		      				<div style="clear: both;"></div>
		      			</div>
		      			<div class="box_item">
		      				<div class="fl box_item_title">例句</div>
		      				<div class='fl box_item_font'>
		      						<p>后台设置推送内容为：粤一本月放款任务未达标通报</p>
											<p>手机通知实际收到内容为：粤一本月业绩未达标通报</p>
		      				</div>
		      			</div>
		      		</div>
		      	</div>
		      </div>
		      <div style="clear: both;"></div>
		      <div class="btnBox">
				    <el-button type="info" class="btnLeft" @click="outBack">取消</el-button>
				    <el-button type="primary" class="btnRight" :disabled="disabled" @click="makeSend">确定</el-button>
					</div>
		    </el-form>
	   </div>
  </div>
</template>

<script>
	import api from '../../../api'
  export default {
    data() {
      return {
      	title:'新增脱敏规则',
        replaceAgo:'',
        replaceLater:'',
        checkList: [],
        disabled:false,
        sensitiveId:"",
        fsArr: [
          {id: 1, name: "手机通知", disabled: false, checked: false},
          {id: 3, name: "站内信", disabled: false, checked: false},
          {id: 2, name: "短信", disabled: false, checked: false},
          {id: 4, name: "邮件", disabled: false, checked: false},
        ],
        form:{
          checked:'',
          content:'',
        }
      }
    },
    created:function(){
      if(this.$route.query.id){
      		this.sensitiveId = this.$route.query.id;
        	this.title = '修改脱敏规则';
        	this.info();
      }
    },
    methods: {
      outBack() {
        this.$router.go(-1);
      },
      info(){
      	let vm = this;
    		this.$http.get(api.getSensitiveDetial(vm.sensitiveId)).then((res) => {
			    	if(res.data.code==200){
			    			vm.replaceAgo=res.data.data.sensitiveWord;
			    			vm.replaceLater=res.data.data.replaceWord;
			    			vm.checkList = res.data.data.channel;
			    			//console.log(vm.checkList);
			    	}else{
			    		vm.$message({
				            message: res.data.msg,
				            duration:'1500',
				            type: 'warning'
				          });
			    	}
				}).catch(() => {
	      });
      },
      makeSend () {
      	let vm = this;
      	vm.disabled = true;
      	if(this.sensitiveId){
      		if(vm.checkList==""||vm.checkList.length<=0||vm.checkList==null||vm.checkList==undefined){
      					vm.$message({
					            message: '脱敏渠道不能为空',
					            duration:'1500',
					            type: 'warning'
					          });
					      vm.disabled = false;
      					return false
      		}
      		if(vm.replaceAgo==""){
      			vm.$message({
					            message: '脱敏词不能为空！',
					            duration:'1500',
					            type: 'warning'
					          });
					      vm.disabled = false;
      					return false
      		}
      		if(vm.replaceAgo==vm.replaceLater){
      			vm.$message({
					            message: '脱敏词与被脱敏词不能相同！',
					            duration:'1500',
					            type: 'warning'
					          });
					      vm.disabled = false;
      					return false
					}
					console.log('vm.replaceLater=========',vm.replaceLater)
      		this.$http.post(api.upDateSensitive(),{
	    					channel: vm.checkList,
	  						replaceWord: vm.replaceLater,
	  						sensitiveWord:vm.replaceAgo,
	  						sensitiveId: vm.sensitiveId,
	    		}).then((res) => {
	    			  vm.disabled = false;
				    	if(res.data.code==200){
				    			this.$dbwDialog('更新脱敏成功！','提交成功',{
													typeVisible: true,
													align:'center',	
													footerCancel: false,
								          okClick: action => {
								           	this.$router.go(-1);
								          }
								 });
				    	}else{
				    		vm.$message({
					            message: res.data.msg,
					            duration:'1500',
					            type: 'warning'
					          });
				    	}
					}).catch(() => {
							vm.disabled = false;
		      });
      	}else{
      		if(vm.checkList==""||vm.checkList.length<=0||vm.checkList==null||vm.checkList==undefined){
      					vm.$message({
					            message: '脱敏渠道不能为空',
					            duration:'1500',
					            type: 'warning'
					          });
					      vm.disabled = false;
      					return false
      		}
      		if(vm.replaceAgo==""){
      			vm.$message({
					            message: '脱敏词不能为空！',
					            duration:'1500',
					            type: 'warning'
					          });
					      vm.disabled = false;
      					return false
      		}
      		if(vm.replaceLater==vm.replaceAgo){
      			vm.$message({
					            message: '脱敏词与被脱敏词不能相同！',
					            duration:'1500',
					            type: 'warning'
					          });
					      vm.disabled = false;
      					return false
      		}
      		this.$http.post(api.addSensitive(),{
	    					channel: vm.checkList,
	  						replaceWord: vm.replaceLater,
	  						sensitiveWord:vm.replaceAgo,
	    		}).then((res) => {
	    			  vm.disabled = false;
				    	if(res.data.code==200){
									this.$dbwDialog('新建脱敏成功！','提交成功',{
													typeVisible: true,
													align:'center',
													footerCancel:false,
								          okClick: action => {
								           		this.$router.go(-1);
								          }
								 });
				    	}else{
				    			vm.$message({
					            message: res.data.msg,
					            duration:'1500',
					            type: 'warning'
					        });
				    	}
					}).catch(() => {
							vm.disabled = false;
		      });
      	}
	      
      }
      
    }

  }
</script>

<style scoped>
  .close{
    margin-right:40px;
    font-size:35px;
    margin-top:-5px;
    cursor: pointer;
  }
  .boxContent{
  	background: #FFFEF9;
		border: 1px solid #C9C9C9;
		width:500px;
		height:252px;
  }
  .boxContent_title{
  	height:35px;
  	text-indent: 0px;
  	font-size: 16px;
		color: #666;
		letter-spacing: -0.38px;
		line-height: 35px;
		font-weight: bold;
		border-bottom: 1px solid #EAEAEA;
  }
  .boxContent_title i{
  	width:30px;
  	height:35px;
  	background: url(../../../assets/images/icon/explain.png) no-repeat center center;
  	float:left;
  	margin-left:20px;
  }
  .boxContent_content{
  	width:90%;
  	margin:0 auto;
  	font-size: 14px;
		color: #666;
		letter-spacing: -0.38px;
		line-height: 30px;
		height:30px;
		padding-top:10px;
  }
  .box_item{
  	margin-top:10px;
  }
  .box_item_title{
  	font-size: 16px;
		color: #666;
		letter-spacing: -0.38px;
		font-weight: bold;
		margin-right:40px;
  }

</style>
