angular
.module("swishListApp")
.controller("ClothesItemsNewCtrl", ClothesItemsNewCtrl);

ClothesItemsNewCtrl.$inject = ["ClothesItem", "$state", 'CurrentUserService'];
function ClothesItemsNewCtrl(ClothesItem, $state, CurrentUserService){
  const vm = this;
  vm.submit = () => {
    ClothesItem
      .save({ clothesItem: vm.item })
      .$promise
      .then(data => {
        $state.go("clothesItemsIndex");
      });
  };
}
