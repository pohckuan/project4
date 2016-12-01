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
    "$state",
    "Recipe",
    newController
  ])
  .controller("editCtrl", [
    "$state",
    "$stateParams",
    "Recipe",
    editController
  ])
  // .controller("addToList",[
  //   addToListController
  // ])
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
    .state("edit", {
      url: "/recipes/:name/edit",
      templateUrl: "/assets/ng-views/edit.html",
      controller: "editCtrl",
      controllerAs: "vm"
    })

}

function indexController($state, Recipe){
  this.recipes = Recipe.query()
}

function newController($state, Recipe){
  this.newRecipe = new Recipe()
  this.create = function(){
    // if this.newRecipe.ingredient is falsey  or .direction is falsey,
      // do not make the request
        // display message to user why form submission was invalid

    // otherwise, save as normal
    this.newRecipe.$save().then(function(recipe){
      $state.go("show", {name: recipe.name})
    })
    console.log("saved")
  }
}
function showController($state, $stateParams, Recipe){
  this.recipe = Recipe.get({name: $stateParams.name})
  this.destroy = function(){
    this.recipe.$delete({name: $stateParams.name }).then(function(){
      $state.go("index")
    })
  }
  this.saveIngredient = function(){
    $('.list ul').append(`<li></li>`)
    console.log(this.recipe.ingredient)
  }
}

function editController($state, $stateParams, Recipe){
  this.recipe = Recipe.get({name: $stateParams.name})
  this.recipe.$promise.then((data) => {
    console.log(data)
    let ingredient = data.ingredient.join('\n')
    console.log(ingredient)
    this.recipe.ingredient = ingredient

    let direction = data.direction.join('\n')
    console.log(direction)
    this.recipe.direction = direction
  })
  this.update = function(){
    this.recipe.$update({name: $stateParams.name}).then(function(recipe){
      $state.go("show", {name: recipe.name})
    })
    console.log("edited")
  }
}
