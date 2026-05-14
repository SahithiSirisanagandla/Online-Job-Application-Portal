var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './login.html',
            controller: 'loginCntrl'
        })
        .when('/register', {
            templateUrl: './register.html',
            controller: 'regCntrl'
        })
        .when('/home', {
            templateUrl: './home.html',
            controller: 'homeCntrl',
            resolve: {
                message: function(storeService){
                    return storeService.checkValidity();
                }
            }
        })
        .when('/postjob', {
            templateUrl: './postjob.html',
            controller: 'postjobCntrl',
            resolve: {
                message: function(storeService){
                    return storeService.checkValidity();
                }
            }
        })
        .when('/searchjob', {
            templateUrl: './searchjob.html',
            controller: 'searchjobCntrl',
            resolve: {
                message: function(storeService){
                    return storeService.checkValidity();
                }
            }
        }).when('/yourposts', {
    templateUrl: './yourposts.html',
    controller: 'yourpostsCntrl',
    resolve: {
        message: function(storeService){
            return storeService.checkValidity();
        }
    }
}).when('/applicants/:jobId', {
    templateUrl: './applicants.html',
    controller: 'applicantsCntrl',
    resolve: {
        message: function(storeService){
            return storeService.checkValidity();
        }
    }
})
    //for removing hash
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller('postjobCntrl',['$scope','$location','$http', function ($scope, $location, $http) {

    $scope.reg = function(validity){

        if(!validity){
            alert("Please fill all fields");
            return;
        }

        var obj = {
            jobtitle: $scope.jobtitle,
            location: $scope.location,
            jobdescription: $scope.jobdescription
        };

        $http.post('/update', obj)
        .then(function(){

            alert("Job posted successfully");

            $scope.jobtitle = "";
            $scope.location = "";
            $scope.jobdescription = "";

        });

    };

    $scope.back = function(){
        $location.path('/home');
    };

}]);

app.controller('homeCntrl',['$scope','$location','$http', function ($scope, $location, $http) {
    $http.post('/checkUserType').then(function(response){
        $scope.name = response.data.username;
        $scope.name = $scope.name.charAt(0).toUpperCase() + $scope.name.slice(1);
        if(response.data.usertype === "company") {
            $scope.postj = true; $scope.sj = false;
        }
        else{
            $scope.postj = false; $scope.sj = true;
        }
    });

    $scope.prof = function () {
        $location.path('/postjob');
    };

    $scope.yourPosts = function () {
    $location.path('/yourposts');
};

    $scope.searchjob = function () {
        $location.path('/searchjob');
    };

    $scope.logout = function () {
        $http.post('/resetSession');
        $location.path('/');
    };
}]);

app.controller('searchjobCntrl',['$scope','$location','$http', function ($scope, $location, $http) {

    $http.post("/getJobs").then(function (response) {
        $scope.messages = response.data;
    });

    $scope.back = function () {
        $location.path('/home');
    };

  
    $scope.reset = function () {
        $scope.searchFish = {};
    };

    $scope.applyJob = function(jobId){

        if(!confirm("Apply for this job?")) return;

        $http.post('/apply',{ jobId: jobId })
        .then(function(response){

            if(response.data.success){

                alert("Applied successfully");

                $http.post("/getJobs").then(function(res){
                    $scope.messages = res.data;
                });

            }else{
                alert(response.data.message);
            }

        });

    };

}]);
app.controller('yourpostsCntrl',['$scope','$location','$http', function ($scope, $location, $http) {

    function loadJobs(){
        $http.post("/getMyJobs").then(function (response) {
            $scope.myjobs = response.data;
        }, function(err){
            console.log("Error loading jobs", err);
        });
    }

    loadJobs();

    $scope.back = function () {
        $location.path('/home');
    };

    $scope.viewApplicants = function(jobId){
        $location.path('/applicants/' + jobId);
    };

    $scope.deletePost = function(jobId){

        if(!confirm("Delete this job post?")) return;

        $http.post('/deleteJob', { jobId: jobId })
        .then(function(response){

            alert("Job deleted");

            // reload jobs
            loadJobs();

        }, function(err){
            console.log("Delete error", err);
        });
    };

}]);

app.controller('loginCntrl',['$scope','$location','$http', function ($scope, $location, $http) {

    $scope.verify = function () {
        var obj = {
            username: $scope.uname,
            password: $scope.password
        };
        $http.post('/login', obj).then(function(response){
            if(response.data.A === "correct") {
                alert('login successfull');
                $location.path('/home');
            } else {
                $scope.alrt = 0;
            }
        });
    };

    $scope.register = function () {
        $location.path('/register');
    };
}]);

app.controller('regCntrl',['$scope','$location','$http', function ($scope, $location, $http) {
    var obj = {};
    var temp;
    $scope.reg = function(validity) {
        $scope.submitted = false;
        if (validity) {
            obj.username = this.username;
            obj.password = this.password;
            obj.email = this.email;
            obj.location = this.location;
            obj.phone = this.phone;
            obj.usertype = this.gender;
            var flag = 0;
            $http.post('/postData', obj).then(function(response){
                if(response.data.A === "no") {
                    alert("user already exists, please change name and email");
                } else {
                    alert("Registration Successful!!! Please login");
                    $location.path('/');
                }
            });
        }
    }}]);

app.factory('storeService',['$q','$http', function($q, $http){
    var store = {
        checkValidity: function(){
            var defer = $q.defer();
            $http.post('/checkLogin').then(function (response) {
                if(response.data.isLogin === "yes")
                    defer.resolve();
                else
                    defer.reject();
            });
            return defer.promise;
        }
    };
    return store;
}]);

app.controller('applicantsCntrl',
['$scope','$http','$routeParams','$location',

function($scope,$http,$routeParams,$location){

const jobId = $routeParams.jobId;

$http.post('/getApplicants',{ jobId: jobId })
.then(function(response){
    $scope.applicants = response.data;
});

$scope.acceptApplicant = function(username){

$http.post('/acceptApplicant',{
    jobId: jobId,
    username: username
}).then(function(){
    alert("Applicant accepted");
});
};
$scope.rejectApplicant = function(username){
$http.post('/rejectApplicant',{
    jobId: jobId,
    username: username
}).then(function(){
    alert("Applicant rejected");
});
};
$scope.back = function(){
$location.path('/yourposts');
};
}]);