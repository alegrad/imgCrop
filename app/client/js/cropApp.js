angular.module("cropApp", []);

angular.module("cropApp").directive('fileInput', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('change', function () {
                $parse(attrs.fileInput).assign(scope, elem[0].files);
                scope.$apply();
            });
        }
    }
});


angular.module("cropApp").controller("MainController", function ($scope, $http,$window) {
    $scope.imageUpload = function (event) {
        $scope.file = event.target.files[0];
        $scope.upload();
    };
    $scope.uploaded = false;
    $scope.userName = '';
    $scope.download = function () {
        /*$http.get('/cropp/cropped_file.jpg');*/
        $window.open('/cropp/cropped_file.jpg');
    };
    $scope.share = function () {
        SocialShare.share("twitter", {
            url: $scope.downloadLink,
            text: "Check out this image",
            hashtags: "imagecrop",
            via: $scope.userName
        });
    };

    $scope.upload = function () {
        var fd = new FormData();
        fd.append('files', $scope.file);

        var request = $http({
            method: 'POST',
            url: '/',
            data: fd,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });

        request.then(function () {
            $scope.imgSrc = 'uploads/' + $scope.file.name;
            cropp.bind($scope.imgSrc);
        });
    };


    $scope.croppedSrc = '';
    $scope.showCropped = function () {
        cropp.result('canvas', 'viewport').then(function (result) {
            $scope.croppedSrc = result;
            $scope.$apply();

            $http({
                method: 'POST',
                url: '/cropped',
                data: {img: result},
                //transformRequest: angular.identity,
                headers: {'Content-Type': "application/json"}
            }).then(function (res) {
                $scope.uploaded = true;
                $scope.downloadLink = res.data;
                console.log($scope.downloadLink);
            });
        });

    };


});

