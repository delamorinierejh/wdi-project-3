angular
.module("swishListApp")
.controller("WardrobeShowCtrl", WardrobeShowCtrl);

WardrobeShowCtrl.$inject = ["ClothesItem", "CurrentUserService"];
function WardrobeShowCtrl(ClothesItem, CurrentUserService){
  const vm = this;
  ClothesItem
  .query({available : true,  user : CurrentUserService.getUser().id })
  .$promise
  .then(data => {
    vm.items = data.clothesItems;
  });

  vm.clearFilters = clearFilters;
  function clearFilters(){
    vm.filters = null;
    ClothesItem
    .query({ available : true, user : CurrentUserService.getUser().id })
    .$promise
    .then(data => {
      vm.items = data.clothesItems;
    });
  }

  vm.filter = filter;
  function filter(){
    ClothesItem
    .query({ available : true, user : CurrentUserService.getUser().id })
    .$promise
    .then(data => {
      vm.items = data.clothesItems;
      for (var k = 0; k < vm.items.length; k++) {
        if (vm.filters.category){
          if (vm.items[k].category !== vm.filters.category){
            vm.items.splice(k, 1);
            k--;
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
