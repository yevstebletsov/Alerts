/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.store.Ratings', {
    extend: 'Ext.data.Store',

    alias: 'store.ratings',

    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        url: Environment.wrapLink('index.php', {
            module: 'Modules_Json_AlertsDashboard',
            noheader: 1,
            action: 'getRatings',
            development: +Environment.isDevelopment()
        }),
        reader : {
            type : 'json',
            rootProperty : 'data',
            successProperty : 'success'
        }
    }
});