angular
  .module("swishListApp")
  .controller("IncomingShowCtrl", IncomingShowCtrl);

  IncomingShowCtrl.$inject = ["Transaction", "CurrentUserService"];
  function IncomingShowCtrl(Transaction, CurrentUserService){
    const vm = this;
    Transaction
    .query({ responder : true, activeDeal : true })
    .$promise
    .then(data => {
      vm.transactions = data.transactions;

    });

    vm.reject = (transaction) => {
      console.log("cancel");
      Transaction
      .reject({ _id: transaction._id })
      .$promise
      .then(data => {
        // $state.go("usersOutgoingShow", $stateParams);
        vm.transactions.splice(vm.transactions.indexOf(transaction), 1);
      });
    };
}
