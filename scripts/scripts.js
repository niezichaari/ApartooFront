"use strict";
var yapp = angular.module("yapp",["ui.router","snap","ngAnimate","angular-jwt"]);
yapp.config(["$stateProvider","$urlRouterProvider",function(r,t){
  t.when("/dashboard","/dashboard/overview"),
  t.otherwise("/login"),
  r.state("base",{"abstract":!0,url:"",templateUrl:"views/base.html"})
  .state("login",{url:"/login",parent:"base",templateUrl:"views/login.html",controller:"LoginCtrl"})
  .state("dashboard",{url:"/dashboard",parent:"base",templateUrl:"views/dashboard.html",controller:"DashboardCtrl"})
  .state("overview",{url:"/overview",parent:"dashboard",templateUrl:"views/dashboard/overview.html"})
  .state("reports",{url:"/reports",parent:"dashboard",templateUrl:"views/dashboard/reports.html"})}]),
  angular.module("yapp")
  .controller("LoginCtrl",["$scope","$location","$http","$window",function(r,t,h,w){
    r.submit = function(){
        h({
          method: 'POST',
          url: 'http://localhost/Apartoo/web/app_dev.php/api/login_check',
          headers:
          {
              'Content-type': 'application/x-www-form-urlencoded',
          },
          data:
          '_username=' + r.username +
          '&_password=' + r.password
          }).success(function(data, status) {

                   w.sessionStorage.token = data.token;

                   return t.path("/dashboard");
          })
          .error(function(data, status) {

              console.log("Error");
          });
    }

  }])
  yapp.controller("DashboardCtrl",["$scope","$state","$window","jwtHelper","$http",function(r,t,w,jwtHelper,http){
    r.$state=t;
    var exptoken= jwtHelper.decodeToken(w.sessionStorage.token);
    r.username=exptoken.username;
    http.get("http://localhost/Apartoo/web/app_dev.php/Test/insecte/"+exptoken.username).success(function (data,status) {
      r.insectes = data.insectes ;
    
        })  .error(function(status) {
              console.log("Error");

          });;


  }]);




/*  yapp.controller('APIcons', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    console.log("Profile Controller reporting for duty.");
    ///Affichage
    function updatelist(){
        $scope.interact = false;
$http.get("http://localhost:3000/reclamation/get").success(function (recdata, status) {

        $scope.reclamation = recdata;
    });
*/
