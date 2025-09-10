// src/js/services/http-service.js
define(['ojs/ojcore', 'jquery'], function (oj, $) {
    'use strict';

    function fetchData(jsonUrl) {
        return $.getJSON(jsonUrl);
    }

    return {
        fetchData: fetchData
    };
});