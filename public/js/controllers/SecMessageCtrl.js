function SecMessageCtrl($scope, $http, $location, NotificationService) {

    $scope.encrypted = false;

    $scope.modalOpts = {
        backdropFade: true,
        dialogFade: true,
        width: '300px'
    };

    $scope.modalOpen = function () {
        $scope.encryptionKeyModal = true;
    }

    $scope.modalClose = function () {
        $scope.encryptionKeyModal = false;
    }

    $scope.encrypt = function () {
        $scope.encryptedMessage = sjcl.encrypt($scope.secret, $scope.message);

        $scope.message = $scope.message.replace(/./g, '*');

        $scope.encryptionKeyModal = false;

        $scope.encrypted = true;

        $scope.secret = '';
    }

    $scope.send = function () {
        $http
            .post('/api/message', {'message': $scope.encryptedMessage, 'email': $scope.email})
            .success(function (data) {
                if (data.error != undefined) {
                    NotificationService.dispatchEvent('error', data.error);
                }

                $scope.messageId = data.id;

                $location.path('/view/' + data.id);

                NotificationService.dispatchEvent('success', 'Your message has been sent successfully.');

            });
    }


}