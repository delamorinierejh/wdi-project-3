angular
.module("swishListApp")
.controller("HomeCtrl", HomeCtrl);

HomeCtrl.$inject = ["User", "CurrentUserService", "$state"];
function HomeCtrl(User, CurrentUserService, $state){
  const vm = this;

  if (CurrentUserService.getUser()) $state.go("clothesItemsIndex");

  vm.register = () => {
    User
    .register( { user : vm.userRegister })
    .$promise
    .then(data => {
      const user = data.user || null;
      if (user){
        CurrentUserService.saveUser(user);
      }
    });
  };

  vm.login = () => {
    User
    .login(vm.userLogin)
    .$promise
    .then(data => {
      const user = data.user || null;
      if (user){
        CurrentUserService.saveUser(user);
      }
    });
  };
}
