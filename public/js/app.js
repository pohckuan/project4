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
    Recipe
  ])
  .controller("indexCtrl", [
    "$state",
    "Recipe",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
    "$stateParams",
    "Recipe",
    showController
  ])
  .controller("newCtrl", [
    "Recipe",
    newController
  ])

function Recipe ($resource){
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
    .state("new", {
      url: "/recipes/new",
      templateUrl: "/assets/ng-views/new.html",
      controller: "newCtrl",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/recipes/:name",
      templateUrl: "/assets/ng-views/show.html",
      controller: "showCtrl",
      controllerAs: "vm"
    })
}

function indexController($state, Recipe){
  this.recipes = Recipe.query()
  this.newRecipe = new Recipe()
  this.create = function(){
    this.newRecipe.$save().then(function(recipe){
      $state.go("show", {name: recipe.name})
    })
  }

}

function newController(Recipe){
  this.newRecipe = new Recipe()
  this.create = function(){
    this.newRecipe.$save().then(function(recipe){
      $state.go("show", {name: recipe.name})
    })
  }
}
function showController($state, $stateParams, Recipe){
  this.recipe = Recipe.get({name: $stateParams.name})
}
