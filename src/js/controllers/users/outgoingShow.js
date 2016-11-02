angular
.module("swishListApp")
.controller("OutgoingShowCtrl", OutgoingShowCtrl);

OutgoingShowCtrl.$inject = ["Transaction", "CurrentUserService", "$stateParams", "$state"];
function OutgoingShowCtrl(Transaction, CurrentUserService, $stateParams, $state){
  const vm = this;
  Transaction
  .query({ initiator : true, activeDeal: true })
  .$promise
  .then(data => {
    vm.transactions = data.transactions;
  });

  vm.approve = (idhere) => {
    Transaction
    .approve({ _id: idhere })
    .$promise
    .then(data => {
      $state.go("usersArchiveShow", $stateParams);
    });
  };


  vm.reject = (transaction) => {
    Transaction
    .reject({ _id: transaction._id })
    .$promise
    .then(data => {
      // $state.go("usersOutgoingShow", $stateParams);
      vm.transactions.splice(vm.transactions.indexOf(transaction), 1);
    });
  };
}
