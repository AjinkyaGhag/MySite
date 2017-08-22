<!DOCTYPE html>
<html lang="en">
<head>
    <title>Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="Scripts/jquery-3.1.1.min.js"></script>
    <script src="Scripts/angular.min.js"></script>
    <script src="Scripts/firebase.js"></script>
    <script src="Scripts/angularfire.min.js"></script>

    <script src="Scripts/angular-easyfb.js"></script>

    <script src="Scripts/angular-route.min.js"></script>


    <script src="Scripts/angular-ui/ui-bootstrap-tpls.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <script src="Scripts/angular-animate.min.js"></script>
    <script src="Scripts/App.js"></script>

    <link href="Styles/Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Styles/Content/font-awesome.min.css" rel="stylesheet" />
    <link href="Styles/MySiteCSS.css" rel="stylesheet" />

    <script>
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBhUWzYmxl9WPEiYlFLMjKOd7W0FPVpz-k",
            authDomain: "project1-5f708.firebaseapp.com",
            databaseURL: "https://project1-5f708.firebaseio.com",
            storageBucket: "project1-5f708.appspot.com",
            messagingSenderId: "631686253439"
        };
        firebase.initializeApp(config);
    </script>

</head>
<body ng-app="myApp">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">AJ</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar" ng-controller="NavCtrl">
                <ul class="nav navbar-nav" >
                    <li ng-class="navClass('home')"><a href="#">Home</a></li>
                    <li ng-class="navClass('AboutMe')"><a href="#/AboutMe">About Me</a></li>
                    <li ng-class="navClass('Contact')"><a href="#/Contact">Contact</a></li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">Upcoming Projects
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li ng-class="navClass('FreeComputerClass')"><a href="#/FreeComputerClass">Free Computer Class/Training/Help</a></li>
                            <li ng-class="navClass('FoodTruckMumbai')"><a href="#/FoodTruckMumbai">Food Truck Mumbai</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right" ng-controller="SampleCtrl">
                    <li ng-show="!firebaseUser" ng-class="navClass('Register')"><a href="#/Register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li ng-show="!firebaseUser" ng-class="navClass('Login')"><a href="#/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                    <li ng-show="firebaseUser"><a href="#"><span class="glyphicon glyphicon-user"></span> {{ firebaseUser.displayName }}</a> </li>
                    | 
                    <li ng-show="firebaseUser"><a href="#" ng-click="SignOutUSer()"><span class="glyphicon glyphicon-log-out"></span> Sign out</a></li>

                </ul>
            </div>
        </div>
    </nav>

    <div ng-view></div>
</body>
</html>

