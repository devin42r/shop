/**
 * Created by devin on 4/4/17.
 */

angular.module('car', [])
    .controller('MainCtrl', [
        '$scope','$http',
        function($scope, $http){
            $scope.cars = [
                // {title:'car 1', upvotes:5},
                // {title:'car 2', upvotes:6},
                // {title:'car 3', upvotes:1},
                // {title:'car 4', upvotes:4},
                // {title:'car 5', upvotes:3}
            ];
            $scope.addCar = function() {
                // $scope.cars.push({title:$scope.formContent,upvotes:0})
                // $scope.formContent = 'Purple Elephant'

                if($scope.make === '' || $scope.model === '') { alert('Please provide all three'); return; }
                console.log("In addcar with "+$scope.make);
                $scope.create({
                    make: $scope.make,
                    model: $scope.model,
                    image: $scope.imgurl,
                    upvotes: 0,
                });
                $scope.make = '';
                $scope.model = '';
                $scope.imgurl = '';
            }
            $scope.incrementUpvotes = function(car) {
                $scope.upvote(car);
            };
            $scope.getAll = function() {
                return $http.get('/cars').success(function(data){
                    angular.copy(data, $scope.cars);
                    console.log(data);
                });
            };
            $scope.create = function(car) {
                return $http.post('/cars', car).success(function (data) {
                    $scope.cars.push(data);
                });
            };
            $scope.upvote = function(car) {
                return $http.put('/cars/' + car._id + '/upvote')
                    .success(function(data){
                        console.log("upvote worked");
                        car.upvotes += 1;
                    });
            };
            $scope.delete = function(car) {
                $http.delete('/cars/' + car._id )
                    .success(function(data){
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.getAll();
        }
    ]);