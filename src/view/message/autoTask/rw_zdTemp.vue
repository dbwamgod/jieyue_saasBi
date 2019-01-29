<template>
	<div>
		<div class="contentBg">
			<div class="contentTitle">
				<div class="titleFont">自动消息任务</div>
			</div>
			 <el-table v-loading="loading" stripe ref="multipleTable" :data="tableData" border style="width: 100%;">
			 	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	:index="indexMethod">
			  	</el-table-column>
			    <el-table-column align="left"  prop="taskName" label="触发动作"></el-table-column>
			    <el-table-column align="left"  prop="templateTitle" label="消息标题 "></el-table-column>
			    <el-table-column align="left" prop="templateContent" label="推送内容">
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
			    <el-table-column align="center" prop="sendTime" label="发送时间"></el-table-column>
			    <!--<el-table-column prop="effectCycleStart" width="320" label="有效周期 ">
			    	<template slot-scope="scope">
   						<span>{{scope.row.startTime}}</span>
   						<span>-</span>
   						<span>{{scope.row.endTime}}</span>
	      			</template>
			    </el-table-column>-->
			    
			    <el-table-column align="center" label="操作" width="180" >
	      			<template slot-scope="scope">
	      				<div style="display: -webkit-box;display: flex;">
	      				<el-tooltip :enterable="false" content='核对' placement="top"><div class="icon_check" @click.stop='taskClickDetails(scope.row.id)' type="text" size="small"></div></el-tooltip>
	      				<el-tooltip :enterable="false" content='查看' placement="top"><div class="icon_details" @click.stop="detailsClick(scope.row)" type="text" size="small"></div></el-tooltip>
						<!--<el-tooltip :enterable="false" v-if="scope.row.timeStatus==1" content='该任务已过期' placement="top"><div class="fl" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div></div></el-tooltip>	        			
	        			<div class="edit" @click="editClick(scope.row)" type="text" size="small"></div>-->
	        			<!--<el-tooltip :enterable="false" v-else :content="scope.row.isValid==1?'是否停用':'是否启用'" placement="top"><div class="fl" @click.stop="stop(scope.row)" type="text" size="small"><div v-if="scope.row.isValid == 1" class='playIcon'></div> <div v-else="scope.row.isValid == 0" class="stopIcon"></div></div></el-tooltip>-->
	        			<!--<el-tooltip :enterable="false" content='删除' placement="top"><div class="deleteIcon" @click.stop="deleteClick(scope.$index,scope.row)" type="text" size="small"></div></el-tooltip>-->
	      				</div>
	      			</template>
	    		</el-table-column>
			</el-table>
			</div>
			<el-pagination  v-show="shows" style="margin-top:30px;"
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
export default {
  data() {
    return {
      tableData: [],
      shows: false,
      pageSize: 10,
      currentPage: 0,
      totalPages: 1,
      loading: true
    };
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
  	this.infoData();
  },
  watch: {
    /*currentPage() {
      this.infoData();
    }*/
   '$route':'getPath' 
  },
  methods: {
  	getPath(){
  		this.currentPage = +this.$route.query.page || 1
  		this.infoData();
  	},
  	indexMethod(index) {
  		return index+ 1 + ((this.currentPage-1)*this.pageSize);
    },
    stop(datas) {
      let isId;
      if (datas.isValid == 1) {
        isId = 0;
      } else {
        isId = 1;
      }
      let vm = this;
      this.$http
        .post(api.setIsVal(), {
          id: datas.id,
          isValid: isId 
        })
        .then(res => {
          //console.log(res)
          if (res.data.code == 200) {
            //datas.isValid=0;
            this.infoData();
          } else {
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        });
    },
    taskClickDetails(id) {
      //传枚举钉类型
      // this.dialogTitle= "消息核对（未发消息）";
      // this.dialogToggle = true;
      this.$router.push({
        name: "taskHandCheckList",
        params: {
          id
        }
      });
    },
    deleteClick(datas, index) {
      //console.log(index.id);
      var vm = this;
      this.$dbwDialog("确定要删除?", "提示", {
        typeVisible: true,
        align: "center",
        okClick: () => {
          this.$http
            .post(api.setIsVal(), {
              id: index.id,
              isValid: 2
            })
            .then(res => {
              if (res.data.code == 200) {
                vm.tableData.splice(datas, 1);
                vm.infoData();
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
                message: res.data.msg,
                duration: "1500",
                type: "warning"
              });
            });
        }
      });
    } /*,
	    	creatAuto(){
	    		this.$router.push({path:"/saas/message/taskAuto/autoTemplate"})
	    	}*/,
    /*editClick(datas) {
      this.$router.push({
        path: "/saas/message/autoTemplate",
        query: {
          id: datas.id
        }
      });
    },*/
    detailsClick(datas) {
      this.$router.push({
        path: "/saas/message/autoTemplate",
        query: {
          detailsId: datas.id
        }
      });
    },
    infoData() {
      var vm = this;
      this.$http
        .post(api.getTaskHandInstanceList(), {
          taskType: 1,
          currentPage: vm.currentPage,
          pageSize: vm.pageSize
        })
        .then(res => {
          //console.log(res)
          if (res.data.code == 200) {
            this.loading = false;
            if (res.data.page == null || res.data.page.totalPages == 0) {
              vm.shows = false;
            } else {
              vm.shows = true;
              if (res.data.data == null||res.data.data == ""||res.data.data == undefined) {
                vm.currentPage = vm.currentPage - 1;
                this.$common.setUrL('page='+this.currentPage)
                this.infoData();
              }
            }
            vm.tableData = res.data.data;
            vm.totalPages = res.data.page.totalPages;
            vm.currentPage = res.data.page.currentPage;
          } else {
            this.loading = false;
            vm.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        })
        .catch(() => {
          //console.log();
        });
    },
    aTable(val) {
      this.currentPage = val;
      //this.infoData(val, this.pageSize);
      this.$common.setUrL('page='+this.currentPage)
	  this.infoData();
    }
  }
};
</script>

<style scoped>
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