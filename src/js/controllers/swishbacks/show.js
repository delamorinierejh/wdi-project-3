angular
.module("swishListApp")
.controller("SwishbackShowCtrl", SwishbackShowCtrl);

SwishbackShowCtrl.$inject = ["ClothesItem", "Transaction", "CurrentUserService", "$stateParams", "$state"];
function SwishbackShowCtrl(ClothesItem, Transaction, CurrentUserService, $stateParams, $state){
  const vm = this;
  vm.transaction_id = $stateParams.transaction;
  console.log(vm.transaction_id);
  ClothesItem.get($stateParams, data => {
    vm.item = data.clothesItem;
    vm.user = CurrentUserService.getUser();
  });

  vm.swishback = () => {
    let transaction = {
      response_item : vm.item._id
    };
    Transaction
      .swishback({ _id : vm.transaction_id, transaction } )
      .$promise
      .then(data => {
        $state.go("usersIncomingShow");
      });
  };
}
