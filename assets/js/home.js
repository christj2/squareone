
$('.navigation-header').load('https://christj2.github.io/squareone/header.html');
$('#footer').load('https://christj2.github.io/squareone/footer.html');

$(window).scroll(function() {
    slideBackgrounImages();
    if(window.scrollY > 80){
        $(".navigation-header").addClass("fixed-header");
        $('.nav-link').addClass('fixed-link');
        $('.left-section .logo-link').removeClass('hide');
    }else{
        $(".navigation-header").removeClass("fixed-header");
        $(".navigation-header").css("top","0px");
        $('.nav-link').removeClass('fixed-link');
        $('.left-section .logo-link').addClass('hide');
    }
    if(window.scrollY > 180){
        $(".fixed-header").css("top","0px");
    }else{
        $(".fixed-header").css("top","-81px");
    }
});

function slideBackgrounImages(){
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var offset = 200;
    if($('.dropdown-menu').is(':visible')){
        offset = 100;
        $('.sliding-image-container').css('height','100px');
    }else{
        $('.sliding-image-container').css('height','200px');
    }
    $('.sliding-image').each(function(){
        var elementTop = $(this).offset().top;
        var fraction = (elementTop-viewportTop)/(viewportBottom - viewportTop);
        var slide = ($(this).height()-offset) * fraction;
        if( $(this).is(':animated') ) {
            $(this).finish();
        }
        $(this).animate({
            "bottom": slide
        },2);
    });
}
$(window).on('load', function(){
    triggerScrolls();
});

Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
    slideBackgrounImages();
});

$('.navigation-header').on('click', '.dropdown-menu', function(){
    if($('.right-section').css('display') == 'block'){
        $('.right-section').css('display', 'none').removeClass('clicked');
        $('.down-arrow').removeClass('arrow-up');
    }else{
        $('.right-section').css('display', 'block').addClass('clicked');
        $('.down-arrow').addClass('arrow-up');
    }
});

$(window).resize(function(){
    if($('.dropdown-menu').is(':visible') && !$('.right-section').hasClass('clicked')){
        $('.right-section').css('display', 'none');
    }else{
        $('.right-section').css('display', 'block');
    }
    var height = ($(window).width()*.52)+'px';
    $('.pictures').css('height', height);
    if($(window).width() < 500){
        $('.chef').css('width', '100%');
        $('.chef-right').css({'width':'100%','padding-top':'40px'});
    }else{
        $('.chef').css('width', '50%');
        $('.chef-right').css({'width':'44%','padding-top':'10px'});
    }
    var chefWidth = $('.chef').css('width');
    $('.chef').css('height', chefWidth)
    $('.chef-image').css('height', parseInt(chefWidth)*1.66)
});

$('.food-sub-item').click(function(){
    var section = $(this).html();
    if(section == 'ALL'){
        $('.menumenu').show();
        $('.sliding-image-container').show();
        section = 'FULL';
    }else{
        $('.menumenu').hide();
        $('.sliding-image-container').hide();
        $('.menumenu.'+section).each(function(){
            $(this).show();
            if($(this).next().hasClass('sliding-image-container')){
                $(this).next().show(0);
            }
        });
    }
    $('.current-section').html(section+" MENU");
    setTimeout(function(){
        triggerScrolls();
        setTimeout(function(){
            triggerScrolls();
        },1);
    },1);
});

function triggerScrolls(){
    $(window).scroll();
    $(window).resize();
    $(window).scroll();
    $(window).resize();
    $(window).scroll();
}
