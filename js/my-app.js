// Initialize your app
var myApp = new Framework7({
  pushState:true,
  preprocess: function (content, url, next) {
      if (url === 'people.html') { //预加载数据 
          var template = Template7.compile(content);
          var resultContent = template({
              title: 'People',
              people: ['John111', 'Ivan', 'Mary']
          })
          return resultContent;

      }
     
  }

});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});



//预加载某页
mainView.router.loadPage('login.html');