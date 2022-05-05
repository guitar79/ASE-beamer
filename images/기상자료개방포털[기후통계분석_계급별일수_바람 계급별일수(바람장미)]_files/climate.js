var _FIRST_SEARCH_DAY_PERIOD = 30;
var _FIRST_SEARCH_YEAR_PERIOD = 10;

var Climate = {
		/**
		 * select 박스에 년도를 입력한다.
		 * @param id
		 * @param selectedVal
		 */
		setYearOption : function(id, selectedVal){
			var toDay = new Date();
	    	var currentDate = toDay.getFullYear();
	    	var startDate = 1900;
	    	for(var i = (currentDate) ; i >= startDate; i--){
	    		$("#" + id).append('<option value="'+i+'">'+i+'</option>');
	    	}
	    	if(selectedVal != null && selectedVal != ''){
	    		$("#" + id).val(selectedVal);
	    	}
		},
		setYearOptionExt : function(id, selectedVal, stYear){
			var toDay = new Date();
	    	var currentDate = toDay.getFullYear();
	    	var startDate = stYear;

	    	$("#" + id + " option").remove();
	    	for(var i = (currentDate) ; i >= startDate; i--){
	    		$("#" + id).append('<option value="'+i+'">'+i+'</option>');
	    	}

	    	if(selectedVal != null && selectedVal != ''){
	    		$("#" + id).val(selectedVal);
	    	}
		},
		setYearOptionExt2 : function(id, selectedVal, stYear){
			var toDay = new Date();
	    	var currentDate = toDay.getFullYear();
	    	var startDate = stYear;

	    	$("#" + id + " option").remove();
	    	for(var i = (currentDate-1) ; i >= startDate; i--){
	    		$("#" + id).append('<option value="'+i+'">'+i+'</option>');
	    	}

	    	if(selectedVal != null && selectedVal != ''){
	    		$("#" + id).val(selectedVal);
	    	}
		},
		/**
		 * selectbox에 담긴 월을 셋팅한다.
		 * @param id 엘리먼트 아이디
		 * @param selectedVal 선택값
		 */
		setMonthOption : function(id, selectedVal){
			for(var i = 1; i <= 12; i++){
				var month = i;
				if(month < 10){
					month = "0" + month;
				}
				$("#" + id).append('<option value="'+month+'">'+month+'</option>');
			}

			if(selectedVal != null && selectedVal != ''){
	    		$("#" + id).val(selectedVal);
	    	}
		},
		/**
		 * selectbox에 담긴 월을 셋팅한다.
		 * @param id 엘리먼트 아이디
		 * @param selectedVal 선택값
		 */
		setDayOption : function(id, selectedVal){
			for(var i = 1; i <= 31; i++){
				var day = i;
				if(day < 10){
					day = "0" + day;
				}
				$("#" + id).append('<option value="'+day+'">'+day+'</option>');
			}

			if(selectedVal != null && selectedVal != ''){
	    		$("#" + id).val(selectedVal);
	    	}
		},
		setDate : function(){

		},
		/**
		 * 날짜를 요청한다.
		 * @param flag 날짜를 더할지(add) 뺄지(min)의 여부
		 * @param val flag의 더할지 뺄지의 일수 값
		 **/
		getDate : function(flag, val, dt){
			var toDay = new Date();
			if(dt != null && dt != undefined){
				toDay = dt;
			}
			if(flag == "add"){
				toDay.setDate(toDay.getDate() +  val);
			}else if(flag == "min"){
				toDay.setDate(toDay.getDate() -  val);
			}
			return toDay;
		},
		openClimateStnLayer : function(frm){
			$.ajax({
				type : 'post',
				url : "/climate/layer/climateStnLayer.do",
				data : $('form[name=' + frm +']').serialize(),
				dataType : "html",
				success : function(data) {
					LayerUtil.show(data);

				}
			});
		},
		openClimateAreaLayer : function(frm){
			$.ajax({
				type : 'post',
				url : "/climate/layer/climateAreaLayer.do",
				data : $('form[name=' + frm +']').serialize(),
				dataType : "html",
				success : function(data) {
					LayerUtil.show(data);

				}
			});
		},
		isSupportCanvas : function(){
			var canvasEl = document.createElement('canvas'); //create the canvas object
			if(!canvasEl.getContext) //if the method is not supported, i.e canvas is not supported
			{
			  document.write("HTML5as Not Supported By Your Browser");
			  return false;
			}else{
				return true;
			}
		},
		drawCanvasImage : function(canvasId, url, title){
			//20200129 이유나주무관 요청
			//조회후 이미지 저장시 익스, 엣지 브라우저에서 안됨 분포도
			var browserNm = browser.getBroswerName();	    				
			if("Internet Explorer" == browserNm || (browserNm == "Chrome" && navigator.userAgent.toLowerCase().indexOf("edge") != -1)){
				var $cnvs = $("#"+canvasId), $cnvsArea = $("#canvasArea"), isAverageView = false;
				if($cnvsArea.length == 0){
					//기후통계분석 > 평년값 > 기후평년값
					$cnvsArea = $cnvs.closest("div");
					isAverageView = true;
				}
				
				if($cnvsArea.find("#imgDiv").length == 0){
					var $span = $("<span/>").css({"color":"white"}).text(title)
					, $imgDiv = $("<div/>").attr("id","imgDiv")
					, $titleDiv = $("<div/>").css({"background-color" : "#444", "width":$cnvs.width(), "height" : "24px", "text-align":"left"})
					, $img = $("<image/>").attr("src",url).css({"width":$cnvs.width(),"height":$cnvs.height(),"border":"1px solid gray"});
					
					if(!isAverageView){
						$titleDiv.css({"margin": "0px "+($cnvsArea.width()-$img.width())/2+"px"});
						$imgDiv.append($titleDiv.append($span));
					}
					$imgDiv.append($img).appendTo($cnvsArea);
					
					$cnvs.hide();
					$imgDiv.show();
					
				}else{
					$("#imgDiv image").attr("src",url);
					if(!isAverageView)$("#imgDiv span").text(title);
					
				}
				
			}else{
				var image = new Image();
				//erase_image.setAttribute('crossOrigin', 'anonymous');
				image.src = url;
				image.onload = function(){
					var c = document.getElementById(canvasId);
					c.width = this.width + 20;
			        c.height = this.height + 60;
					var ctx = c.getContext('2d');

					ctx.fillStyle = "#444"; //"rgba(0, 0, 200, 0)";
					ctx.fillRect(1, 1, c.width, 40);

					ctx.fillStyle = "white";
					ctx.font = "24px Arial";
					ctx.textAlign = "left";
					ctx.fillText(title, 0, 30);

					ctx.fillStyle = "white";
					ctx.fillRect(0, 40, c.width, c.height);
					ctx.drawImage(image, 10, 50);

					ctx.strokeRect(1, 40, c.width-1, c.height-40);

				}
			}
			
		}
};
