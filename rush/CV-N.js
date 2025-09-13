$(function(){
    const $links = $('.menu a');
    const sections = $links.map(function(){ return $($(this).attr('href')); }).get();

    $('.menu a, .btn').on('click', function(e){
      const href = $(this).attr('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const $t = $(href);
        const navH = $('.nav').outerHeight() || 70;
        $('html, body').stop().animate({ scrollTop: $t.offset().top - (navH + 10) }, 420);
      }
    });

    const $toTop = $('#toTop');
    $(window).on('scroll', function(){
      const y = window.scrollY || document.documentElement.scrollTop;
      $toTop.toggle(y > 400);
    });
    $toTop.on('click', () => $('html, body').animate({scrollTop:0}, 420));

    const setActive = () => {
      let curId = '';
      const navH = $('.nav').outerHeight() || 70;
      const scrollPos = $(window).scrollTop() + navH + 30;
      sections.forEach($s => {
        if ($s.length) {
          const top = $s.offset().top;
          const bottom = top + $s.outerHeight();
          if (scrollPos >= top && scrollPos < bottom) curId = '#' + $s.attr('id');
        }
      });
      $links.removeClass('active');
      if (curId) $links.filter(`[href="${curId}"]`).addClass('active');
    };
    setActive();
    $(window).on('scroll resize', setActive);

    const $lb = $('#lightbox'), $img = $('#lightbox img'), $cap = $('#lbcap');
    $('#gallery').on('click', '.tile', function(){
      const $i = $(this).find('img');
      $img.attr('src', $i.attr('src'));
      $img.attr('alt', $i.attr('alt'));
      $cap.text($(this).data('title') || '');
      $lb.fadeIn(120);
    });
    $lb.on('click', '.close, img', function(){ $lb.fadeOut(120); });
    $lb.on('click', function(e){ if(e.target === e.currentTarget) $lb.fadeOut(120); });
    $(document).on('keydown', function(e){ if(e.key === 'Escape') $lb.fadeOut(120); });

    $('#y').text(new Date().getFullYear());
  });  