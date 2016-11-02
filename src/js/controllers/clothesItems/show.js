angular
  .module("swishListApp")
  .controller("ClothesItemsShowCtrl", ClothesItemsShowCtrl);

ClothesItemsShowCtrl.$inject = ["ClothesItem", "Transaction", "CurrentUserService", "$stateParams", "$state"];
function ClothesItemsShowCtrl(ClothesItem, Transaction, CurrentUserService, $stateParams, $state){
  const vm = this;
  ClothesItem.get($stateParams, data => {
    vm.item = data.clothesItem;
    vm.user = CurrentUserService.getUser();
  });

  vm.delete = () => {
    ClothesItem
      .delete($stateParams)
      .$promise
      .then(data => {
        $state.go("clothesItemsIndex");
      });
  };

  vm.swish = () => {
    vm.transaction = {
      initial_item : vm.item._id
    };
    Transaction
      .save({ transaction : vm.transaction })
      .$promise
      .then(data => {
        console.log(data.message);
        $state.go("clothesItemsIndex");
      });
  };
}
