angular
  .module("swishListApp")
  .controller("ClothesItemsEditCtrl", ClothesItemsEditCtrl);

ClothesItemsEditCtrl.$inject = ["ClothesItem", "$stateParams", "$state"];
function ClothesItemsEditCtrl(ClothesItem, $stateParams, $state){
  const vm = this;
  ClothesItem.get($stateParams, data => {
    vm.item = data.clothesItem;
  });

  vm.submit = () => {
    ClothesItem
      .update($stateParams, { clothesItem: vm.item })
      .$promise
      .then(data => {
        $state.go("clothesItemsShow", $stateParams);
      });
  };
}
