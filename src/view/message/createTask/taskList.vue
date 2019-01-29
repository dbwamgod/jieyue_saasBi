<template>
	<div>
		<div class="contentBg">
				<div class="contentTitle">
					<div class="titleFont">消息调度列表</div>
				</div>
         <el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
              <el-col :span="24" >
                <div style="text-align:right;">
                  <span class="resend-btn resend-btn-start" @click="newTemplate">
                    <img :src="require('@/assets/images/icon/addPage.png')" alt="" >
                    <span>新增</span>
                  </span>
                </div>
              </el-col>
          </el-row>
				 <el-table v-loading="loading" stripe :data="tableData" style="width: 100%;" border>
				 	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	:index="indexMethod">
			  		</el-table-column>
				    <el-table-column align="left" prop="taskName" label="预警指标" ></el-table-column>
				    <el-table-column align="center" prop="templateName" label="任务类型  " >
				    	<template slot-scope="scope">
	   						<span v-if="scope.row.taskType==1">自动任务</span>
	   						<span v-else>手动任务</span>
		      			</template>
				    </el-table-column>
				    <el-table-column align="center" prop="sendTime" label="下发时间" >
				    	<template slot-scope="scope">
	   						<span v-html="$options.filters.sendTimes(scope.row)"></span>
		      			</template>
				    </el-table-column>
				    <el-table-column align="center" label="统计频度 ">
				    	<template slot-scope="scope">
	   						<span>每日</span>
		      			</template>
				    </el-table-column>
				    <el-table-column align="center" label="有效周期" width="350">
				    	<template slot-scope="scope">
	   						<span>{{scope.row.startTime}}</span>
	   						<span>-</span>
	   						<span>{{scope.row.endTime}}</span>
		      			</template>
				    </el-table-column>
				    <el-table-column align="center" prop="createTime" label="创建时间 "></el-table-column>
				    <el-table-column align="center" label="操作" width="140" fixed="right">
		      			<template slot-scope="scope" >
		      				<div style="display: -webkit-box;display: flex;">
		        			<el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row)" type="text" size="small"></div></el-tooltip>
		        			<el-tooltip :enterable="false" v-if="scope.row.timeStatus==0" content='该任务已过期' placement="top"><div class="fl" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div> </div></el-tooltip>
		        			<el-tooltip :enterable="false" v-else :content="scope.row.isValid==1?'是否停用':'是否启用'" placement="top"><div class="fl" @click="stop(scope.row)" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div></div></el-tooltip>
		        			<el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click="stop(scope.row,scope.$index,2)" type="text" size="small"></div></el-tooltip>
		      				</div>
		      			</template>
		    		</el-table-column>
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
	</div>
</template>

<script>
import api from "../../../api";
import Moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 0,
      pageSize: 10,
      requests: "",
      totalPages: 1,
      pageShow: false,
      loading: true,
    };
  },
  watch: {
    /*currentPage() {
      this.fetchData();
    }*/
  	'$route':'getPath' 
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
  	this.fetchData();
  },
  filters: {
    sendTimes: function(myText) {
    	var sendTimes = ""
    	if(myText.sendTime!=""){
    		sendTimes = myText.sendTime;
    	}
    	if(myText.sendTime==""&&myText.taskType==1){
    		sendTimes = '立即发送';
    	}
    	if(myText.sendTime==""&&myText.taskType==2){
    		sendTimes = '-';
    	}
    	return sendTimes
    }
  },
  methods: {
  	getPath(){
  		this.currentPage = +this.$route.query.page || 1
  		this.fetchData();
  	},
  	indexMethod(index) {
  		return index+ 1 + ((this.currentPage-1)*this.pageSize);
    },
    editClick: function(vals) {
      this.$router.push({
        path: "/saas/message/yjMsgTemplate",
        query: {
          id: vals.id
        }
      });
    },
    newTemplate: function() {
      this.$router.push({ path: "/saas/message/yjMsgTemplate" });
    },
    fetchData() {
      var vm = this;
      this.$http
        .post(api.getTaskList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize,
          taskTypes: [1,2]
        })
        .then(res => {
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
    },
    stop(datas, index, type) {
      let isId;
      if (datas.isValid == 1) {
        isId = 0;
      } else {
        isId = 1;
      }
      let vm = this;
      if (type) {
        this.$dbwDialog("您正在执行删除操作，是否继续", "提示", {
          typeVisible: true,
          align: "center",
          okClick: () => {
            this.$http
              .post(api.setIsTaskValid(), {
                id: datas.id,
                isValid: 2
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.tableData.splice(index, 1);
                  //datas.isValid=0;
                  this.fetchData();
                } else {
                  vm.$message({
                    message: res.data.msg,
                    duration: "1500",
                    type: "warning"
                  });
                }
              })
              .catch(() => {});
          }
        });
      } else {
        this.$http
          .post(api.setIsTaskValid(), {
            id: datas.id,
            isValid: isId
          })
          .then(res => {
            if (res.data.code == 200) {
              //datas.isValid=0;
              this.fetchData();
            } else {
              vm.$message({
                message: res.data.msg,
                duration: "1500",
                type: "warning"
              });
            }
          })
          .catch(() => {
            /*	vm.$message({
								  message: res.data.msg,
								  duration:'1500',
								  type: 'warning'
							  });  */
          });
      }
    }
  }
};
</script>

<style>
</style>
