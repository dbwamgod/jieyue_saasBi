<template>
	<div>
		<div class="contentBg">
				<div class="contentTitle">
					<div class="titleFont">普通消息任务</div>
				</div>
        <div class="toolbar-box">
          <div class="addBtn fr" @click="newTemplate()"><i></i> 新增</div> 
        </div>
				 <el-table :data="tableData" stripe border style="width: 100%;">
				 	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	:index="indexMethod">
			  		</el-table-column>
				    <el-table-column prop="taskName" label="任务标题" ></el-table-column>
				    <el-table-column prop="templateName" label="消息标题 " ></el-table-column>
				    <el-table-column prop="sendTime" label="下发时间" ></el-table-column>
				    <el-table-column prop="frequencyName" label="下发频次 "></el-table-column>
				    <el-table-column label="有效周期" width="320"> 
				    	<template slot-scope="scope">
	   						<span>{{scope.row.startTime}}</span>
	   						<span>--</span>
	   						<span>{{scope.row.endTime}}</span>
		      			</template>
				    </el-table-column>
				    <el-table-column label="操作" width="">
		      			<template slot-scope="scope">
		        			<div class="edit" title="编辑" @click="editClick(scope.row)" type="text" size="small"></div>
		        			<div class="fl" title="是否启用" @click="stop(scope.row)" type="text" size="small"><div v-if="scope.row.isValid == 1" class='stopIcon'></div> <div v-else="scope.row.isValid == 0" class="playIcon"></div> </div>
		        			<div class="deleteIcon" title="删除" @click="stop(scope.row,scope.$index,2)" type="text" size="small"></div>
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
      pageShow: false
    };
  },
  watch: {
    currentPage() {
      this.fetchData();
    }
  },
  created: function() {
    this.currentPage = 1;
  },
  methods: {
  	indexMethod(index) {
  		return index+ 1 + ((this.currentPage-1)*this.pageSize);
    },
    editClick: function(vals) {
      this.$router.push({
        path: "/saas/message/customCtnt",
        query: {
          id: vals.taskId
        }
      });
    },
    newTemplate: function() {
      this.$router.push({ path: "/saas/message/customCtnt" });
    },
    fetchData() {
      var vm = this;
      this.$http
        .post(api.getTaskHandInstanceList(), {
          currentPage: vm.currentPage,
          pageSize: vm.pageSize,
          taskType: 3
        })
        .then(res => {
          if (res.data.code == 200) {
            vm.tableData = res.data.data;
            vm.totalPages = res.data.page.totalPages;
            vm.currentPage = res.data.page.currentPage;
            console.log('vm.tableData',vm.tableData)
            if (res.data.page.totalPages == 0) {
              vm.pageShow = false;
            } else {
              vm.pageShow = true;
              if (res.data.data == "") {
                vm.currentPage = vm.currentPage - 1;
              }
            }
          } else {
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
              .post(api.setIsVal(), {
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
          .post(api.setIsVal(), {
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
