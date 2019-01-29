<template>
	<div>
		<div class="contentBg">
				<div class="contentTitle">
					<div class="titleFont clearfloat">普通消息任务</div>
					<p class="fr" style="margin-top:10px;">
			            <el-radio-group v-model="customHandListType" @change='radioChange'  size="mini">
			                <el-radio-button label="0" >已建任务</el-radio-button>
			                <el-radio-button label="1" >已执行任务</el-radio-button>
			            </el-radio-group>
			        </p>
				</div>
		         <el-row v-if="addShow" :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px; margin-right:0px;">
		              <el-col :span="24" >
		                <div style="text-align:right;">
		                  <span class="resend-btn resend-btn-start" @click="newTemplate">
		                    <img :src="require('@/assets/images/icon/addPage.png')" alt="" >
		                    <span>新增</span>
		                  </span>
		                </div>
		              </el-col>
		          </el-row>
           
				 <el-table v-loading="loading" stripe :data="tableData" style="width: 100%;" border v-show="customHandListType == 0">
				 	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	:index="indexMethod">
			  		</el-table-column>
				    <el-table-column align="left" prop="taskName" label="任务标题" ></el-table-column>
				    <el-table-column align="left" prop="templateTitle" label="消息标题 " ></el-table-column>
				    <el-table-column align="center" prop="sendTime" label="下发时间" >
				    	<template slot-scope="scope">{{scope.row | sendTypes}}</template>
				    </el-table-column>
				    <el-table-column align="center" prop="sendFrequencyType" label="下发频次 ">
				    	<template slot-scope="scope">{{scope.row.sendFrequencyType | timeType}}</template>
				    </el-table-column>
				    <el-table-column align="center" label="有效时间" width="350">
				    	<template slot-scope="scope">
	   						<span>{{scope.row.startTime}}</span>
	   						<span>-</span>
	   						<span>{{scope.row.endTime}}</span>
		      			</template>
				    </el-table-column>
				    <el-table-column align="center" label="操作" width="140" fixed="right">
		      			<template slot-scope="scope" >
                  <div v-show="customHandListType==0">
                    <el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row,true)" type="text" size="small"></div></el-tooltip>
                    <el-tooltip :enterable="false" v-if="scope.row.timeStatus==0" content='该任务已过期' placement="top"><div class="fl" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div> </div></el-tooltip>
                    <el-tooltip :enterable="false" v-else :content="scope.row.isValid==1?'是否停用':'是否启用'" placement="top"><div class="fl" @click="stop(scope.row)" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div></div></el-tooltip>
                    <el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click="stop(scope.row,scope.$index,2)" type="text" size="small"></div></el-tooltip>
                  </div>
                  <div v-show="customHandListType!=0"> 
                   <el-tooltip :enterable="false" content='核对' placement="top"><div class="icon_check" @click.stop='taskClickDetails(scope.row.id)' type="text" size="small"></div></el-tooltip>
	      				   <el-tooltip :enterable="false" content='查看' placement="top"><div class="icon_details" @click.stop="editClick(scope.row, false)" type="text" size="small"></div></el-tooltip>
                  </div>
		      			</template>
		    		</el-table-column>
				</el-table>

				 <el-table v-loading="loading" stripe :data="tableData" style="width: 100%;" border v-show="customHandListType != 0">
				 	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	:index="indexMethod">
			  		</el-table-column>
				    <el-table-column align="left" prop="taskName" label="任务标题" ></el-table-column>
				    <el-table-column align="left" prop="templateTitle" label="消息标题 " ></el-table-column>
				    <el-table-column align="center" prop="templateContent" label="推送内容" >
				    	<template slot-scope="scope">
			    		 <el-popover
			    		 	slot='—'
						    placement="top-start"
						    trigger="hover"
						    >
						    <div v-html="$options.filters.strSub(scope.row.templateContent)"></div>
						    <div slot="reference" v-html="$options.filters.removeHtml(scope.row.templateContent)"></div>
						  </el-popover>
			    	</template>
				    </el-table-column>
            <el-table-column align="left" prop="createTime" label="发送时间" ></el-table-column>
				    <el-table-column align="center" label="操作" width="140" fixed="right">
		      			<template slot-scope="scope" >
		      				<div style="display: -webkit-box;display: flex;">
				                  <div v-show="customHandListType==0">
				                    <el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row,true)" type="text" size="small"></div></el-tooltip>
				                    <el-tooltip :enterable="false" v-if="scope.row.timeStatus==0" content='该任务已过期' placement="top"><div class="fl" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div> </div></el-tooltip>
				                    <el-tooltip :enterable="false" v-else :content="scope.row.isValid==1?'是否停用':'是否启用'" placement="top"><div class="fl" @click="stop(scope.row)" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div></div></el-tooltip>
				                    <el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click="stop(scope.row,scope.$index,2)" type="text" size="small"></div></el-tooltip>
				                  </div>
				                  <div v-show="customHandListType!=0"> 
				                   <el-tooltip :enterable="false" content='核对' placement="top"><div class="icon_check" @click.stop='taskClickDetails(scope.row.id)' type="text" size="small"></div></el-tooltip>
					      				   <el-tooltip :enterable="false" content='查看' placement="top"><div class="icon_details" @click.stop="editClick(scope.row, false)" type="text" size="small"></div></el-tooltip>
				                  </div>
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
      addShow:true,
      customHandListType: sessionStorage.getItem("customHandListType") || "0"
    };
  },
  watch: {
    /*currentPage() {
      this.fetchData();
    }*/
    $route: "getPath"
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
    this.customHandListType == 0 ? this.fetchData() : this.fetchInstanceData();
  },
  filters: {
    timeType: function(myText) {
      let timeTypes = "-";
      if (myText == 1) {
        timeTypes = "只一次";
      } else if (myText == 2) {
        timeTypes = "天";
      } else if (myText == 3) {
        timeTypes = "周";
      } else if (myText == 4) {
        timeTypes = "月";
      }
      return timeTypes;
    },
    sendTypes: function(myText) {
      let sendTime = myText.sendTime;
      if (myText.sendTime == "" && myText.sendEvent == 1) {
        sendTime = "立即发送";
      }
      return sendTime;
    }
  },
  methods: {
    getPath() {
      this.currentPage = +this.$route.query.page || 1;
      this.customHandListType == 0 ? this.fetchData() : this.fetchInstanceData();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    editClick: function(vals, type) {
      this.$router.push({
        path: "/saas/message/customCtnt",
        query: {
          id: vals.id,
          isType: type
        }
      });
    },
    newTemplate: function() {
      this.$router.push({
        path: "/saas/message/customCtnt",
        query: {
          isType: true
        }
      });
    },
    fetchData() {
    	this.addShow=true;
      var vm = this;
      this.$http
        .post(api.getTaskList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize,
          taskTypes: [3]
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
              if (
                res.data.data == null ||
                res.data.data == "" ||
                res.data.data == undefined
              ) {
                vm.currentPage = vm.currentPage - 1;
                this.$common.setUrL("page=" + this.currentPage);
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
    fetchInstanceData() {
    	this.addShow=false;
      var vm = this;
      this.$http
        .post(api.getTaskHandInstanceList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize,
          taskType: '3'
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
              if (
                res.data.data == null ||
                res.data.data == "" ||
                res.data.data == undefined
              ) {
                vm.currentPage = vm.currentPage - 1;
                this.$common.setUrL("page=" + this.currentPage);
                this.fetchInstanceData();
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
      //this.fetchData(val, this.pageSize);
      this.$common.setUrL("page=" + this.currentPage);
      this.customHandListType == 0
        ? this.fetchData()
        : this.fetchInstanceData();
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
    },
    radioChange(data) {
    	this.currentPage = 1;
      sessionStorage.setItem("customHandListType", this.customHandListType);
      this.customHandListType == 0
        ? this.fetchData()
        : this.fetchInstanceData();
    },
    taskClickDetails(id) {
      this.$router.push({
        name: "taskHandCheckList",
        params: {
          id
        }
      });
    }
  }
};
</script>

<style >
 .el-popover {
  background: #fffae8 !important;
  color: #2c3e50 !important;
}
.el-popper .popper__arrow {
  display: none !important;
}
.el-popover{
	min-width:10px !important;
	max-width:300px !important;
	overflow-x: hidden;
}
</style>
