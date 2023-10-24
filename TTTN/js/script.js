$(document).ready(function(){
		$( "#carouselExampleIndicators" )
		  .on( "mouseenter", function() {
		     $( ".carousel-control-prev" ).addClass('animate__fadeInLeft');
			 $( ".carousel-control-next" ).addClass('animate__fadeInRight');
			 $( ".carousel-control-prev" ).removeClass('animate__fadeOutLeft');
		  	 $( ".carousel-control-next" ).removeClass('animate__fadeOutRight');
		  } )
		  .on( "mouseleave", function() {
		    $( ".carousel-control-prev" ).removeClass('animate__fadeInLeft');
			$( ".carousel-control-next" ).removeClass('animate__fadeInRight');
			$( ".carousel-control-prev" ).addClass('animate__fadeOutLeft');
			$( ".carousel-control-next" ).addClass('animate__fadeOutRight');
		  } );
		
	});
	$(document).ready(function(){
		$(window).on('scroll', () => {
		  scroll = $(window).scrollTop();
		  if (scroll >= 300 && scroll <=900) {
		  	$('.box-content').addClass('animate__zoomIn');
		  	$('.box-content').removeClass('animate__zoomOut');
		  	$('.box-content').show();
		  }
  		  else {
  		  	$('.box-content').addClass('animate__zoomOut');
  		  	$('.box-content').removeClass('animate__zoomIn');
  		  }
		})
	})
	$(document).ready(function(){
		$( ".login" ).on( "click", function() {
		  alert( "Handler for `click` called." );
		} );
	})
$(document).ready(function(){
	$('.ul-flex>li').click(function() {
	    $('li').removeClass('active');
	    $(this).addClass('active');
	});
})
$(document).ready(function(){
	$('.ul-li-gt').click(function() {
	    $('.page-1').show();
	    $('.page-2').hide();
	});
	$('.ul-li-dv').click(function() {
	    $('.page-2').show();
	    $('.page-1').hide();
	});
})
$(document).ready(function(){
	$('.vc_tta-tabs-list>li').click(function() {
	    $('li').removeClass('vc_active');
	    $(this).addClass('vc_active');
	});
})
$(document).ready(function(){
	$('.li-nav').click(function() {
	    $('li').find("a").removeClass('nav-active');
	    $(this).find("a").addClass('nav-active');
	});
})