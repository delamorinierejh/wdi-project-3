angular
.module("swishListApp")
.factory("ClothesItem", ClothesItem);

ClothesItem.$inject = ["$resource", "API"];
function ClothesItem($resource, API) {
  return $resource(`${API}/clothesItems/:id`, { id: "@_id" }, {
    'query':  { method: "GET", isArray: false },
    'update': { method: "PUT" }
  });
}
