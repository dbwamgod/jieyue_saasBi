<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created:function(){
    Array.prototype.remove = function(val) {

      for( let i=0;i<this.length;i++) {
        if (this[i]['id'] === val['id'] || this[i] === val) {
          this.splice(i, 1);
        }

      }
    };
    Array.prototype.removeRepet = function() {
      let arr=this;
      let unique={};
      arr.forEach((item)=>{
       unique[JSON.stringify(item)]=item
     });
      arr = Object.keys(unique).map(data => {
       return JSON.parse(data)
     })
      return arr;
    }
  }
}
</script>

<style>
/*公共样式*/
    *{
        margin:0;
        padding: 0;
    }
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } h1, h2, h3, h4, h5, h6{ font-size:100%; } address, cite, dfn, em, var { font-style:normal; } code, kbd, pre, samp { font-family:couriernew, courier, monospace; } small{ font-size:12px; } ul, ol { list-style:none; } a { text-decoration:none; } a:hover { text-decoration:underline; } sup { vertical-align:text-top; } sub{ vertical-align:text-bottom; } legend { color:#000; } fieldset, img { border:0; } button, input, select, textarea { font-size:100%; } table { border-collapse:collapse; border-spacing:0; }
    html,body,#app{
        width: 100%;
        height: 100%;
        font-size: 14px;
        font-family: "微软雅黑";
        overflow: auto;
        background: #F5F6FA;
        max-width: 1920px;
        min-width: 1280px;
    }
    .fl{
    	float:left;
    }
    .fr{
    	float:right;
    }
    .abs{
    	position:absolute;
    }
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
   .clearfloat{zoom:1}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin:0 auto;
        position: relative;
        /*margin-top: 60px;*/
    }
    .el-table td div{
    	white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis
    }
    .el-dialog__header{
        background-color: #F6F6F6!important;
        padding: 0 20px  !important;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        line-height:40px;
        
    }
    .el-dialog__title{
        font-size: 14px;
        font-weight: bold;
        color:#333744;
    }
    .peopleDialog  .el-dialog__header{
    
    }
    .peopleDialog .el-dialog__body{
        padding-top:0px;
        padding-bottom:0px;
    }
    .personneListTitle{
        font-size: 14px;
        color: #2D323A;
        margin-top:15px;
        margin-bottom:8px;
        font-weight: bold;
        line-height: normal;
    }
    .el-submenu .is-active{
        background-color: #1D62AC!important;
    }
    .el-submenu .is-active::before{
        content:'';
        background-color:#8BD0FF;
        width:4px;
        height:50px;
        position:absolute;
        left:0;
    }
    .el-submenu .is-active > .activeAfter{
        width: 0;
        height:0;
        border:4px solid transparent;
        border-left: 4px solid #8BD0FF;
        position:absolute;
        left:4px;
        top:calc(50% - 4px);
    }
    /* .el-input__inner{
        border: 1px solid #3A96F2;
        border-radius: 4px;
    } */
    .el-table thead{
    		font-size: 14px;
    		font-weight: bold!important;
        color: #2D323A!important;
    }
    .el-table__header th, .el-table__header tr {
			background-color: #EDEDED !important;
		}
    .el-table{
        color: #2D323A!important;
        font-size:14px;
    }
    .el-tag + .el-tag {
        margin-left: 10px!important;
    }
    .el-slider__bar{
        background-color: #67c23a!important;
    }
    .el-slider__button{
        border: 2px solid #67c23a!important;
    }
    .reportLists .el-table td,.reportLists .el-table th.is-leaf{
        border: none!important;
    }
    .el-table .IsActive{
        color:#ff0000 !important;
    }
    .el-icon-arrow-left:before {
        content: "\E600";
        font-weight: bolder;
    }
    .el-table__row{
        transition: all 0.5s cubic-bezier(0.08, 0.65, 1, 1);
    }
    /*.el-table__row:hover{
        position: relative;
        top:-5px;
        height:67px;
        /* transform:scale(1,1.05); 
        -moz-transform:scale(1,1.05); 
        -webkit-transform:scale(1,1.05); 
        -o-transform:scale(1,1.05);  
       
    }*/
    i[class*='el-submenu__icon-arrow el-icon-arrow-down']{
        display: none;
    }
    .typeValue .el-input{
        width: 85% !important;
    }
    .tree{
        background: #fff;
        padding:20px 0 !important;
    }
    .el-tree-node__label{
        font-size: 16px!important;
    }
    .el-tree-node__content{
        height: 40px!important;
        line-height: 40px!important;
    }
    .el-autocomplete{
        float: left !important;
        width: 100% !important;
    }
    .el-menu-item-group__title{
    	padding:0 !important;
    }
    .el-submenu .el-menu-item{
    	height: 50px;
        font-size: 14px;
    	line-height: 50px;
    }
    .el-menu-item, .el-submenu__title{
    	height: 50px;
    	line-height: 50px;
    }
    .el-submenu__title{
    	font-weight: bold;
        font-size: 16px;
    }
    .el-loading-mask{
    	background-color:#fff !important;
    }
    td {
     	border-left: 0px !important;
     	border-top: 0px !important;
    }
    .el-table .cell{
    	padding-left:10px !important;
    	padding-right:10px !important;
    	white-space: nowrap !important;
    	overflow: hidden;
    	text-overflow: ellipsis
    }
    tr:first-of-type td:first-of-type{
    	visibility: visible !important;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td {
    	background-color: #ecf5ff;
    }
    .el-table > .el-table__header-wrapper > .el-table__header > thead tr td:last-of-type{
        text-align: center;
    }
    .el-table > .el-table__body-wrapper > .el-table__body > tbody tr th:last-of-type{
        text-align: center;
    }
    /* .el-table > .el-table__body-wrapper > .el-table__body > tbody tr th div{
        width:100%;
        height:30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    } */
    .el-table > .el-table__fixed-right > .el-table__fixed-header-wrapper > .el-table__header thead tr th:last-of-type{
        text-align: center;
    }
    .el-table > .el-table__fixed-right > .el-table__fixed-body-wrapper > .el-table__body tbody tr td:last-of-type{
        text-align: center;
    }
    .el-switch__input:focus~.el-switch__core{
        outline: none!important;
    }
    .el-table--border{
        box-shadow: 0 2px 4px 0 rgba(226,226,226,0.50);
    }
    
    .el-container{
    	height:100% !important;
    }
    .redBar{
    	margin-bottom: 10px;
    }
    .redBar .yjItem{
			width: 144px;
    	float: left;
    	text-align: right;
    	padding: 0 12px 0 0;
		}
		.redBar .yjItem span{
			color:red;
		}
		.redBar .el-form-item__content{
			margin-left: 0px !important;
		}
		.el-menu{
			border:0px;
		}
		.menNumBox{
			width:80%;
			margin-left:155px;
		}
		.menNum{
			width:100%;
			border:1px dashed #c0c4cc;
			height:100px;
			overflow-y: auto;
			border-radius: 6px;
			background: #F7FCFF;
			font-size: 14px;
			color: #2D323A;
		}
        .el-dialog__headerbtn {
            transform: translate(-12px, -12px);
            
        }
		.el-dialog__headerbtn .el-dialog__close{
			background: #A3A2A2;
			height:24px;
			width:24px;
			border-radius: 50%;
			font-weight: bold;
			font-size:14px;
			line-height: 24px;
			color:#fff !important;
		}
		.el-dialog{
			border-radius: 6px;
		}
		.contentBg{
			width:100%;
			height:auto;
		}
		.contentTitle{
			/* background: #fff; */
			height:50px;
			font-size: 18px;
			color: #333744;
			/* box-shadow:0 2px 12px 0 rgba(0,0,0,.1); */
		}
		.contentTitle .titleFont{
			float:left;
			font-weight: bold;
			border-left:3px solid #75AFFF;
			line-height: 20px;
			height:20px;
			margin-top: 15px;
			text-indent: 10px;
		}
		.contentTitle .addBtn{
			margin-right: 20px;
			font-size: 16px;
			color: #5594EB;
			cursor: pointer;
			line-height: 50px;
		}
		.contentTitle .addBtn i{
			background: url(assets/images/icon/addPage.png) no-repeat center;
			float:left;
			width: 35px;
			height:50px;
		}
		.el-pagination{
			float:right;
			padding-right: 0px!important;
		}
		.icon_check{
			width:35px;
			height:32px;
			background: url('assets/images/icon/icon_check.png') no-repeat center;
			background-size: 17px 17px;
			float:left;
			-webkit-box-flex: 1;flex:1;
			cursor: pointer;
		}
		.icon_details{
			width:35px;
			height:32px;
			background: url('assets/images/icon/icon_details.png') no-repeat center;
			background-size: 17px 17px;
			float:left;
			-webkit-box-flex: 1;flex:1;
			cursor: pointer;
		}
		.edit{
			width:35px;
			height:32px;
			background: url('assets/images/icon/icon_edit.png') no-repeat center;
			background-size: 17px 17px;
			float:left;
			-webkit-box-flex: 1;flex:1;
			cursor: pointer;
		}
		.edit_disable{
			width:35px;
			height:32px;
			background: url('assets/images/icon/icon_edit_disable.png') no-repeat center;
			background-size: 17px 17px;
			float:left;
			-webkit-box-flex: 1;flex:1;
			cursor: pointer;
		}
		.ql-toolbar.ql-snow,.ql-container.ql-snow{
			border: 1px solid #dcdfe6;
		}
		.deleteIcon{
			width:35px;
			height:32px;
			background: url('assets/images/icon/icon_delete.png') no-repeat center;
			background-size: 17px 17px;
			float:left;
			-webkit-box-flex: 1;flex:1;
			cursor: pointer;
		}
		.deleteIcon_disable{
			width:35px;
			height:32px;
			-webkit-box-flex: 1;flex:1;
			background: url('assets/images/icon/icon_delete_disable.png') no-repeat center;
			background-size: 17px 17px;
			float:left;
			cursor: pointer;
		}
		.stopIcon{
			width:35px;
			height:32px;
			-webkit-box-flex: 1;flex:1;
			background: url('assets/images/icon/icon_stop.png') no-repeat center;
			background-size: 23px 14px;
			cursor: pointer;
		}
		.playIcon{
			width:35px;
			height:32px;
			-webkit-box-flex: 1;flex:1;
			background: url('assets/images/icon/icon_play.png') no-repeat center;
			background-size: 23px 14px;
			cursor: pointer;
		}
		.el-popover {
    	background: #fffae8 !important;
    	color: #2c3e50 !important;
		}
		.el-table th>.cell{
			text-align: center!important;
		}
		.backIcon{
			width:95px;
			height:50px;
			background: url('assets/images/icon/icon_back.png') no-repeat center;
			background-size: 18px 18px;
			cursor: pointer;
			margin-right: 0;
			font-size: 16px;
			line-height: 50px;
			color: #5594EB;
			text-align: right;
		}
		.contentBoxBg{
			background: #fff;
			padding-top: 30px;
			box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
			padding-bottom: 20px;
		}
		.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
			background-color: #fff !important;
		}
		.btn-next{
			margin-right: 0px !important;
		}
		.el-pagination.is-background .el-pager li:not(.disabled).active{
			background-color: #409EFF!important;
		}
		.el-checkbox+.el-checkbox {
            margin-left: 0px !important;
		}
			.ql-editor{
		min-height: 160px !important;
		max-height: 360px !important;
	}
	.ql-snow .ql-picker{
		height:40px!important;
	}
	.ql-snow .ql-picker.ql-size{
		width:70px;
	}
	.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:" !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32' !important;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6' !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体' !important;
}




.barBox{
	width:100%;margin:0 auto;margin-top: 10px;
	text-align: left;
}
.barBox .barBoxTitle{
	margin-bottom:15px;font-size: 14px;font-weight:bold;color: #333744;line-height: 25px;
}
.barBox .barBoxContent{
	width:100%;
}
.barBox .barBoxitem{
	border:1px solid #C9C9C9;
	width:48%;
	float: left;
}
.barBox .barBoxContentTitle{
	text-indent:12px;background: #F6F6F6;height: 32px;font-size: 14px;color: #333744;line-height: 32px;
}
.barBox .barBoxContentTitle .leftbox{
	width:100%;
}

.barBox .barBoxContentScroll{
	height:180px;overflow: hidden;color: #888888;font-size:12px;
}
.barBox .barScrooLeft{
	height:100%;width:100%;overflow-y: auto;
}
.barItems{
	margin-top:15px;position: relative;margin-left:30px;
}
.barItems .barItemsBall{
	width: 15px;height:15px;border-radius: 50%;position: absolute;background: #a0a0a0;line-height: 15px;text-align: center;color:#fff;left:-20px;
}
.toolbar-box{
    margin-bottom: 10px;
    padding: 15px 16px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(226, 226, 226, 0.5) 0px 2px 4px 0px;
    border-radius: 4px;
}
  .resend-btn{
    padding:4px 17px;
    border-radius: 4px;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    margin-right:5px;
  }
  .resend-btn > img{
    vertical-align: middle;
    margin-right:8px;
  }
  .resend-btn > span{
    vertical-align: middle;
  }
  .resend-btn-start{
    border: 1px solid #9FC7FF;
    color:  #5594EB;
  }
  .resend-btn-end{
    border: 1px solid #D8D8D8;
    color: #A3A2A2;
  }
  .btnBox{
  	position: relative;left:50%;transform:translateX(-50%);margin-top:20px;width:215px;
  }
  .btnLeft{
  	width: 100px;
		height: 30px!important;
		line-height: 30px!important;
		padding: 0px!important;
		border: 0px!important;
  }
  .btnRight{
  	width: 100px;
		height: 30px!important;
		line-height: 30px!important;
		padding: 0px!important;
		border: 0px!important;
  }
  .dataUp .el-input--small .el-input__inner{
		height:30px !important;
		line-height: 30 !important;
	}
</style>
