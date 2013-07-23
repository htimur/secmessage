function AlertsCtrl($scope, NotificationService) {
    $scope.alerts = [];

    NotificationService.on('error', function(message) {
        $scope.alerts.push({type: 'error', msg: message});
    });

    NotificationService.on('success', function(message) {
        console.log(message);
        $scope.alerts.push({type: 'success', msg: message});
    });

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

}