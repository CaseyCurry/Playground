export default class ProductsController {
  static $inject = ["$scope"];

  constructor(private $scope: any) {
    $scope.products = ["Catalyst", "MNS", "Spark"];

    $scope.addProduct = () => {
      $scope.products.push($scope.newProduct);
    };

    $scope.removeProduct = (product) => {
      const index = $scope.products.indexOf(product);
      $scope.products.splice(index, 1);
    }
  }
}
