angular
  .module("allRecipes", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    RouterFunction
  ])
  .factory("Recipe", [
    "$resource",
    RecipeFactory
  ])
  .controller("indexCtrl", [
    "$state",
    "RecipeFactory",
    indexController
  ])

function RecipeFactory($resource){
  return $resource("/api/recipes/:name", {}, {
    update: {method: "PUT"}
  })
}
function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true)
  $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/ng-views/welcome.html"
    })
    .state("index", {
      url: "/recipes",
      templateUrl: "/assets/ng-views/index.html",
      controller: "indexCtrl",
      controllerAs: "vm"
    })
}

function indexController($state, RecipeFactory){
  this.recipes = Recipe.query()
}
