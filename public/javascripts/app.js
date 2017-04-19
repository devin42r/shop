/**
 * Created by devin on 4/4/17.
 */

angular.module('item', [])
    .controller('MainCtrl', [
        '$scope','$http',
        function($scope, $http){
            $scope.locations = [
                'Smiths','Sprouts','WinCo'
            ];
            $scope.items = [];
            $scope.addItem = function() {
                $scope.submitted = true;
                console.log($scope.date);
                console.log('yo')
                // $scope.cars.push({title:$scope.formContent,upvotes:0})
                // $scope.formContent = 'Purple Elephant'

                // if($scope.make === '' || $scope.model === '') { alert('Please provide all three'); return; }
                console.log("In addItem with "+$scope.item);
                $scope.create({
                    date: $scope.date,
                    image: $scope.image,
                    item: $scope.item,
                    location: $scope.location,
                    price: $scope.price,
                });
                $scope.price = '';
                $scope.item = '';
                $scope.image = '';
                angular.element('#addNewModal').modal('hide');
            }
            $scope.incrementUpvotes = function(item) {
                $scope.upvote(item);
            };
            $scope.getAll = function() {
                return $http.get('/items').success(function(data){
                    angular.copy(data, $scope.items);
                    console.log(data);
                });
            };
            $scope.create = function(item) {
                return $http.post('/items', item).success(function (data) {
                    $scope.items.push(data);
                });
            };
            $scope.delete = function(item) {
                $http.delete('/items/' + item._id )
                    .success(function(data){
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.getAll();
        }
    ]);