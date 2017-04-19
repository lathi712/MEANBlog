/**
 * Created by latheshkarkera on 4/19/17.
 */
(function () {
    var module = angular.module('BlogApp',[]);

    var controller = module.controller('BlogController',BlogController);

    function BlogController($scope,$http){
        $scope.createPost = addPost;

        $scope.deletePost = function (postId) {
            $http.delete('/api/blogpost/'+postId).then(function (success) {
                getAllPosts();
            },function (err) {

            });
        }

        $scope.editPost = function (postId) {

            $http.get('/api/blogpost/'+postId).then(function(post) {
                console.log('edit');
                $scope.post = post.data;
            },function (err) {

            });

        }

        $scope.updatePost = function (post) {
            $http.put('/api/blogpost/'+post._id,post).then(function (success) {
                $scope.post = '';
                getAllPosts();
            },function (err) {

            });
        }
        function init() {
            getAllPosts();
        }
        init();

        function addPost(post) {
            $http.post('/api/blogpost',post).then(function (success) {
                getAllPosts();
            },function (err) {

            });
        }



        function getAllPosts() {
            $http.get('/api/blogpost').then(function (posts){
                $scope.posts = posts.data;
            },function (error){

            });

        }
    }

})();