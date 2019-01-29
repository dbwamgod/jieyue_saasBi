<template>
  <div class="data_indicator_content dataUp">
    	<div class="contentBg" style="margin-bottom: 20px;">
				<div class="contentTitle">
					<div class="titleFont">数据指标列表</div>
				</div>
				
					<el-row :gutter="10" type="flex" align="middle" class='toolbar-box' style=" margin-left:0px;padding:14px 16px; margin-right:0px;">
						<div class="fl" style="margin-right:10px;line-height:32px;text-indent: 20px;font-size: 16px;color: #363B42;">指标名称</div>
        		<div class="fl" style="margin-right:10px;"><el-input size='small' class="dataIndicators" style="" @keyup.enter.native="searchContent" v-model="searchField" placeholder="请输入文字信息"></el-input></div>
        		<div class="fl" style="margin-right:10px;"><el-button style="padding: 7px;"  size='small' icon="el-icon-search" type="primary" @click="searchContent">搜索</el-button></div>
      		</el-row>
				
			</div>
      
      <el-row class="contentBg">
        <el-col :span="24">
          <el-table v-loading="loading" stripe border ref="multipleTable" :data="tableData">
          	<el-table-column
			      	type="index"
			      	label = '序号'
			      	width = '60px'
			      	align="center" 
			      	:index="indexMethod">
			  		</el-table-column>
            <el-table-column align="left" prop="indexsNm" label="指标名称" ></el-table-column>
            <el-table-column align="center" prop="indexsSort" label=" 数据分类 " ></el-table-column>
            <el-table-column align="center" prop="orgName" label=" 机构 " ></el-table-column>
            <el-table-column align="center" label="目标值" >
            	<template slot-scope="scope">
            			<div>{{$options.filters.toThousand(scope.row.targetsVal)}}</div>
            	</template>
            </el-table-column>
            <el-table-column align="center" prop="targetsUnit" label="单位" >
              	<template slot-scope="scope">
            				<span>{{scope.row.targetsUnit.replace(/(\（|\）)/g, '')}}</span>
            		</template>
            </el-table-column>
            <el-table-column align="center" label="上限值" >
	            	<template slot-scope="scope">
	            			<div>{{$options.filters.toThousand(scope.row.maxVal) }}</div>
	            	</template>
            </el-table-column>
            <el-table-column align="center" label="下限值" >
            		<template slot-scope="scope">
	            			<div>{{$options.filters.toThousand(scope.row.minVal) }}</div>
	            	</template>
            </el-table-column>
            <el-table-column align="center" prop="maxLimit" label="上超限额" ></el-table-column>
            <el-table-column align="center" prop="minLimit" label="下超限额" ></el-table-column>
            <el-table-column align="center" label="是否生效">
            		<template slot-scope="scope">
            				<span v-if="scope.row.enableStatus==0">否</span>
            				<span v-else="scope.row.enableStatus==1">是</span>
            		</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120" fixed="right" >
              <template slot-scope="scope">
              	<div style="display: -webkit-box;display: flex;">
               	<el-tooltip :enterable="false" content='编辑' placement="top"><div class="edit" @click="editClick(scope.row)" type="text" size="small"></div></el-tooltip>
                <el-tooltip :enterable="false" :content="scope.row.enableStatus==1?'是否停用':'是否启用'" placement="top"><div class="fl" @click="stopOrBegin(scope.row)" type="text" size="small"><div v-if="scope.row.enableStatus == 0" class='stopIcon'></div><div v-else="scope.row.enableStatus == 1" class="playIcon"></div></div></el-tooltip>
              	</div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination v-show="shows" style="margin-top:30px;"
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
import common from '@/common/common.js'
export default {
  data() {
    return {
      searchField: "",
      tableData: [],
      shows: true,
      currentPage: 0,
      pageSize: 10,
      totalPages: 1,
      searchRegion: "",
      confirmMessage: "",
      searchVal: "***",
      loading: true
    };
  },
  created: function() {
    this.currentPage = +this.$route.query.page || 1;
  	this.getQuotaList();
  },
  watch: {
    /*currentPage() {
      this.getQuotaList();
    }*/
   '$route':'getPath' 
  },
  filters: {
    toThousand:function(myText){
    	if(myText == ""||myText=="-"||myText == null){
    		myText = "-";
    	}else{
    		myText = common.toThousands(myText)
    	}
    	return myText;
    }
  },
  methods: {
  	getPath(){
  		this.currentPage = +this.$route.query.page || 1
  		this.getQuotaList();
  	},
  	indexMethod(index) {
  		return index+ 1 + ((this.currentPage-1)*this.pageSize);
    },
    //获取数据指标列表
    getQuotaList() {
      if (this.searchVal != this.searchField) {
        this.searchField = "";
      }
      var that = this;
      that.$http
        .post(api.getQuotaList(), {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
          searchField: that.searchField
        })
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            if (res.data.page.totalPages == 0) {
              that.shows = false;
            } else {
              that.shows = true;
              if (res.data.data == null||res.data.data == ""||res.data.data == undefined) {
                vm.currentPage = vm.currentPage - 1;
                this.$common.setUrL('page='+this.currentPage)
                this.getQuotaList();
              }
            }
            that.tableData = res.data.data;
            that.totalPages = res.data.page.totalPages;
            that.currentPage = res.data.page.currentPage;
          } else {
            this.loading = false;
            that.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        })
        .catch(() => {});
    },
    //停用or启用
    stopOrBegin(data) {
      var that = this;
      if (data.enableStatus == 0) {
        data.enableStatus = 1;
      } else {
        data.enableStatus = 0;
      }
      that.$http
        .post(api.stopOrBegin(), {
          id: data.id,
          enableStatus: data.enableStatus
        })
        .then(res => {
          if (res.data.code == 200) {
            this.getQuotaList();
          } else {
            that.$message({
              message: res.data.msg,
              duration: "1500",
              type: "warning"
            });
          }
        })
        .catch(() => {});
    },
    editClick(data) {
      this.$router.push({
        path: "/saas/param/dataIndicatorsEdit",
        query: {
          data: data
        }
      });
    },
    aTable(val) {
      this.currentPage = val;
      //this.getQuotaList(val, this.pageSize);
      this.$common.setUrL('page='+this.currentPage)
	    this.getQuotaList();
    },
    //根据指标名称检索数据
    searchContent() {
      this.searchVal = this.searchField;
      if (this.currentPage == 1) {
        this.getQuotaList();
      } else {
        this.currentPage = 1;
        this.getQuotaList();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.data_indicator_content {
  .area_filter {
    margin: 0 0 20px 0;
    h1 {
      font-size: 20px;
      display: inline-block;
    }
    .areaTags {
      display: inline-block;
      span {
        font-size: 18px;
        padding: 0 10px;
      }
    }
  }
}
.dataIndicators input {
  height: 32px !important;
  line-height: 32px !important;
}
</style>
