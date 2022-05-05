var beforeFocus;//이전 포커스 저장 
var layer_beforeFocus;//이전 포커스 저장 
var reqstPurposeCdSave;//용도 신청 저장
//var msgcontainer_beforeFocus;//이전 포커스 저장 
$(document).ready(function(){
   
   /** jquery ui **/
   $('.datepicker').each(function(){
      var thisDatePicker = $(this);
      var thisDatePickerWrapper = thisDatePicker.parents('.wrap_datepicker');
      var thisDatePickerOpen = thisDatePickerWrapper.children('.open_cal');
      var thisDatePickerClose = thisDatePickerWrapper.children('.close_cal');
      thisDatePicker.datepicker({
         dateFormat: 'yymmdd',
         prevText: '이전 달',
         nextText: '다음 달',
         monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
         monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
         dayNames: ['일','월','화','수','목','금','토'],
         dayNamesMin: ['일','월','화','수','목','금','토'],
         showMonthAfterYear: true,
         yearSuffix: '년 ',
         changeMonth: true,
         changeYear: true,
         altField:thisDatePickerWrapper.find('.inp'),
         onSelect :function(dateText, inst){
            thisDatePicker.hide();
         },
      });
      thisDatePicker.hide();
      thisDatePickerOpen.click(function(){
         showClendar();
      })
      thisDatePickerWrapper.find('.cal').focus(function(){
         showClendar();
      })
      thisDatePickerClose.appendTo(thisDatePicker);
      thisDatePickerClose.click(function(){
         thisDatePickerClose.hide();
         thisDatePicker.hide();
      })
      function showClendar(){
         $('.datepicker').not(thisDatePicker).hide();
         thisDatePickerClose.show();
         thisDatePicker.show();
      }
   })
   $('.box_lst').focus(function(){
     if($(".branch_a:first").parents("li").children().length == 4){
 		$(".branch_a").each(function(){
 			$(this).prev("a").attr("title", $(this).text());
 			$(this).removeAttr("href");
 		});
 	}
   });
   

   /** header **/
   $('#header .lst_menu .d1').focus(function(){
     var thisD1 = $(this).parents('li');
     thisD1.addClass('on');
     $('#header .lst_menu > li').not(thisD1).removeClass('on');
   });
   $('#header .btn_allmenu').focus(function(){
      $('#header .lst_menu > li').removeClass('on');
   })
   $('#header .lst_menu .d1').hover(function(){
     var thisD1 = $(this).parents('li');
     $('#header .lst_menu > li').not(thisD1).removeClass('on');
   });
   $('#header .btn_allmenu').click(function(){
      $('#header .lst_menu > li').removeClass('on');
   });

   $('.wrap_allMenu .depth2 .d2').focus(function(){
     var thisD2 = $(this).parents('li');
     thisD2.addClass('on');
     $('.wrap_allMenu .depth2 > li').not(thisD2).removeClass('on');
   });
   $('.wrap_allMenu .depth2 .d2').hover(function(){
     var thisD2 = $(this).parents('li');
     thisD2.addClass('on');
     $('.wrap_allMenu .depth2 > li').not(thisD2).removeClass('on');
   });
   $('.btn_allmenu').click(function(){
      $('.wrap_allMenu').toggleClass('on');
   });

   $('#header .tgl_sch').click(function(){
      $('body').addClass('dimm');
      $('#search').addClass('on');
      $('.close_sch').click(function(){
         $('body').removeClass('dimm');
         $('#search').removeClass('on');
      })
      $('body').mouseup(function (e){
         var container = $('#search');
         if( container.has(e.target).length === 0){
            $('body').removeClass('dimm');
            $('#search').removeClass('on');
         }
      });
   });
   $('#header .tgl_menu').click(function(){
      $(this).toggleClass('on');
      if($('#header .tgl_menu').hasClass('on')){
         $('#wrap').addClass('gnb_on');
         $('.tgl_sch').hide();
      }else {
         $('#wrap').removeClass('gnb_on');
         $('.tgl_sch').show();
         $('.tit_d1, .tit_d2').removeClass('on');
         $('.wrap_sub, .depth3').hide();
      }
      $('#gnb .tit_d1').click(function(){
         var $thisD1 = $(this);
         var $thisSub = $thisD1.next('.wrap_sub');
         $('#gnb .tit_d1').not($thisD1).removeClass('on');
         $('#gnb .wrap_sub').not($thisSub).stop().slideUp('fast');
         $thisD1.toggleClass('on');
         if($thisD1.hasClass('on')){
            $thisSub.stop().slideDown('fast');
         }else {
            $thisSub.stop().slideUp('fast');
         }
      })
      $('#gnb .tit_d2').click(function(){
         var $thisD2 = $(this);
         var $thisSub = $thisD2.next('.depth3');
         $('#gnb .tit_d2').not($thisD2).removeClass('on');
         $('#gnb .depth3').not($thisSub).stop().slideUp('fast');
         $thisD2.toggleClass('on');
         if($thisD2.hasClass('on')){
            $thisSub.stop().slideDown('fast');
         }else {
            $thisSub.stop().slideUp('fast');
         }
      })
   })

   /*** snb ***/
   if($('#snb').length>0){
      $('#snb .it_d2 > .tgl').click(function(){
         $(this).parents('.it_d2').toggleClass('hv');
         $(this).next('.depth3').slideToggle('fast');
      });
      $('#snb .it_d1 > .tgl').click(function(){
         $(this).parents('.it_d1').toggleClass('hv');
         $(this).next('.depth2').slideToggle('fast');
      });
   }

   /** slider **/
   if($('.slider').length>0){
      $('.pause').on('click', function() {
         var thisSlider = $(this).parents('.wrap_slider');
         thisSlider.find('.play').removeClass('on');
         thisSlider.find('.pause').addClass('on');
         thisSlider.find('.slider').slick('slickPause');
      });
      $('.play').on('click', function() {
         var thisSlider = $(this).parents('.wrap_slider');
         thisSlider.find('.play').addClass('on');
         thisSlider.find('.pause').removeClass('on');
         thisSlider.find('.slider').slick('slickPlay');
      });
      if($('.slider').length>0){
         $('.slider').each(function(){
            $thisSlider = $(this);
            if($thisSlider.children('.item').length===1){
               $thisSlider.parents('.wrap_slider').find('.ctr').hide();
            }
         })
      }
   }

   /** checkbox **/
   $("#allChk").click(function(){
      if($("#allChk").is(":checked")){
        $(".chk[type='checkbox']").prop("checked", true);
      }
      else{
        $(".chk[type='checkbox']").prop("checked", false);
      }
   });
   $(".chk[type='checkbox']").not('#allChk').click(function(){
      var thisChkGroup = $(this).attr('name');
      if($(".chk[name="+thisChkGroup+"]:checked").length == 3){
        $("#allChk").prop("checked", true);
      }else{
        $("#allChk").prop("checked", false);
      }
   });
   
    //class box_lst : focus
    $(".box_lst:visible").each(function(i){$(this).attr('tabindex', '0');});
})

$(document).on('click', '#wrap_content a', function(e){
	if(!$(this).hasClass('switch')){
		beforeFocus = e.target;
	}
});

$(document).on('click', '#wrap_content button', function(e){
	beforeFocus = e.target;
});

$(document).on('click', '.layer a', function(e){
	if(!$(this).hasClass('closeLayer') && !$(this).hasClass('switch')){
		layer_beforeFocus = e.target;
	}
});
$(document).on('click', '.layer button', function(e){
	if(!$(this).hasClass('closeLayer') && !$(this).hasClass('switch')){
		layer_beforeFocus = e.target;
	}
});
//$(document).on('click', '.msgcontainer a', function(e){
//	msgcontainer_beforeFocus = e.target;
//});
//$(document).on('click', '.msgcontainer button', function(e){
//	msgcontainer_beforeFocus = e.target;
//});

$(document).on('click', '#datapop-tab-content a', function(e){
	layer_beforeFocus = e.target;
});

$(document).on('click', '#datapop-tab-content button', function(e){
	layer_beforeFocus = e.target;
});
$(document).on('click', '.right a', function(e){
	beforeFocus = e.target;
});

$(document).on('click', '.ztree li a.button.chk', function(e){
	$(".ztree li a.button.chk").each(function(index, item){ 
		var thisClassName = $(this).attr("class");
		if(thisClassName.indexOf("checkbox_false") == -1){
			$(this).next().children("label").children("label").text("선택 됨");
			$(this).attr("title",$(this).next().text());
			
		}else{
			$(this).next().children("label").children("label").text("선택 안됨");
			$(this).attr("title",$(this).next().text());
		}
	});
});


//onchange event => focus event
$(document).on('change', 'select', function(e){
	$(this).trigger('focus');
});

/** popup layer **/
function popLayer(layer){
   var thisAnchor = $(layer);
   var thisLayer = $(layer).data('layer');
   $('#'+thisLayer+'Pop').addClass('on').show();
   $('#'+thisLayer+'Pop .layer').focus();
   $('.closeLayer').click(function(){
	   $('#'+thisLayer+'Pop').removeClass('on').hide();
       thisAnchor.focus();
   })
}
/*
 * function popLayer(layer){
   var thisAnchor = $(layer);
   var thisLayer = $(layer).data('layer');
   if($('#'+thisLayer+'Pop').length<1){
      $('body').append('<div id="'+thisLayer+'Pop" class="wrap_layer"></div>');
      $('#'+thisLayer+'Pop').load('../layer/'+thisLayer+'.html', function(){
         $('.closeLayer').click(function(){
            $(this).parents('.back_layer').remove()
            thisAnchor.focus()
         });
         $('#'+thisLayer+'Pop').addClass('on').show();
         $('#'+thisLayer+'Pop .layer').focus().draggable({ handle: ".hd_layer" })
         $('.closeLayer').click(function(){
            $('#'+thisLayer+'Pop').remove()
            thisAnchor.focus()
         })
      });
   }
 */
function dataLayer(layer){
   var thisAnchor = $(layer);
   var thisLayer = $(layer).data('layer');
   $('body').append('<div id="'+thisLayer+'Layer" class="wrap_layer on" style="display: block;"></div>');//back_layer
   $('.wrap_layer').load('../layer/'+thisLayer+'.html', function(){
      $('.wrap_layer .layer').focus();
      $('.closeLayer').click(function(){
         $(this).parents('.wrap_layer').remove();
         thisAnchor.focus();
      });
   });
}

function popMsg(layer){
   var thisAnchor = $(layer);
   var thisMsg = $(layer).data('msg');
   $('body').append('<div class="wrap_layer on" style="display: block;"><div class="msgBox" tabindex="0"><div class="hd_msg"></div><div class="cont_msg"></div></div></div>');
   $('.hd_msg').append('<strong class="tit">알림</strong><button type="button" class="closeLayer"><i>닫기</i></button>');
   $('.cont_msg').append('<p>'+thisMsg+'</p>');
   $('.cont_msg').append('<div class="wrap_btn"><button type="button" class="closeLayer">확인</button></div>');
   $('.wrap_layer .msgBox').focus();
   $('.closeLayer').click(function(){
      $(this).parents('.wrap_layer').remove();
      thisAnchor.focus();
   });
}

function treeBtChange(obj){
	if($(obj).attr('class').indexOf("_open") != -1){
		$(obj).html('<span class="blind">열기</span>');
	}else{
		$(obj).html('<span class="blind">닫기</span>');
	}
	if($(obj).parents("li").children().length == 4){
		$(".branch_a").each(function(){
			$(this).prev("a").attr("title", $(this).text());
			$(this).removeAttr("href");
		});
	}
	
}


