/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.store.Crashes', {
    extend: 'Ext.data.Store',

    alias: 'store.crashes',

    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        url: Environment.wrapLink('index.php', {
            module: 'Modules_Json_AlertsDashboard',
            noheader: 1,
            action: 'getCrashes',
            development: +Environment.isDevelopment()
        }),
        reader : {
            type : 'json',
            rootProperty : 'data',
            successProperty : 'success'
        }
    }
});