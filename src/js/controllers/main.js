angular
.module("swishListApp")
.controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$rootScope", "CurrentUserService", "$state"];
function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;
  vm.user = CurrentUserService.getUser();

  $rootScope.$on("loggedIn", () => {
    vm.user = CurrentUserService.getUser();
    $state.go("clothesItemsIndex");
  });

  vm.logout = () => {
    event.preventDefault();
    CurrentUserService.clearUser();
  };

  $rootScope.$on("loggedOut", () => {
    vm.user = null;
    $state.go("home");
  });

  vm.toggleBurger = toggleBurger;
  function toggleBurger(){
    $('.navbar-toggle').click();
  }

  vm.toggleFilter = toggleFilter;
  function toggleFilter(){
    event.stopPropagation();
    event.preventDefault();
    console.log("clicked");
    $("#menu-toggle").toggleClass("clicked");
    $("#sidebar-wrapper").toggleClass("active");
  }
}
