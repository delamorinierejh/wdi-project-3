angular
.module("swishListApp")
.controller("ClothesItemsIndexCtrl", ClothesItemsIndexCtrl);

ClothesItemsIndexCtrl.$inject = ["ClothesItem"];
function ClothesItemsIndexCtrl(ClothesItem){
  const vm = this;
  ClothesItem
  .query({available : true})
  .$promise
  .then(data => {
    vm.items = data.clothesItems;
    for (var i = 0; i < vm.items.length; i++) {
      if (!vm.items[i].available){
        vm.items.splice(i,1);
        i--;
      }
    }
  });
  vm.clearFilters = clearFilters;
  function clearFilters(){
    vm.filters = null;
    ClothesItem
    .query({available : true})
    .$promise
    .then(data => {
      vm.items = data.clothesItems;
    });
  }
  vm.filter = filter;
  function filter(){
    ClothesItem
    .query({available : true})
    .$promise
    .then(data => {
      vm.items = data.clothesItems;
      for (var i = 0; i < vm.items.length; i++) {
        if (vm.filters.category){
          if (vm.items[i].category !== vm.filters.category){
            vm.items.splice(i, 1);
            i--;
          }
        }
      }
      for (var j = 0; j < vm.items.length; j++) {
        if (vm.filters.sex){
          if (vm.items[j].sex !== vm.filters.sex && vm.items[j].sex !== "unisex"){
            vm.items.splice(j, 1);
            j--;
          }
        }
      }
      if (vm.items.length === 0){vm.items = null;}
    });
  }
}
