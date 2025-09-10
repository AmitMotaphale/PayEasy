define([
  'knockout',
  '../services/http-service',
  'ojs/ojarraydataprovider',
  'ojs/ojchart',
  'ojs/ojtoolbar'
], function (ko, httpService, ArrayDataProvider) {
  function DashboardViewModel() {
    var self = this;

    // Helper to parse ?username=aks from URL
    function getUsername() {
      var params = new URLSearchParams(window.location.search);
      return params.get('username');
    }

    var username = getUsername();

    self.chartData = ko.observableArray([]);

    // Only fetch this user's chart data
    httpService.fetchData('http://localhost:8081/api/charts/' + username)
      .then(function (data) {
        var mappedData = data.map(function (item) {
          return {
            id: item.id,
            series: "Metric",          // static series for the example, or make dynamic
            group: item.category,      // map category to group
            value: item.value
          };
        });

        self.chartData(mappedData);
      });

    self.dataProvider = ko.pureComputed(function () {
      return new ArrayDataProvider(self.chartData, { keyAttributes: 'id' });
    });
  }

  return new DashboardViewModel();
});