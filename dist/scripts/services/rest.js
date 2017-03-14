'use strict';

/**
 * @ngdoc service
 * @name app.services.service:RestService
 *
 * @description
 * The common service to quickly setup other services to expose a restful-like interface
 *
 * How to use in a factory
 <pre>
 angular.module('app')
 .factory('Books', function(RestService) {
        var rest = new RestService(apiUrl);

        var otherMethod = function(){}

        // Public API
        return {
          rest: rest,
          otherMethod: otherMethod
        }
      });
 </pre>
 * How to use that factory in a controller
 <pre>
 $scope.add = function(item) {
      Books.rest.add(item)
        .then(function(response) {
          // handle the promise
        });
    }
 </pre>
 */

app.factory('RestService', function($http, urls) {
    var _baseUrl = urls.BASE_API;

    var RestService = function(api) {
        this.apiPath = api;
    }

    /**
     * @ngdoc method
     * @name app.services.service:RestService#add
     * @description
     * Equivalent to POST /api/resources/
     * @methodOf app.services.service:RestService
     * @returns {promise} item data
     */
    RestService.prototype.add = function(item) {
        return $http
            .post(_baseUrl + this.apiPath, item
            /*,{
                transformRequest: function(data) {
                    return $.param(data);
                }
            }*/
        )
            .then(function(response) {
                return response.data;
            });
    }

    /**
     * @ngdoc method
     * @name app.services.service:RestService#get
     * @description
     * Equivalent to GET /api/resources/:id
     * @methodOf app.services.service:RestService
     * @returns {promise} item data
     */
    RestService.prototype.get = function(id) {
        return $http
            .get(_baseUrl + this.apiPath + id)
            .then(function(response) {
                return response.data;
            });
    }

    /**
     * @ngdoc method
     * @name app.services.service:RestService#getList
     * @description
     * Equivalent to GET /api/resources/
     * @methodOf app.services.service:RestService
     * @returns {promise} item data
     */
    RestService.prototype.getList = function(options) {
        var params = options || {};

        return $http
            .get(_baseUrl + this.apiPath, {
                params: params
            })
            .then(function(response) {
                return response.data;
            })
    }

    /**
     * @ngdoc method
     * @name app.services.service:RestService#update
     * @description
     * Equivalent to PUT /api/resource/:id
     * @methodOf app.services.service:RestService
     * @returns {promise} item data
     */
    RestService.prototype.update = function(item) {
        return $http
            .put(_baseUrl + this.apiPath + item.id, item
            /*,{
                transformRequest: function(data) {
                    return $.param(data);
                }
            }*/
            )
            .then(function(response) {
                return response.data;
            });
    }

    /**
     * @ngdoc method
     * @name app.services.service:RestService#add
     * @description
     * Equivalent to DELETE /api/resource/:id
     * @methodOf app.services.service:RestService
     * @returns {promise} item data
     */
    RestService.prototype.delete = function(id) {
        return $http
            .delete(_baseUrl + this.apiPath + id)
            .then(function(response) {
                return response.data;
            })
    }

    return RestService;
});
