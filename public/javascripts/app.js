/**
 * Created by devin on 4/4/17.
 */

angular.module('comment', [])
    .controller('MainCtrl', [
        '$scope','$http',
        function($scope, $http){
            $scope.comments = [
                // {title:'Comment 1', upvotes:5},
                // {title:'Comment 2', upvotes:6},
                // {title:'Comment 3', upvotes:1},
                // {title:'Comment 4', upvotes:4},
                // {title:'Comment 5', upvotes:3}
            ];
            $scope.addComment = function() {
                // $scope.comments.push({title:$scope.formContent,upvotes:0})
                // $scope.formContent = 'Purple Elephant'

                if($scope.make === '' || $scope.model === '') { alert('Please provide all three'); return; }
                console.log("In addComment with "+$scope.make);
                $scope.create({
                    title: $scope.make,
                    upvotes: 0,
                });
                $scope.make = '';
                $scope.model = '';
                $scope.imgurl = '';
            }
            $scope.incrementUpvotes = function(comment) {
                $scope.upvote(comment);
            };
            $scope.getAll = function() {
                return $http.get('/comments').success(function(data){
                    angular.copy(data, $scope.comments);
                });
            };
            $scope.create = function(comment) {
                console.log('in create with ' + comment)
                return $http.post('/comments', comment).success(function (data) {
                    $scope.comments.push(data);
                });
            };
            $scope.upvote = function(comment) {
                return $http.put('/comments/' + comment._id + '/upvote')
                    .success(function(data){
                        console.log("upvote worked");
                        comment.upvotes += 1;
                    });
            };
            $scope.delete = function(comment) {
                $http.delete('/comments/' + comment._id )
                    .success(function(data){
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.getAll();
        }
    ]);