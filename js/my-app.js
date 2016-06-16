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



//预加载某页
mainView.router.loadPage('home.html');