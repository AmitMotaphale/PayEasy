define([
    'knockout',
    '../services/http-service',
    'ojs/ojarraydataprovider',
    'ojs/ojchart',
    'ojs/ojtoolbar'
], function (ko, httpService, ArrayDataProvider) {
    function SpendingTrendViewModel() {
        var self = this;

        // Extract username from URL (?username=aks)
        function getUsername() {
            var params = new URLSearchParams(window.location.search);
            return params.get('username');
        }
        var username = getUsername();

        self.chartData = ko.observableArray([]);

        httpService.fetchData('http://localhost:8081/api/spending-trend/' + username)
            .then(function (data) {
                // Map backend data (series, quarter, value) to chart fields
                var mapped = data.map(function (row) {
                    return {
                        id: row.id,
                        value: row.value,
                        group: row.quarter,   // x-axis: Q1, Q2, ...
                        series: row.series    // line per 'series'
                    };
                });
                self.chartData(mapped);
            });

        self.dataProvider = ko.pureComputed(function () {
            return new ArrayDataProvider(self.chartData, { keyAttributes: 'id' });
        });

        // Chart orientation (optional)
        self.orientationValue = ko.observable('vertical');
    }

    return SpendingTrendViewModel;
});