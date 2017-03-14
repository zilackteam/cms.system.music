(function(window) {
    window.config = {
        baseUri: 'http://cms.veo.local:3000',
        baseApiUri: 'http://api.veo.local/',
        pickadate: {
            dateOptions : {
                format: 'dd-mm-yyyy',
                selectYears: true
            },
            timeOptions : {
                today: ''
            }
        },
        genderOptions: [{name:'Male'}, {name:'Female'}, {name:'Other'}]
    };
})(window);
