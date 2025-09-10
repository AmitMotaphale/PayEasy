define([
    'knockout',
    '../services/http-service',
    'ojs/ojarraydataprovider',
    'ojs/ojchart'
], function (ko, httpService, ArrayDataProvider) {
    function TransactionModeViewModel() {
        var self = this;

        function getUsername() {
            var params = new URLSearchParams(window.location.search);
            return params.get('username');
        }
        var username = getUsername();

        self.chartData = ko.observableArray([]);

        httpService.fetchData('http://localhost:8081/api/transaction-modes/' + username)
            .then(function (data) {
                var mapped = data.map(function (row) {
                    return {
                        id: row.id,
                        series: row.payment_mode,  // ✅ use same as JSON
                        group: 'Transaction',
                        value: row.txnValue        // ✅ ok
                    };
                });

                self.chartData(mapped);
            });

        self.dataProvider = ko.pureComputed(function () {
            return new ArrayDataProvider(self.chartData, { keyAttributes: 'id' });
        });
    }
    return TransactionModeViewModel;
});