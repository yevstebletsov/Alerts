/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.store.Countries', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    alias: 'store.countries',

    proxy: {
        useDefaultXhrHeader: false,
        type: 'ajax',
        url: Environment.wrapLink('index.php', {
            module: 'Modules_Json_AlertsDashboard',
            noheader: 1,
            action: 'getCountries',
            development: +Environment.isDevelopment()
        }),
        reader : {
            type : 'json',
            rootProperty : 'data',
            successProperty : 'success'
        }
    }
    // proxy: {
    //     type: 'memory'
    // },
    // data: [{
    //     name: 'USA'
    // },{
    //     name: 'USSR'
    // },{
    //     name: 'Ukraine'
    // },{
    //     name: 'Romania'
    // }]
});