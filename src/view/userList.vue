<template>
	<div>
		<div class="contentBg">
				<div class="contentTitle">
					<div class="titleFont">用户列表</div>
					 <div class="addBtn fr" @click="newTemplate()"><i></i> 新增用户</div> 
				</div>
				 <el-table v-loading="loading" stripe :data="tableData" style="width: 100%;" border>
				 	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	:index="indexMethod">
			  		</el-table-column>
				    <el-table-column prop="account" label="登录账号"></el-table-column>
				    <el-table-column prop="userName" label="姓名 "></el-table-column>
				    <el-table-column prop="sex" label="性别">
				    	<template slot-scope="scope" >
				    		<div>{{scope.row.sex | sexValue}}</div>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="orgFullName" label="所属机构 "></el-table-column>
				    <el-table-column prop="email" label="邮箱"></el-table-column>
				    <el-table-column prop="mobile" label="手机号 "></el-table-column>
				    <!--<el-table-column label="操作" width="140" fixed="right">
		      			<template slot-scope="scope" >
		        			<el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row)" type="text" size="small"></div></el-tooltip>
		        			<el-tooltip :enterable="false" v-if="scope.row.timeStatus==0" content='该任务已过期' placement="top"><div class="fl" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div> </div></el-tooltip>
		        			<el-tooltip :enterable="false" v-else :content="scope.row.isValid==1?'是否停用':'是否启用'" placement="top"><div class="fl" @click="stop(scope.row)" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div></div></el-tooltip>
		        			<el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click="stop(scope.row,scope.$index,2)" type="text" size="small"></div></el-tooltip>
		      			</template>
		    		</el-table-column>-->
				</el-table>
			</div>
			<el-pagination v-if="pageShow" style="margin-top:30px;"
			  background
			  layout="total,prev, pager, next"
           	  :current-page.sync = "currentPage"
              @current-change="aTable"
              :page-count="totalPages"
            >
			</el-pagination>
			
			<el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
				<div style="margin:30px 0 20px 30px;">新增用户</div>
				<el-form ref="form" :model="form">
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 登录账号：</div>
					    <el-input placeholder="请输入登录账号" v-model="loginNum" style="width:70%"></el-input>
					</el-form-item>
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 密码：</div>
					    <div>随机</div>
					</el-form-item>
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 开通业务：</div>
					    <el-select v-model="businessValue" placeholder="请选择" style="width:70%;">
						    <el-option 
						      v-for="item in business"
						      :key="item.masterNo"
						      :label="item.masterNm"
						      :value="item.masterNo">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div style="clear: both;"></div>
				<div style="margin:30px 0 20px 30px;">用户基础信息</div>
				<el-form ref="form" :model="form" >
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 员工姓名：</div>
					    <el-input placeholder="请输入员工姓名" v-model="userName" style="width:40%"></el-input>
					    <el-radio-group v-model="userSex" style="margin-left:50px">
							<el-radio :label="1">男</el-radio>
							<el-radio :label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 员工编号：</div>
					    <el-input placeholder="请输入员工编号" v-model="userNum" style="width:70%"></el-input>
					</el-form-item>
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 手机号码：</div>
					    <el-input placeholder="请输入手机号码" v-model="phone" style="width:70%"></el-input>
					</el-form-item>
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 邮箱：</div>
					    <el-input placeholder="请输入邮箱" v-model="email" style="width:70%"></el-input>
					</el-form-item>
					<el-form-item class="redBar">
					  	<div class="yjItem"><span>*</span> 所属机构：</div>
						<el-cascader
							style="width:70%;"
							 @change="handleItemChange"
						  	:options="options"
						  	:props = 'prop'
						  	:change-on-select = 'typeChange'
						></el-cascader>
					</el-form-item>
				</el-form>	
				
				<span slot="footer" class="dialog-footer">
				  	<el-button @click="dialogVisible = false">取 消</el-button>
				   	<el-button type="primary" @click="submit">确 定</el-button>
				</span>
			</el-dialog>
	</div>
</template>

<script>
import api from "../api";
import Moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 0,
      pageSize: 10,
      requests: "",
      totalPages: 1,
      typeChange:true,
      pageShow: false,
      loading: true,
      dialogVisible:false,
      loginNum:'',
      userName:'',
      userNum:'',
      phone:'',
      email:'',
      form:{},
      business:[],
      options:[],
      businessValue:'',
      mechanismValue:'',
      mechanism:[],
      userSex:1,
      prop:{
      	value:'id',
      	label:'name',
      	children:'child'
      }
    };
  },
  watch: {
    /*currentPage() {
      this.fetchData();
    }*/
  	'$route':'getPath' 
  },
  filters: {
    sexValue: value => {
      switch (value) {
        case 1:
          return "男";
          break;
        case 2:
          return "女";
          break;
        default:
          return "";
          break;
      }
    },
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
  	this.fetchData();
  	this.initBusiness();
  	this.getMechanism();
  },
  methods: {
  	initBusiness(){
  		this.$http.get(api.masterInfo()).then(res => {
          if (res.data.code == 200) {
           	this.business=res.data.data
          } else {
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
  	},
  	getMechanism(){
  		this.$http.get(api.outfitList()).then(res => {
          if (res.data.code == 200) {
           		this.options=[res.data.data];
          } else {
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
  	},
  	handleClose(done) {
        this.dialogVisible=false
    },
  	newTemplate(){
  		this.dialogVisible = true;
  	},
  	getPath(){
  		this.currentPage = +this.$route.query.page || 1
  		this.fetchData();
  	},
  	indexMethod(index) {
  		return index+ 1 + ((this.currentPage-1)*this.pageSize);
    },
    handleItemChange(val){
    	if(val.length>0){
    		val = val[val.length - 1]
    	}
    	this.mechanismValue=val;
    },
    submit(){
    	var vm = this;
      	this.$http.post(api.userAdd(),{
	        account:vm.loginNum,
			pwd:"",
			masterNo:vm.businessValue,
			name:vm.userName,
			sex:vm.userSex,
			employeeId:vm.userNum,
			phone:vm.phone,
			email:vm.email,
			orgCode:vm.mechanismValue
        }).then(res => {
          if (res.data.code == 200) {
          	this.$dbwDialog("提交成功！", "提示", {
              	typeVisible: true,
	            align: "center",
	           	footerCancel: false,
	            okClick: action => {
	            	vm.loginNum="";
					vm.businessValue="";
					vm.userName="";
					vm.userSex="";
					vm.userNum="";
					vm.phone="";
					vm.email="";
					vm.mechanismValue="";
	              	this.fetchData();
           			this.dialogVisible=false;
	            }
            });
          } else {
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
    },
    fetchData() {
      var vm = this;
      this.$http.post(api.userList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize,
        }).then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            vm.tableData = res.data.data;
            vm.totalPages = res.data.page.totalPages;
            vm.currentPage = res.data.page.currentPage;
            if (res.data.page.totalPages == 0) {
              vm.pageShow = false;
            } else {
              vm.pageShow = true;
              if (res.data.data == null||res.data.data == ""||res.data.data == undefined) {
                vm.currentPage = vm.currentPage - 1;
                this.$common.setUrL('page='+this.currentPage)
                this.fetchData();
              }
            }
          } else {
            this.loading = false;
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
    },
    aTable(val) {
      this.currentPage = val;
      this.$common.setUrL('page='+this.currentPage)
	  this.fetchData();
    }
    
  }
};
</script>

<style>
</style>
