<template>
  <div class="dataUp" style="width:99%">
  		<el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
              <el-col :span="24" >
  							<el-select size='small' style="width:10%;" v-model="selectValue" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						  	</el-select>
							  <el-input size='small'  style="width:20%;margin:0 10px;" v-model="search" placeholder="请输入"></el-input>
				        <el-button size='small' style="padding: 8px;" type="primary" icon="el-icon-search" @click="searchFun">搜索</el-button>
				        <div class="fr" @click="exportBtn">
				        	<span class="resend-btn resend-btn-start" style="padding: 3.5px 17px;">
                    <img :src="require('@/assets/images/icon/export.png')" alt="" >
                    <span>导出</span>
                  </span>
				        </div>
				        <el-date-picker class="fr"
				        	size='small'
				        	style="margin-right:10px;"
						      v-model="value1"
						      type="date"
						      value-format="yyyy-MM-dd"
						      placeholder="请选择补录时间">
						    </el-date-picker>
						    <div class="fr" @click="dropVisible=true" style="margin-right:10px;">
				        	<span class="resend-btn resend-btn-start"  style="padding: 3.5px 17px;">
                    <img :src="require('@/assets/images/icon/import.png')" alt="" >
                    <span>导入</span>
                  </span>
				        </div>
  							<a :href="srcUrl" style="margin-right:10px;" class='fr' download="员工花名册导入模板.xls">
  								<span class="resend-btn resend-btn-start"  style="padding: 3.5px 17px;">
                    <img :src="require('@/assets/images/icon/downLoader.png')" alt="" >
                    <span>下载模板</span>
                  </span>
  							</a>
              </el-col>
      </el-row>
  		
  						<el-table v-loading="loading" stripe ref="multipleTable" border :data="tableData">
  							<el-table-column
				      	type="index"
				      	label = '序号'
				      	align="center" 
			      		width = '60px'
				      	:index="indexMethod">
				  			</el-table-column>
		          	<el-table-column align="center" prop="regId" width="100" label=" 大区编号 " ></el-table-column>
		            <el-table-column align="center" prop="divId" width="100" label=" 分部编码 " ></el-table-column>
		            <el-table-column align="center" prop="orgId" width="100" label="营业部编号" ></el-table-column>
		            <el-table-column align="center" prop="userId" width="100" label="员工编号" ></el-table-column>
		            <el-table-column align="center" prop="userNm" width="100" label="员工名称" ></el-table-column>
		            <el-table-column align="center" prop="cardId" width="100" label="证件编号 " ></el-table-column>
		            <el-table-column align="center" prop="postSeqCd" width="100" label="岗位序列编码" ></el-table-column>
		            <el-table-column align="center" prop="postSeqNm" width="100" label="岗位序列名称" ></el-table-column>
		            <el-table-column align="center" prop="postCd" width="100" label="岗位编码" ></el-table-column>
		            <el-table-column align="center" prop="postNm" width="100" label="岗位名称 " ></el-table-column>
		            <el-table-column align="center" prop="jobLvlCd" width="100" label="职位级别编码" ></el-table-column>
		            <el-table-column align="center" prop="jobLvlNm" width="100" label="职位级别名称" ></el-table-column>
		            <el-table-column align="center" prop="entryDt" width="100"  label="入职时间" ></el-table-column>
		            <el-table-column align="center" prop="regularDt" width="100" label="转正时间 " ></el-table-column>
		            <el-table-column align="center" prop="postStartDt" width="100" label="岗位开始时间" ></el-table-column>
		            <el-table-column align="center" prop="postEndDt" width="100" label="岗位到期时间" ></el-table-column>
		            <el-table-column align="center" prop="mop" width="100" label="在职司龄(月)" ></el-table-column>
		            <el-table-column align="center" prop="quitDt" width="100" label="离职日期" ></el-table-column>
		            <el-table-column align="center" prop="isWarn" width="100" label="是否预警用户(0否,1是)" ></el-table-column>
		            <el-table-column align="center" prop="srgDt" width="100" label="导入时间" ></el-table-column>
		         </el-table>
          <el-pagination v-show="shows" style="margin-top:30px;"
					  background
					  layout="total,prev, pager, next"
		           	  :current-page.sync = "currentPage"
		              @current-change="aTable"
		              :page-count="totalPages"
		            >
					</el-pagination>

      <el-dialog
        title="上传文件"
        :visible.sync="dropVisible"
        width="30%"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          :action="importFileUrl"
          ref="upload"
          :auto-upload=false
          :before-upload="beforeAvatarUpload"
           multiple
          :limit="1"
          :on-success = 'successFun'
          :on-exceed="handleExceed"
          :on-error = 'errorFun'
          :file-list="fileList">
          <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls,xlsx,xlsm文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
           <el-button @click="uploadClose">取 消</el-button>
          <el-button type="primary" @click="uploadSuccess" >上传完成</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
	import api from '../../api'
	import $$ from 'jquery'
	import dateFun from '@/common/getDate.js'
	import constValue from '@/view/paramInfo/constValue.js'
	import ajax from 'axios'
	/*import { client } from '@/common/alioss'*/
  export default {
    data() {
      return {
        search:"",
        loading: true,
        drop:'',
        fileNams:'',
        importFileUrl:api.getEmploImprot(),
        srcUrl:require('../../../static/file/HRTemplate.xls'),
        dropVisible:false,
        value1:dateFun.getDateYMD(0),
        fileList:[],
        tableData: [],
        options:constValue.valueList.personnel,
        selectValue:'',
        shows:true,
        currentPage:1,
	      pageSize: 10,
	      totalPages:1,
      }
    },
    created:function(){
	 		this.currentPage = +this.$route.query.page || 1;
  		this.fetchData();
	 	},
	 	watch:{
	 		'$route':'getPath' 
	  },
    methods:{
    	getPath(){
  			this.currentPage = +this.$route.query.page || 1
  			this.fetchData();
  		},
    	searchFun(){
    		this.fetchData();
    	},
    	indexMethod(index) {
  			return index+ 1 + ((this.currentPage-1)*this.pageSize);
    	},
    	fetchData(){
	    		var vm = this;
		    	this.$http.post(api.getEmploList(),
		    		{
		    			currentPage:vm.currentPage,
		    			pageSize:vm.pageSize,
		    			searchNm:vm.selectValue,
		    			searchField:vm.search
		    		}

		    	).then((res) => {
		    		if(res.data.code==200){
		    			this.loading = false;
		    			if(res.data.page.totalPages==0){
		    				vm.shows=false;
		    			}else{
		    				vm.shows=true;
		    				if (res.data.data == null||res.data.data == ""||res.data.data == undefined) {
	                vm.currentPage = vm.currentPage - 1;
	                this.$common.setUrL('page='+this.currentPage)
	                this.fetchData();
             		}
		    			}
		    			vm.tableData=res.data.data;
		    			vm.totalPages = res.data.page.totalPages;
		    			vm.currentPage =  res.data.page.currentPage;
		    		}else{
		    			this.loading = false;
		    			vm.$message({
					        message: res.data.msg,
					        duration:'1500',
					        type: 'warning'
				    	});
		    		}

		        }).catch(() => {
		        	this.loading = false;
	            });
	    },
      exportBtn(){
       	var vm = this;
       	if(this.$common.isempty(vm.value1,'导出日期不能为空！','warning',vm)){
       		window.open(api.getTaskExport(vm.value1,1),"_blank");
       	}
      },
	    errorFun(err, file, fileList){
	    	this.$message({
					  message:'文件导入失败！',
					  duration:'1500',
					  type: 'error'
				});
				this.fileList=[];
      	this.$refs.upload.clearFiles();
	    },
	    successFun(response, file, fileLis){
				if(response.code==500){
					this.$message({
					  message:'上传文件的格式不正确，请校对！',
					  duration:'1500',
					  type: 'warning'
					});
				}else if(response.code==200){
					this.$message({
					  message:'文件导入成功！',
					  duration:'1500',
					  type: 'success'
					});
					this.fetchData();
				}
				this.fileList=[];
      	this.$refs.upload.clearFiles();
	    },
	    submitUpload(){
	    	// this.$refs.upload.submit();
	    },
      handleClose() {
       	this.dropVisible=false;
      },
      uploadSuccess(file){
      	this.$refs.upload.submit();
      	//console.log(this.fileList)
        this.dropVisible=false;
      	/*console.log(this.fileNams.name)
      	ajax.defaults.headers.common['pid'] = 'jieyue';
      	ajax.defaults.headers.common['Content-Type'] = 'application/json';
      	ajax.defaults.headers.common['fileExt'] = this.fileNams.name;
	      ajax.post('http://172.18.100.168:9041/esbftpfile/api/disparcher/R004').then((res) => {
		    		console.log(res);
		    	}).catch((res) => {
		    		console.log(res);
	        });
      	//this.$refs.upload.submit()
        this.dropVisible=false;*/
      },
      uploadClose(){
      	this.dropVisible=false;
        this.fileList=[];
      	this.$refs.upload.clearFiles();
      },
      abss(files, fileList){
      	this.fileNams = files;
      	//console.log(files,"111")
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeAvatarUpload(file) {
	    	const fileType=['xls','xlsx','xlsm'];
	    	const name=file.name.split('.');
        const isJPG = fileType.indexOf(name[name.length-1]) !== -1;
        if (!isJPG) {
          this.$message.error('上传文件只能是 xls,xlsx,xlsm 格式!');
        }
        return isJPG;
      },
      aTable(val){
      	this.currentPage = val;
        //this.fetchData(val, this.pageSize);
        this.$common.setUrL('page='+this.currentPage)
	    	this.fetchData();
      }

    }
  }
</script>

<style>
</style>
