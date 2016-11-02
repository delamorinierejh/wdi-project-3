angular
  .module("swishListApp")
  .controller("ArchiveShowCtrl", ArchiveShowCtrl);


  ArchiveShowCtrl.$inject = ["Transaction", "CurrentUserService"];
  function ArchiveShowCtrl(Transaction, CurrentUserService){
    const vm = this;
    Transaction
    .query({ status : 3, responder : CurrentUserService.getUser().id})
    .$promise
    .then(data => {
      vm.transactions = data.transactions;
      for (var i = 0; i < vm.transactions.length; i++) {
        vm.transactions[i].emailAddress = vm.transactions[i].initiator.email;
      }
      Transaction
      .query({ status : 3, initiator : CurrentUserService.getUser().id })
      .$promise
      .then(data => {
        vm.transactionsTwo = data.transactions;
        for (var i = 0; i < vm.transactionsTwo.length; i++) {
          vm.transactionsTwo[i].emailAddress = vm.transactionsTwo[i].responder.email;
          vm.transactions.push(vm.transactionsTwo[i]);
        }
      });
    });
  }
