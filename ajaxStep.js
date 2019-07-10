var storage = window.localStorage;
var token = storage.getItem("token");
$.ajaxSetup({
	 beforeSend: function (xhr) { //可以设置自定义标头
			console.log("ajax beforesend token:", token)
			xhr.setRequestHeader('Authorization', token);
		}
});




//把公共的设置项都放在这里，就不需要每个页面都设置一遍了，放在jQuery对象上是为了避免污染全局变量
window.dataTablesSettings = {
	language: { //提示信息
	        "lengthMenu" : '每页显示<select class="form-control input-xsmall"><option value="10">10</option></select>条',
	        "paginate" : { "first" : "首页", "last" : "尾页", "previous" : "上一页", "next" : "下一页" },
	        "processing" : "加载中...",  //DataTables载入数据时，是否显示‘进度’提示  
	        "emptyTable" : "暂无数据",
	        "info" : "共 _PAGES_ 页  _TOTAL_ 条数据  ",
	        "infoEmpty" : "暂无数据",
	        "emptyTable" : "暂无要处理的数据...",  //表格中无数据
	        "search": "搜索:",
	        "infoFiltered" : " —— 从  _MAX_ 条数据中筛选",
	        "zeroRecords":    "没有找到记录"   
    },
    ordering:  false,//排序显示控制
    pageLength : 5,//默认每页显示多少条记录
    serverSide : true,//是否从服务器获取数据
    lengthChange : false,//是否显示“每页显示10条”的下拉框
    searching: false,//是否显示搜索框
    paginate : true, //翻页功能
    createdRow: function ( row, data, index ) {
                    $("tr", row).css("text-align","center");
                    $("td", row).addClass("am-text-middle");
                    /*if ( index %2 == 0 ) {
                        $('td', row).css('font-weight',"bold").css("color","#c43ff6");
                    }*/
            },
    drawCallback :function () {
            let api = this.api();
            let startIndex = api.context[0]._iDisplayStart;//获取本页开始的条数
            api.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = startIndex + i + 1;
            });
    },
    //这里是为ajax添加自定义参数，给它添加的属性，它会传给后台
    serverParams : function (aoData) {
    	console.log(aoData);
        aoData._rand = Math.random();
    }
};












