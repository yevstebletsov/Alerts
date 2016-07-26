/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.store.Installs', {
    extend: 'Ext.data.Store',

    alias: 'store.installs',

    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        url: Environment.wrapLink('index.php', {
            module: 'Modules_Json_AlertsDashboard',
            noheader: 1,
            action: 'getInstalls',
            development: +Environment.isDevelopment()
        }),
        reader : {
            type : 'json',
            rootProperty : 'data',
            successProperty : 'success'
        }
    }
});