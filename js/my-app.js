// Initialize your app
var myApp = new Framework7({
    cache:false,
    cacheDuration:10
  //pushState:true,
//  preprocess: function (content, url, next) {
//      if (url === 'people.html') { //预加载数据 
//          var template = Template7.compile(content);
//          var resultContent = template({
//              title: 'People',
//              people: ['John111', 'Ivan', 'Mary']
//          })
//          return resultContent;
//
//      }
//     
//  }

});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    animatePages:false
    //swipeBackPage:false
});

// Callbacks to run specific code for specific pages, for example for About page:

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


//加载内页
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    $$('.views').removeClass('v-h');
            

    if (mainView.params.animatePages == false) {
      mainView.params.animatePages = !mainView.params.animatePages;
    }
    // Code for home page
    if (page.name === 'home') {     
      //$$('.toolbar').show();
    }
    // Code for login page
    if (page.name === 'login') {
        //myApp.alert('Here comes our services!');
      //  $$('.toolbar').hide();
    }
});

//加载日历签到
myApp.onPageInit('calendar', function (page) {

  // Inline with custom toolbar
  var monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月' , '9月' , '10月', '11月', '12月'];
  var calendarInline = myApp.calendar({
      container: '#ks-calendar-inline-container',
      value: [new Date()],
      weekHeader: true,
      dayNamesShort:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
      toolbarTemplate: 
          '<div class="toolbar calendar-custom-toolbar">' +
              '<div class="toolbar-inner">' +
                  '<div class="left">' +
                      '<a href="#" class="link icon-only"><i class="icon icon-arrowleft"></i></a>' +
                  '</div>' +
                  '<div class="center"></div>' +
                  '<div class="right">' +
                      '<a href="#" class="link icon-only"><i class="icon icon-arrowright"></i></a>' +
                  '</div>' +
              '</div>' +
          '</div>',
      onOpen: function (p) {
          //$$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
          $$('.calendar-custom-toolbar .center').text(p.currentYear + '年' + monthNames[p.currentMonth]);
          $$('.calendar-custom-toolbar .left .link').on('click', function () {
              calendarInline.prevMonth();
          });
          $$('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
          });
      },
      onMonthYearChangeStart: function (p) {
          $$('.calendar-custom-toolbar .center').text(p.currentYear + '年' + monthNames[p.currentMonth]);
      },
      onDayClick:function  (p, dayContainer, year, month, day) { //点击事件
        alert(day);
        
      }
  });
})

//加载话题模块
function loadtopic ($this,url,callback) {
  $$.get(url, function (data) {     
    // Append loaded elements to list block
    $this.find('.infinite-scroll .list-block ul').append(data);
    // Update last loaded index
    //lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
   
    if (callback) {
      callback();
    }    
  });
}

//话题页一级
myApp.onPageInit('topic', function (page) {
    // Loading trigger
    var loading = false;
    // Last loaded index, we need to pass it to script
    //var lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
    // Attach 'infinite' event handler

    var pager = 3; //总页数
    
    $$('.tab').on('infinite', function () {  //循环加载infiniti
        // Exit, if loading in progress
        if (loading) return;
        if (pager == 0) return;
        // Set loading trigger
        loading = true;
        var $this = $$(this);

        loadtopic($this,'json/topic.html',function  () {
          pager--;
          loading = false;
        });

        // Request some file with data
    });


    //初始显示
    $$('.tab').on('show', function () {
      var $this = $$(this);
      pager = 3;//重置页码数目
      $this.find('.list-block ul').html("");
      loadtopic($this,'json/topic.html',function  () {
        pager--;
        loading = false;
      });
    });

    //默认显示第一个标签页
    myApp.showTab('#tab1');


});


//话题二级页
myApp.onPageInit('topicsub', function (page) {
    // Loading trigger
    var loading = false;
    // Last loaded index, we need to pass it to script
    //var lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
    // Attach 'infinite' event handler
    
    var pager = 3; //总页数

    var $page = $$(page.container);


    
    $page.find('.tab').on('infinite', function () {  //循环加载infiniti
        
        // Exit, if loading in progress
        if (loading) return;
        if (pager == 0) return;
        // Set loading trigger
        loading = true;
        var $this = $$(this);

        loadtopic($this,'json/topicsub.html',function  () {
          pager--;
          loading = false;
        });

        // Request some file with data
    });


    //初始显示
    $page.find('.tab').on('show', function () {
      var $this = $$(this);      
      pager = 3;//重置页码数目
      $this.find('.list-block ul').html("");
      loadtopic($this,'json/topicsub.html',function  () {
        pager--;
        loading = false;
      });
    });

    //下拉刷新

    var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
    var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
            var picURL = 'http://lorempixel.com/88/88/abstract/' + Math.round(Math.random() * 10);
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + song + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + author + '</div>' +
                                '</div>' +
                            '</li>';
            //ptrContent.prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });



    //默认显示第一个标签页
    //console.log($page.find('.page-topicsub #tabl'));
    
    myApp.showTab('#tabsub1');  
  
})

//搜索页
myApp.onPageInit('search', function (page) {
  
})

//视频播放

$$('.views').on('click','.vdbox .icon-play',function  () {

  var videobk = $$(this).parent();
  var playvideo = videobk.find('video');

  if (videobk.hasClass('play')) {
    videobk.removeClass('play');
    playvideo[0].pause();
    playvideo.removeAttr('controls');
  }else {
    videobk.addClass('play');    
    playvideo[0].play();
    playvideo.attr('controls','controls');

    playvideo.once('pause',function  () {
       videobk.removeClass('play');
       playvideo[0].pause();
       playvideo.removeAttr('controls');
    })

  }


})




//预加载某页
mainView.router.loadPage('lectures.html');