var app = angular.module("myApp", ["ezfb", "ngRoute", "ngAnimate", "ui.bootstrap","firebase"]);




app.config(function (ezfbProvider,$routeProvider, $locationProvider) {
    ezfbProvider.setInitParams({
        appId: '386469651480295',
        version: 'v2.6'
    })
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "/Views/Main.html",
        controller: "SampleCtrl"
    })
    .when("/FoodTruckMumbai", {
        templateUrl: "/Views/FoodTruckMumbai.html",
        controller: "FoodTruckMumbaiCtrl"
        })
        .when("/Menu1", {
            templateUrl: "/Views/Menu1.html",
          
        })
        .when("/Menu2", {
            templateUrl: "/Views/Menu2.html",
           
        })
        .when("/AboutMe", {
            templateUrl: "/Views/AboutMe.html",
           
        })
        .when("/Accenture", {
            templateUrl: "/Views/Accenture.html",
           
        })
        .when("/TCS", {
            templateUrl: "/Views/TCS.html",
            
        })
    .when("/FreeComputerClass", {
        templateUrl: "/Views/FreeComputerClass.html",
        controller: "FreeComputerClassCtrl"
    })
        .when("/Contact", {
            templateUrl: "/Views/Contact.html",
            controller: "ContactCtrl"
        })
         .when("/Login", {
             templateUrl: "/Views/Login.html",

         })
        .when("/Register", {
            templateUrl: "/Views/Register.html",

        })
    .otherwise({
        templateUrl: "/Views/Main.html"
    });
});

app.controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//unsplash.it/' + newWidth + '/300',
            text: ['SharePoint 2013 Developer', 'Im available for work / business', 'Microsoft Azure', 'Cloud / Android Services'][slides.length % 4],
            id: currIndex++
        });
    };

    //$scope.randomize = function () {
    //    var indexes = generateIndexesArray();
    //    assignNewIndexesToSlides(indexes);
    //};

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    //// http://stackoverflow.com/questions/962802#962890
    //function shuffle(array) {
    //    var tmp, current, top = array.length;

    //    if (top) {
    //        while (--top) {
    //            current = Math.floor(Math.random() * (top + 1));
    //            tmp = array[current];
    //            array[current] = array[top];
    //            array[top] = tmp;
    //        }
    //    }

    //    return array;
    //}
});
//app.controller("SampleCtrl", function ($scope, $firebaseObject) {

//    //$scope.name = "I love FoodTruckMumbai";
   
//    var ref = firebase.database().ref();
//        // download the data into a local object
//    //$scope.name = $firebaseObject(ref);
//    var syncObject = $firebaseObject(ref);
//        // synchronize the object with a three-way data binding
//        // click on `index.html` above to see it used in the DOM!
//        syncObject.$bindTo($scope, "data");
   

//});
// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth) {
        return $firebaseAuth();
    }
]);


// and use it in our controller
app.controller("SampleCtrl", ["$scope", "Auth", "$location", "$firebaseArray",
    function ($scope, Auth, $location, $firebaseArray) {
        $scope.auth = Auth;
        var ref = firebase.database().ref();
        $scope.messages = $firebaseArray(ref);
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
            if (firebaseUser) {
                //alert("User auth changed");
                //$scope.firebaseUser = firebaseUser;
            } else {
                //alert("No change");
            }
        });
        var firebaseUser =Auth.$getAuth();
        if (firebaseUser) {
            //alert("Signed in as:" + firebaseUser.uid);
            $scope.firebaseUser = firebaseUser;
        } else {
           // alert("No log in");
        }

       
        $scope.updateProfileUser = function () {
       
            $scope.message = null;
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: $scope.firstName + $scope.lastName
                
            }).then(function () {
                // Update successful.
                $location.path("/");
                $scope.$apply();
                $scope.message = $scope.message + "User created with uid";
                //$scope.firebaseUser = firebaseUser;
            }, function (error) {
                // An error happened.
            });
        };
        $scope.createUser = function () {
            $scope.dataLoading = true;
            $scope.message = null;
            $scope.error = null;

            // Create a new user
            Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function (firebaseUser) {
                    $scope.message = "User created with uid: " + firebaseUser.uid;
                    $scope.updateProfileUser();
                }).catch(function (error) {
                    $scope.error = error;
                });
        };
        $scope.signIN = function () {
            $scope.dataLoading = true;
            $scope.message = null;
            $scope.error = null;
            // Create a new user
            Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
                .then(function (firebaseUser) {
                    $location.path("/");
                    $scope.message = "User created with uid: " + firebaseUser.uid + firebaseUser.displayName;
                    $scope.firebaseUser = firebaseUser;
                    
                }).catch(function (error) {
                    $scope.error = error;
                });
            
        };
        
        $scope.SignOutUSer = function () {
            
            Auth.$signOut().then(function () {
                $scope.message = "User sign out";
            }).catch(function (error) {
                $scope.error = error;
            });
        };
        $scope.deleteUser = function () {
            $scope.message = null;
            $scope.error = null;

            // Delete the currently signed-in user
            Auth.$deleteUser().then(function () {
                $scope.message = "User deleted";
            }).catch(function (error) {
                $scope.error = error;
            });
        };
        $scope.sendPassReset = function () {
            Auth.$sendPasswordResetEmail($scope.email).then(function () {
                console.log("Password reset email sent successfully!");
            }).catch(function (error) {
                console.error("Error: ", error);
            });
        };
    }
]);
app.controller('NavCtrl',
    ['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
                        return page === currentRoute ? 'active' : '';
        };
    }]);
app.controller("FoodTruckMumbaiCtrl", function ($scope) {

    $scope.msg = "I love FoodTruckMumbai";
});
app.controller("FreeComputerClassCtrl", function ($scope) {

    $scope.msg = "I love FreeComputerClass";
});
app.controller("ContactCtrl", function ($scope) {

    $scope.msg = "I love Contact";
});
