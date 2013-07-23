function SecMessageViewCtrl ($scope, $http, $location, $routeParams, NotificationService) {

    $scope.messageId = $routeParams.id;

    $http.get('/api/message/' + $scope.messageId).success(function (data) {
        if (data.error != undefined) {
            NotificationService.dispatchEvent('error', data.error);
        }
        $scope.encryptedMessage = data.message;

    });

    $scope.decryptModalOpen = function () {
        $scope.decryptionKeyModal = true;
    }


    $scope.decryptModalClose = function () {
        $scope.decryptionKeyModal = false;
    }

    $scope.modalOpts = {
        backdropFade: true,
        dialogFade: true,
        width: '300px'
    };


    $scope.decrypt = function () {
        try {
            console.log($scope.encryptedMessage);
            $scope.message = sjcl.decrypt($scope.secret, $scope.encryptedMessage);

            $scope.encrypted = false;

        } catch (error) {
            console.log(error.message);

            NotificationService.dispatchEvent('error', 'Decryption error. Check your key and try again.');
        }

        $scope.secret = '';
        $scope.decryptionKeyModal = false;
    }


    $scope.delete = function () {
        $http.delete('/api/message/' + $scope.messageId).success(function (data) {
            if (data.error != undefined) {
                NotificationService.dispatchEvent('error', data.error);
            }

            NotificationService.dispatchEvent('success', data.error);

            $location.path('#/main');

        });
    }
}