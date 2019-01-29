<template>
  <div class="dataUp">
  		<el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
              <el-col :span="24" >
  							<el-select style="width:10%;" size='small' v-model="selectValue" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						  	</el-select>
							  <el-input size='small' style="width:20%;margin:0 10px;" v-model="search" placeholder="请输入"></el-input>
				        <el-button size='small' type="primary" style="padding: 8px;" icon="el-icon-search" @click="searchFun">搜索</el-button>
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
  							<a :href="srcUrl" style="margin-right:10px;" class='fr' download="理财产品导入模板.xls">
  								<span class="resend-btn resend-btn-start"  style="padding: 3.5px 17px;">
                    <img :src="require('@/assets/images/icon/downLoader.png')" alt="" >
                    <span>下载模板</span>
                  </span>
  							</a>
              </el-col>
      </el-row>
  		
      <el-row >
        <el-col :span="24">
          <el-table ref="multipleTable" v-loading="loading" border :data="tableData" stripe >
          	<el-table-column
				      	type="index"
				      	label = '序号'
			      		width = '60px'
			      		align="center" 
				      	:index="indexMethod">
				  	</el-table-column>
            <el-table-column align="center" prop="orgId" label="编码" ></el-table-column>
            <el-table-column align="center" prop="prdCd" label="产品展示编码" ></el-table-column>
            <el-table-column align="center" prop="prdNm" label="产品名称	" ></el-table-column>
            <el-table-column align="center" prop="prdShowNm" label="产品显示名称" ></el-table-column>
            <el-table-column align="center" prop="isValid" label="是否有效（0无效、1有效） " ></el-table-column>
            <el-table-column align="center" prop="startDt" label="生效日期" ></el-table-column>
            <el-table-column align="center" prop="endDt" label="失效日期" ></el-table-column>
            <el-table-column align="center" prop="srgDt" label="导入时间" ></el-table-column>
            <el-table-column align="center" prop="orderBy" label="排序" ></el-table-column>
          </el-table>
          
          <el-pagination v-show="shows" style="margin-top:30px;"
					  background
					  layout="total,prev, pager, next"
		           	  :current-page.sync = "currentPage"
		              @current-change="aTable"
		              :page-count="totalPages"
		            >
					</el-pagination>
        </el-col>
      </el-row>
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
	import dateFun from '@/common/getDate.js'
	import constValue from '@/view/paramInfo/constValue.js'
  export default {
    data() {
      return {
        search:'',
        drop:'',
        importFileUrl:api.getFinancialImprot(),
        srcUrl:require('../../../static/file/CFTProductData.xls'),
        dropVisible:false,
        value1:dateFun.getDateYMD(0),
        fileList:[],
        tableData: [],
        options: constValue.valueList.product,
        selectValue:'',
        shows:true,
        currentPage:1,
	      pageSize: 10,
	      totalPages:1,
	     	loading:true
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
    	indexMethod(index) {
  			return index+ 1 + ((this.currentPage-1)*this.pageSize);
    	},
    	searchFun(){
    		this.fetchData();
    	},
    	fetchData(){
	    		var vm = this;
		    	this.$http.post(api.getFinancList(),
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
					        type: 'error'
				    	});
		    		}
		           
		        }).catch(() => {
	            });
	    },
	    exportBtn(){
       	var vm = this;
       	if(this.$common.isempty(vm.value1,'导出日期不能为空！','warning',vm)){
       			window.open(api.getTaskExport(vm.value1,4),"_blank");
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
	    	 //this.$refs.upload.submit();
	    },
      handleClose() {
       	this.dropVisible=false;
      },
      uploadSuccess(){
      	this.$refs.upload.submit()
        this.dropVisible=false;
      },
      uploadClose(){
      	this.dropVisible=false;
        this.fileList=[];
      	this.$refs.upload.clearFiles();
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
	.dataUp .el-input--small .el-input__inner{
	height:30px !important;
	line-height: 30 !important;
}
</style>