/**
 * 자료신청
 */

/*
 * FORM 생성
 */
function create_form(nm,mt,ac,tg) {
	$('form#'+nm).remove();
    var fm = document.createElement("form");
    fm.name = nm;
    fm.id = nm;
    fm.method = mt;
    fm.action = ac;
    fm.target = tg;
      
    return fm;
}

/*
 * INPUT 생성
 */
function add_input(fm,nm,vu){
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = nm;
    input.value =  vu;
    fm.insertBefore(input,null);
    
    return fm;
}

/*
 * 수정자 swkim
 * 수정일 2015-03-03
 * 
 * 수정내용
 * =각 통계 팝업 윈도우 팝엉에서 레이어 팝업으로 변경
 * 
 * 조회페이지 다운로드 버튼 클릭
 * 체크 후 용도 선택 팝업 출력
 */
function btnRltmDownload(){
	
	//파일사이즈(MB) 합계
	var fileSize = 0;
	//각 파일사이즈
	var fileSizeMg = "";
	//파일셋 시퀀스
	var filesetSn = "";
	//파일 경로
	var fileCoursNm = "";
	//상세 파일셋 순번
	var filesetDtlSn = "";

	var cnt = 0;
	var tempSize = 0;
	var tempSizeVal = '';
	var temp = '';
	var strArr = '';

//	alert('filesetSns : '+filesetSn.substring(1));
//	alert('filesetDtlSns : '+filesetDtlSn.substring(1));
//	alert('sviceSe : '+$("#sviceSe").val());

	var ftpYn = 'N';
	var stdrMg = $('#stdrMg').val();
	var dwldSetupPd = $('#dwldSetupPd').val();
	var fileType = $('#fileType').val();
	if(availableBrwoser()){
        //showLoading();
    	$.ajax({
    	     type: 'post',
    	     url: "/data/cmmn/selectPrposRltmReqstPopup.do",
    	     data: $('form[name=downForm]').serialize(),
    	     dataType : "html",
    	     success: function(data) {
    	    	 LayerUtil.show(data);
    	      	 var frm = document.requestForm;
	    	      	frm = add_input(frm, 'ftpYn', ftpYn);
	    			frm = add_input(frm, 'sviceSe', $("#serviceSe").val());
	    			frm = add_input(frm, 'startDt', $("#startDt").val());
	    			frm = add_input(frm, 'lrgClssCd', $("#lrgClssCd").val());
	    			frm = add_input(frm, 'mddlClssCd', $("#mddlClssCd").val());
	    			frm = add_input(frm, 'endDt', $("#endDt").val());
	    			frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
	    			frm = add_input(frm, 'fileSizeMgs', 0);
	    		    frm = add_input(frm, 'fileCoursNms', fileCoursNm.substring(1));
	    		    frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);
	    		    frm = add_input(frm, 'filesetSns', $('#stnIds').val());
	    		    frm = add_input(frm, 'filesetDtlSns', $('#elementCds').val());
	    		    frm = add_input(frm, 'fileType', fileType);
    	      	  pop = null;
    	      	  
    	      	if(!isEmpty(reqstPurposeCdSave)){
    	      		$(".layer").css("display","none");
    	    		$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
    	    		fnRltmRequest();
    	    	}
    	    	  //hideLoading();
    	     }  ,
    	     error: function(){

    	     }
    	   });

	}else{
	    //showLoading();
    	$.ajax({
    	     type: 'post',
    	     url: "/data/cmmn/selectPrposRltmReqstPopup.do",
    	     data: $('form[name=downForm]').serialize(),
    	     dataType : "html",
    	     success: function(data) {
    	      	  	LayerUtil.show(data);
	    	      	var frm = document.requestForm;
	    	      	frm = add_input(frm, 'ftpYn', ftpYn);
	    			frm = add_input(frm, 'sviceSe', $("#serviceSe").val());
	    			frm = add_input(frm, 'startDt', $("#startDt").val());
	    			frm = add_input(frm, 'lrgClssCd', $("#lrgClssCd").val());
	    			frm = add_input(frm, 'mddlClssCd', $("#mddlClssCd").val());
	    			frm = add_input(frm, 'endDt', $("#endDt").val());
	    			frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
	    			frm = add_input(frm, 'fileSizeMgs', 0);
	    		    frm = add_input(frm, 'fileCoursNms', fileCoursNm.substring(1));
	    		    frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);
	    		    frm = add_input(frm, 'filesetSns', $('#stnIds').val());
	    		    frm = add_input(frm, 'filesetDtlSns', $('#elementCds').val());
	    		    frm = add_input(frm, 'fileType', fileType);
	    		    if(!isEmpty(reqstPurposeCdSave)){
	    		    	$(".layer").css("display","none");
	    				$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
	    				fnRltmRequest();
	    			}
    	    	  //hideLoading();
    	     }  ,
    	     error: function(){
    	     }
    	   });

	   /* df.target = 'prposDtaReqstFormPopup';
	    df.action = '/data/common/selectPrposPopup.do';
	    df.method = 'post';

	    df.submit();*/
	}
	

}
function btnDownload(){

	//파일사이즈(MB) 합계
	var fileSize = 0;
	//각 파일사이즈
	var fileSizeMg = "";
	//파일셋 시퀀스
	var filesetSn = "";
	//파일 경로
	var fileCoursNm = "";
	//상세 파일셋 순번
	var filesetDtlSn = "";
	
	var cnt = 0;
	var tempSize = 0;
	var tempSizeVal = '';
	var temp = '';
	var strArr = '';
	
	// 선택
	$(":checkbox[name='fileSizeMgList']:checked").each(function() {
		temp = $(this).val();
//		tempSize = eval($(this).val());
		
		strArr = temp.split('^');
		//파일사이즈
		tempSize = strArr[0];
		//파일순번
		filesetSn += ','+strArr[1];
		//파일경로
		fileCoursNm += ','+strArr[2];
		//상세순번
		filesetDtlSn += ','+strArr[3];
		
		tempSize = eval(tempSize);
		
		if(tempSize==undefined || tempSize=='undefined')
			tempSize = 0;
		
		fileSize += tempSize;
		
		tempSizeVal = $(this).val();
		if(tempSizeVal==null || tempSizeVal=='')
			tempSizeVal = '0';
		
		fileSizeMg += ","+ tempSizeVal;
		cnt++;
	});
	
//	alert('filesetSns : '+filesetSn.substring(1));
//	alert('filesetDtlSns : '+filesetDtlSn.substring(1));
//	alert('sviceSe : '+$("#sviceSe").val());
	
	var ftpYn = 'N';
	var stdrMg = $('#stdrMg').val();
	var dwldSetupPd = $('#dwldSetupPd').val();
	
	//alert(stdrMg + "   대용량 자료 신청 디버깅중...." + dwldSetupPd);
	//if(true){
	
	if((fileSize/1000) >= stdrMg && dwldSetupPd > 0){
		if(confirm("해당파일은 용량이 커서 직접 다운로드가 불가능합니다.\n등록된 e-mail(ID)로 파일로드가 가능한 FTP 계정을 발송합니다."))
			ftpYn = 'Y';
		else
			return;
		
	} else if(fileSize <= 0) {
		alert("자료의 용량이 0 이거나, 선택하신 자료가 없습니다. 자료를 선택하세요.");
		return;
	}
	
	if(availableBrwoser()){
		//window.open('', 'prposDtaReqstFormPopup', 'width=500,height=460, toolbar=no,menubar=no,location=no,scrollbars=yes,status=no');
		
		var frm = create_form('downForm', 'post', '/data/common/selectPrposPopup.do', 'prposDtaReqstFormPopup');
		frm = add_input(frm, 'ftpYn', ftpYn);
		frm = add_input(frm, 'sviceSe', $("#serviceSe").val());
		frm = add_input(frm, 'startDt', $("#startDt").val());
		frm = add_input(frm, 'endDt', $("#endDt").val());
		frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
		frm = add_input(frm, 'fileSizeMgs', fileSizeMg.substring(1));
	    frm = add_input(frm, 'fileCoursNms', fileCoursNm.substring(1));
	    frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);
	    frm = add_input(frm, 'stdrMg', stdrMg);
	    frm = add_input(frm, 'filesetSns', filesetSn.substring(1)); 
	    frm = add_input(frm, 'filesetDtlSns', filesetDtlSn.substring(1));
	    $('body').append(frm);
        //showLoading();
    	$.ajax({
    	     type: 'post',
    	     url: "/data/common/selectPrposPopup.do",
    	     data: $('form[name=downForm]').serialize(),
    	     dataType : "html",  
    	     success: function(data) {
    	    	 LayerUtil.show(data);
    	      	/*var frm = document.requestForm;
    	      	frm = add_input(frm, 'ftpYn', ftpYn);
    			frm = add_input(frm, 'sviceSe', $("#sviceSe").val());
    			frm = add_input(frm, 'startDt', $("#startDt").val());
    			frm = add_input(frm, 'endDt', $("#endDt").val());
    			frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
    			frm = add_input(frm, 'fileSizeMgs', fileSizeMg.substring(1));
    		    frm = add_input(frm, 'filesetSns', filesetSn.substring(1)); 
    		    frm = add_input(frm, 'fileCoursNms', fileCoursNm.substring(1));
    		    frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);    
    		    frm = add_input(frm, 'filesetDtlSns', filesetDtlSn.substring(1)); */
    	    	  //hideLoading();
    	    	 if(!isEmpty(reqstPurposeCdSave)){
    	    		 $(".layer").css("display","none");
     	    		$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
     	    		fnRequest();
     	    	}
    	     }  ,
    	     error: function(){
    	    	 LayerUtil.hide();
    	     }
    	   }); 
/*	    frm.method = 'post';
	    frm.target = 'prposDtaReqstFormPopup';
	    frm.action = '/data/common/selectPrposPopup.do';
	    
	    frm.submit();*/
	    
	}else{
		//window.open('', 'prposDtaReqstFormPopup', 'width=500,height=460, toolbar=no,menubar=no,location=no,scrollbars=yes,status=no');
	   var df = document.ieDownForm;
	    df.ftpYn.value = ftpYn;
	    df.sviceSe.value = $("#serviceSe").val();
	    df.startDt.value = $("#startDt").val();
	    df.endDt.value = $("#endDt").val();
	    df.dataFormCd.value = $("#dataFormCd").val();
	    df.fileSizeMgs.value = fileSizeMg.substring(1);
	    df.filesetSns.value = filesetSn.substring(1);
	    
	    df.filesetDtlSns.value = filesetDtlSn.substring(1);
	    
	    df.fileCoursNms.value = fileCoursNm.substring(1);
	    df.dwldSetupPd.value = dwldSetupPd;
	    df.stdrMg.value = stdrMg;
	    
	    //showLoading();
    	$.ajax({
    	     type: 'post', 
    	     url: "/data/common/selectPrposPopup.do",
    	     data: $('form[name=ieDownForm]').serialize(),
    	     dataType : "html",  
    	     success: function(data) {
    	    	 LayerUtil.show(data);
    	    	 if(!isEmpty(reqstPurposeCdSave)){
    	    		 $(".layer").css("display","none");
     	    		$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
     	    		fnRltmRequest();
     	    	}
    	     }  ,
    	     error: function(){
    	    	 LayerUtil.hide();
    	     }
    	   }); 
	    
	   /* df.target = 'prposDtaReqstFormPopup';
	    df.action = '/data/common/selectPrposPopup.do';
	    df.method = 'post';
	    
	    df.submit();*/
	}
	
}
/*
 * =============================================================================
 */
/*
 * is ie?
 */
function availableBrwoser(){
	var browser = navigator.userAgent.toLowerCase();
	
	if ( -1 != browser.indexOf('chrome') )
		return true;
	if ( -1 != browser.indexOf('msie') )
		return false;
	if ( -1 != browser.indexOf('opera') )
		return true;
	return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
	if(!isEmpty(sessionStorage.getItem("reqstPurposeCd"))){
		if(isLogin){
			reqstPurposeCdSave = sessionStorage.getItem("reqstPurposeCd");
		}else{
			sessionStorage.clear();
		}
	}
});
/*
 * 수정자 swkim
 * 수정일 2015-03-04
 * 
 * 자료신청 - 용도신청 팝업 - 신청처리
 */
function fnRequest(){ 	
	if(!isEmpty($(":radio[name='reqstPurposeCd']:checked").val())){
		$("#sltUsePop").css("display","none");
		var reqstPurposeCd = $(":radio[name='reqstPurposeCd']:checked").val();
		reqstPurposeCdSave = reqstPurposeCd;
//		alert('reqstPurposeCd : '+reqstPurposeCd);
		processDtsReqst(reqstPurposeCd);
//		self.close();
		
	} else {
		alert("용도 신청을 선택해 주세요.");
		return;
	}
}
	
function fnRltmRequest(){
	
	if(!isEmpty($(":radio[name='reqstPurposeCd']:checked").val())){
		var reqstPurposeCd = $(":radio[name='reqstPurposeCd']:checked").val();
		reqstPurposeCdSave = reqstPurposeCd;
		
		 sessionStorage.setItem("reqstPurposeCd", reqstPurposeCdSave);
		 sessionStorage.setItem("reqstPurposePathName", $(location).attr('pathname'));
		
//		alert('reqstPurposeCd : '+reqstPurposeCd);
		processDtsRltmReqst(reqstPurposeCd);
//		self.close();
		
	} else {
		alert("용도 신청을 선택해 주세요.");
		return;
	}
}

function fnRltmFileSetRequest(){
	if(!isEmpty($(":radio[name='reqstPurposeCd']:checked").val())){
		var reqstPurposeCd = $(":radio[name='reqstPurposeCd']:checked").val();
		
		reqstPurposeCdSave = reqstPurposeCd;
		sessionStorage.setItem("reqstPurposeCd", reqstPurposeCdSave);
		sessionStorage.setItem("reqstPurposePathName", $(location).attr('pathname'));
		processRltmFileSetReqst(reqstPurposeCd);
		
	} else {
		alert("용도 신청을 선택해 주세요.");
		return;
	}
}

function processDtsRltmReqst(reqstPurposeCd){
	
	var reqForm = $("form[name='requestForm']").serialize();
	$.ajax({
		url: "/data/common/processRltmRequstAjax.do",
		type:"post",
	    dataType:"json",	
	    data: reqForm,				     
		success: function(data) {
			//alert("dataReqstFileSn : " + data.dataReqstFileSn);
			$("#dataReqstSn").val(data.dataReqstSn);
			$("#dataReqstFileSn").val(data.dataReqstFileSn);
			$("#reqstPurposeCd").val(reqstPurposeCd);
			
			LayerUtil.hide();
			fnCVSDownload();
		},
		error: function(){
			alert('자료신청에 실패하였습니다.');
		}		
	});
}

function processRltmFileSetReqst(reqstPurposeCd){
	
	var ftpYn = $("form[name='requestForm']").find('#ftpYn').val();
	var isFtp = ftpYn!=null && ftpYn=='Y' ? true : false;

	//alert('ftpYn : '+ftpYn);
	//alert('isFtp : '+isFtp);

	if(!isFtp){
		var reqForm = $("form[name='requestForm']");
		//downloadZip(reqForm);
		downloadRltmFileSetZip(reqForm);

		setTimeout(fnCancel(), 100);
	}else{
		var reqForm = $("form[name='requestForm']").serialize();

		//window.opener.//showLoading();
		//showLoading();

		$.ajax({
			url: "/data/common/processDtsReqstFTPAjax.do",
			type:"post",
		    dataType:"json",
		    data: reqForm,
			success: function(data) {
				//hideLoading();
				if(data.result != null && data.result != ''){
					if(data.result=='success'){
						alert('등록된 메일주소로 접속가능한 FTP 아이디와 비밀번호를 발송예정입니다. \n'+data.fileName+' 파일을 다운로드 받으시기 바랍니다');
					}else {
						if(isEmpty(data.msg)){
							alert('자료신청에 실패하였습니다.');
						}else if(data.msg == "USER_NOT_FOUND"){
							alert("파일다운로드가 가능한 FTP 계정이 존재하지 않습니다.\n\n 관리자에게 문의 하시거나 차후에 다시 신청바랍니다.");
						}
					}
				}else{
					alert("5:관리자에게 문의하시기 바랍니다.");
				}
				fnCancel();
			},
			error: function(data){
				//hideLoading();
				alert("51:관리자에게 문의하시기 바랍니다.");
				fnCancel();
	 		    return;
			}
		});
		//die();
	}
}

/*
 * 자료신청 - 용도신청 팝업 - 닫기
 */
function fnCancel(){
	LayerUtil.hide();
	//self.close();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    	
	    	
// 다운로드 이력 등록 및 실행
function processDtsReqst(reqstPurposeCd){
	var ftpYn = $("form[name='requestForm']").find('#ftpYn').val();
	var isFtp = ftpYn!=null && ftpYn=='Y' ? true : false;
	
	//alert('ftpYn : '+ftpYn);
	//alert('isFtp : '+isFtp);
	
	if(!isFtp){
		var reqForm = $("form[name='requestForm']");
		downloadZip(reqForm);
		
		setTimeout(fnCancel(), 100);
	}else{
		var reqForm = $("form[name='requestForm']").serialize();
		
		//window.opener.//showLoading();
		//showLoading();
		
		$.ajax({
			url: "/data/common/processDtsReqstFTPAjax.do",
			type:"post",
		    dataType:"json",	
		    data: reqForm,				     
			success: function(data) {
				//hideLoading();
				if(data.result != null && data.result != ''){
					if(data.result=='success'){
						alert('등록된 메일주소로 접속가능한 FTP 아이디와 비밀번호를 발송예정입니다. \n'+data.fileName+' 파일을 다운로드 받으시기 바랍니다');
					}else {
						if(isEmpty(data.msg)){
							alert('자료신청에 실패하였습니다.');
						}else if(data.msg == "USER_NOT_FOUND"){
							alert("파일다운로드가 가능한 FTP 계정이 존재하지 않습니다.\n\n 관리자에게 문의 하시거나 차후에 다시 신청바랍니다.");
						}
					}
				}else{
					alert("5:관리자에게 문의하시기 바랍니다.");
				}
				fnCancel();
			},
			error: function(data){
				//hideLoading();
				alert("51:관리자에게 문의하시기 바랍니다.");
				fnCancel();
	 		    return;
			}		
		});
		//die();
	}
	
}

/**
 * 전체 체크/해제
 */
function checkThisout(){
	var check = $('#checkAll').prop('checked');
	
	if(check){
		$('input[type=checkbox]').prop('checked', true);
	}else{
		$('input[type=checkbox]').prop('checked', false);
	}
	
}


/* 
*  ------------자료 선택 통계 팝업
*/

function fnRltmFileSetDownload(){
	var ftpYn = 'N';

	var stdrMg = $('#stdrMg').val();
	var dwldSetupPd = $('#dwldSetupPd').val();

	if(availableBrwoser()){
		var frm = create_form('downForm', 'post', '/data/cmmn/selectPrposRltmFileSetReqstPopup.do', 'prposRltmFileSetReqstFormPopup');
		frm = add_input(frm, 'ftpYn', ftpYn);
		frm = add_input(frm, 'sviceSe', $("#serviceSe").val());
		frm = add_input(frm, 'startDt', $("#startDt").val());
		frm = add_input(frm, 'endDt', $("#endDt").val());
		frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
	    frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);
	    frm = add_input(frm, 'stdrMg', stdrMg);
	    frm = add_input(frm, 'stnIds',$('#stnIds').val());
	    frm = add_input(frm, 'mddlClssCd',$('#mddlClssCd').val());
	    frm = add_input(frm, 'lrgClssCd',$('#lrgClssCd').val());
	    frm = add_input(frm, 'elementGroupSns',$('#elementGroupSns').val());
	    frm = add_input(frm, 'filesetDtlSns', $('#elementCds').val());
	    frm = add_input(frm, 'elementCds', $('#elementCds').val());
	    frm = add_input(frm, 'startHh', $('#startHh').val());
	    frm = add_input(frm, 'endHh', $('#endHh').val());
	    frm = add_input(frm, 'startMt', $('#startMt').val());
	    frm = add_input(frm, 'endMt', $('#endMt').val());
	    $('body').append(frm);
        //showLoading();
    	$.ajax({
    	     type: 'post',
    	     url: "/data/cmmn/selectPrposRltmFileSetReqstPopup.do",
    	     data: $('form[name=downForm]').serialize(),
    	     dataType : "html",
    	     success: function(data) {
    	    	 LayerUtil.show(data);
    	    	 if(!isEmpty(reqstPurposeCdSave)){
    	    		 $(".layer").css("display","none");
	    			$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
	    			fnRltmRequest();
	    		}
    	     }  ,
    	     error: function(){
    	    	 LayerUtil.hide();
    	     }
    	   });

	}else{
	
	   var df = document.ieDownForm;
	    df.ftpYn.value = ftpYn;
	    df.sviceSe.value = $("#serviceSe").val();
	    df.startDt.value = $("#startDt").val();
	    df.endDt.value = $("#endDt").val();
	    df.dataFormCd.value = $("#dataFormCd").val();
	    	    
	    df.dwldSetupPd.value = dwldSetupPd;
	    df.stdrMg.value = stdrMg;
	    	        
	    df.stnIds.value = $('#stnIds').val();
	    df.mddlClssCd.value = $('#mddlClssCd').val();
	    df.lrgClssCd.value = $('#lrgClssCd').val();
	    df.elementGroupSns.value = $('#elementGroupSns').val();
	    df.filesetDtlSns.value = $('#elementCds').val();
	    df.elementCds.value = $('#elementCds').val();
	    df.startHh.value = $('#startHh').val();
	    df.endHh.value = $('#endHh').val();
	    df.startMt.value = $('#startMt').val();
	    df.endMt.value = $('#endMt').val();
	    //showLoading();
    	$.ajax({
    	     type: 'post',
    	     url: "/data/cmmn/selectPrposRltmFileSetReqstPopup.do",
    	     data: $('form[name=ieDownForm]').serialize(),
    	     dataType : "html",
    	     success: function(data) {
    	    	 LayerUtil.show(data);
    	    	 if(!isEmpty(reqstPurposeCdSave)){
 	    			$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
 	    			fnRltmRequest();
 	    		}
    	     }  ,
    	     error: function(){
    	    	 LayerUtil.hide();
    	     }
    	   });
	}

}

  function fnCVSDownloadRequest() {
	if (document.schForm.startDt.value == '') {
		// 자료형태별로 날짜 셋팅
		$("#startDt").val($("#startDate").val());
		$("#endDt").val($("#endDate").val());
	}

	if ($("#startDt").val() == "" || $("#endDt").val() == "") {
		alert("기간을 입력해 주세요.");
		return;
	}

	if (document.schForm.stnIds.value == '') {
		alert('지점을 선택하십시오.');
		return;
	}
	if (document.schForm.elements.value == '') {
		alert('분류를 선택하십시오.');
		return;
	}

	btnRltmDownload();
}

  function login_Check(quarter){ 
	  $.ajax({
			type : 'post',
			url : '/cmmn/loginSessionCheck.do',
			dataType : 'json',
			success : function(result) {
				if (result.code == "00") {
					if (result.data == 2) {
						if($(location).attr('pathname') == sessionStorage.getItem("reqstPurposePathName") ){
							reqstPurposeCdSave = sessionStorage.getItem("reqstPurposeCd");
						}
						/*reqFileDownload();*/
						if (quarter == 'dta') {
							btnDownload();
						} else if (quarter == 'rltm') {
							reqFileDownload();
						} else if (quarter == 'etc') {
							fnCVSDownload();
						} else if (quarter == 'cdps'){
							selectPrposCdpsReqstPopup();//\src\main\webapp\resources\js\cdps.js
						}
					} else {
						//loginPopup(); //샘플 자료 다운로드로 변경
						$.ajax({
							url: "/cmmn/commonLoginLayer.do",
							type:"post",
						    dataType:"html",	
						    data: {dataType : quarter},				     
							success: function(data) {
								LayerUtil.show(data);
							}
						});
					}
				} else {
					if (!isEmpty(result.msg)) {
						alert(result.msg);
					} else {
						alert("실패 하였습니다.");
					}
				}
			},
			error : function() {
				alert("실패 하였습니다..");
				return false;
			}
		});
  }
  
  function session_Check(quarter) {
//	  console.log(quarter);
	$.ajax({
		type : 'post',
		url : '/cmmn/loginSessionCheck.do',
		dataType : 'json',
		success : function(result) {
			if (result.code == "00") {
				if (result.data == 2) {
					if($(location).attr('pathname') == sessionStorage.getItem("reqstPurposePathName") ){
						reqstPurposeCdSave = sessionStorage.getItem("reqstPurposeCd");
					}
					if (quarter == 'dta') {
						btnDownload();
					}else if (quarter == 'rmt') {
						btnDownload();
					} else if (quarter == 'rltm') {
						fnCVSDownloadRequest();
					} else if (quarter == 'rltm_fileset'){
						fnRltmFileSetDownload();
					} else if (quarter == 'etc') {
						fnCVSDownload();
					} else if (quarter == 'cdps'){
						selectPrposCdpsReqstPopup();//\src\main\webapp\resources\js\cdps.js
					} else if (quarter == 'light'){
						//경량화 다운로드 : 파일 2개이상일경우 용량 100MB 제한
						btnDownloadLimit100();
					}
				} else {
					//loginPopup(); //샘플 자료 다운로드로 변경
					/*
					if (quarter == 'dta') {
						btnDownload();
					} else {
					*/
						$.ajax({
							url: "/cmmn/commonLoginLayer.do",
							type:"post",
						    dataType:"html",	
						    data: {dataType : quarter},				     
							success: function(data) {
								LayerUtil.show(data);
							}
						});
					/*}*/
				}
			} else {
				if (!isEmpty(result.msg)) {
					alert(result.msg);
				} else {
					alert("실패 하였습니다.");
				}
			}
		},
		error : function() {
			alert("실패 하였습니다..");
			return false;
		}
	});
}

function btnDownloadLimit100(){
//경량화 다운로드 시
	//파일사이즈(MB) 합계
	var fileSize = 0;
	//각 파일사이즈
	var fileSizeMg = "";
	//파일셋 시퀀스
	var filesetSn = "";
	//파일 경로
	var fileCoursNm = "";
	//상세 파일셋 순번
	var filesetDtlSn = "";
	
	var cnt = 0;
	var tempSize = 0;
	var tempSizeVal = '';
	var temp = '';
	var strArr = '';
	
	// 선택
	$(":checkbox[name='fileSizeMgList']:checked").each(function() {
		temp = $(this).val();
//			tempSize = eval($(this).val());
		
		strArr = temp.split('^');
		//파일사이즈
		tempSize = strArr[0];
		//파일순번
		filesetSn += ','+strArr[1];
		//파일경로
		fileCoursNm += ','+strArr[2];
		//상세순번
		filesetDtlSn += ','+strArr[3];
		
		tempSize = eval(tempSize);
		
		if(tempSize==undefined || tempSize=='undefined')
			tempSize = 0;
		
		fileSize += tempSize;
		
		tempSizeVal = $(this).val();
		if(tempSizeVal==null || tempSizeVal=='')
			tempSizeVal = '0';
		
		fileSizeMg += ","+ tempSizeVal;
		cnt++;
	});
	
//		alert('filesetSns : '+filesetSn.substring(1));
//		alert('filesetDtlSns : '+filesetDtlSn.substring(1));
//		alert('sviceSe : '+$("#sviceSe").val());
	
	var ftpYn = 'N';
	var stdrMg = $('#stdrMg').val(); //100MB
	var dwldSetupPd = $('#dwldSetupPd').val();
	
	if(cnt>1){
		if((fileSize) > stdrMg){
			if(alert("자료 2개 이상 다운로드 시, 선택한 전체 파일 크기가 100MB로 제한됩니다."))
				ftpYn = "Y";
				return;
		}
	}
	
	if(fileSize <= 0) {
		alert("자료의 용량이 0 이거나, 선택하신 자료가 없습니다. 자료를 선택하세요.");
		return;
	}
	
	if(availableBrwoser()){
		//window.open('', 'prposDtaReqstFormPopup', 'width=500,height=460, toolbar=no,menubar=no,location=no,scrollbars=yes,status=no');
		
		var frm = create_form('downForm', 'post', '/data/common/selectPrposPopup.do', 'prposDtaReqstFormPopup');
		frm = add_input(frm, 'ftpYn', ftpYn);
		frm = add_input(frm, 'sviceSe', $("#serviceSe").val());
		frm = add_input(frm, 'startDt', $("#startDt").val());
		frm = add_input(frm, 'endDt', $("#endDt").val());
		frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
		frm = add_input(frm, 'fileSizeMgs', fileSizeMg.substring(1));
		frm = add_input(frm, 'fileCoursNms', fileCoursNm.substring(1));
		frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);
		frm = add_input(frm, 'stdrMg', stdrMg);
		frm = add_input(frm, 'filesetSns', filesetSn.substring(1)); 
		frm = add_input(frm, 'filesetDtlSns', filesetDtlSn.substring(1));
		$('body').append(frm);
		//showLoading();
		$.ajax({
			 type: 'post',
			 url: "/data/common/selectPrposPopup.do",
			 data: $('form[name=downForm]').serialize(),
			 dataType : "html",  
			 success: function(data) {
				 LayerUtil.show(data);
			  	/*var frm = document.requestForm;
			  	frm = add_input(frm, 'ftpYn', ftpYn);
				frm = add_input(frm, 'sviceSe', $("#sviceSe").val());
				frm = add_input(frm, 'startDt', $("#startDt").val());
				frm = add_input(frm, 'endDt', $("#endDt").val());
				frm = add_input(frm, 'dataFormCd', $("#dataFormCd").val());
				frm = add_input(frm, 'fileSizeMgs', fileSizeMg.substring(1));
				frm = add_input(frm, 'filesetSns', filesetSn.substring(1)); 
				frm = add_input(frm, 'fileCoursNms', fileCoursNm.substring(1));
				frm = add_input(frm, 'dwldSetupPd', dwldSetupPd);	
				frm = add_input(frm, 'filesetDtlSns', filesetDtlSn.substring(1)); */
				  //hideLoading();
				 if(!isEmpty(reqstPurposeCdSave)){
					 $(".layer").css("display","none");
	 	    			$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
	 	    			fnRequest();
	 	    		}
			 }  ,
			 error: function(){
				 LayerUtil.hide();
			 }
		   }); 
/*		frm.method = 'post';
		frm.target = 'prposDtaReqstFormPopup';
		frm.action = '/data/common/selectPrposPopup.do';
		
		frm.submit();*/
		
	}else{
		//window.open('', 'prposDtaReqstFormPopup', 'width=500,height=460, toolbar=no,menubar=no,location=no,scrollbars=yes,status=no');
	   var df = document.ieDownForm;
		df.ftpYn.value = ftpYn;
		df.sviceSe.value = $("#serviceSe").val();
		df.startDt.value = $("#startDt").val();
		df.endDt.value = $("#endDt").val();
		df.dataFormCd.value = $("#dataFormCd").val();
		df.fileSizeMgs.value = fileSizeMg.substring(1);
		df.filesetSns.value = filesetSn.substring(1);
		
		df.filesetDtlSns.value = filesetDtlSn.substring(1);
		
		df.fileCoursNms.value = fileCoursNm.substring(1);
		df.dwldSetupPd.value = dwldSetupPd;
		df.stdrMg.value = stdrMg;
		
		//showLoading();
		$.ajax({
			 type: 'post', 
			 url: "/data/common/selectPrposPopup.do",
			 data: $('form[name=ieDownForm]').serialize(),
			 dataType : "html",  
			 success: function(data) {
				 LayerUtil.show(data);
				 if(!isEmpty(reqstPurposeCdSave)){
					 $(".layer").css("display","none");
 	    			$("input:radio[name='reqstPurposeCd']:radio[value='"+reqstPurposeCdSave+"']").prop("checked",true);	
 	    			fnRequest();
 	    		}
			 }  ,
			 error: function(){
				 LayerUtil.hide();
			 }
		   }); 
		
	   /* df.target = 'prposDtaReqstFormPopup';
		df.action = '/data/common/selectPrposPopup.do';
		df.method = 'post';
		
		df.submit();*/
	}
	
}