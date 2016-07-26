/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.store.Alerts', {
    extend: 'Ext.data.Store',
    
    model: 'App.model.Alerts',

    sorters: [{
        property: 'date',
        direction: 'DESC'
    },{
        property: 'sort',
        direction: 'ASC'
    }],

    sortOnLoad: true,

    autoLoad: true,
    alias: 'store.alerts',
    // proxy: {
    //     type: 'memory'
    // },
    // data: [{
    //     name: 'USA',
    //     color: '#4cae4c'
    // },{
    //     name: 'USSR',
    //     color: '#d43f3a'
    // },{
    //     name: 'Ukraine',
    //     color: '#2e6da4'
    // },{
    //     name: 'Romania',
    //     color: '#4cae4c'
    // }]

    proxy: {
        useDefaultXhrHeader: false,
        type: 'ajax',
        url: Environment.wrapLink('index.php', {
            module: Environment.isDevelopment() ? 'Modules_Json_AlertsDashboardTest': 'Modules_Json_AlertsDashboard',
            noheader: 1,
            action: 'getAlerts',
            development: +Environment.isDevelopment()
        }),
        reader : {
            type : 'json',
            rootProperty : 'data',
            successProperty : 'success'
        }
    }
});