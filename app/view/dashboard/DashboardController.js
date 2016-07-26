/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dashboard',

    init: function(){
        var installsStore = Ext.getStore('Installs');
        var crashesStore = Ext.getStore('Crashes');
        var ratingsStore = Ext.getStore('Ratings');

        installsStore.on('beforeload', this.onStoreBeforeLoaded, this);
        crashesStore.on('beforeload', this.onStoreBeforeLoaded, this);
        ratingsStore.on('beforeload', this.onStoreBeforeLoaded, this);

        installsStore.on('load', this.onStoreLoaded, this);
        crashesStore.on('load', this.onStoreLoaded, this);
        ratingsStore.on('load', this.onStoreLoaded, this);
    },

    onStoreBeforeLoaded: function(store){
        var storeId = store.getId();
        var grid = this.lookupReference(storeId).down('grid');
        grid.up().setLoading(true);
    },

    onStoreLoaded: function(store, record){
        var storeId = store.getId();
        var grid = this.lookupReference(storeId).down('grid');
        var data = record[0].getData();
        var chartHolder = grid.up().down('chartholder');
        grid.generateGrid(data);
        grid.up().setLoading(false);
        chartHolder.refreshChart();
    },

    onDashboardShow: function(){
        this.reloadStores();
    },

    onCountrySelect: function(cmp, record){
        this.reloadStores();
    },

    onGameSelect: function(){
        this.reloadStores();
    },

    reloadStores: function(){
        var countryId = this.lookupReference('countryDashboard').getValue();
        var game = this.lookupReference('gameDashboard').getValue();
        var installsStore = Ext.getStore('Installs');
        var crashesStore = Ext.getStore('Crashes');
        var ratingsStore = Ext.getStore('Ratings');
        var params = {};

        if(countryId){
            params['country'] = countryId;
        }

        if(game){
            params['game'] = game;
        }

        installsStore.load({
            params: params
        });
        ratingsStore.load({
            params: params
        });
        crashesStore.load({
            params: params
        });
    },

    onAlertClick: function(record, eOpts){
        var cmp = this.getView();
        var countryCmp = this.lookupReference('countryDashboard');
        var gameCmp = this.lookupReference('gameDashboard');
        var gameToSelect = gameCmp.getStore().getAt(gameCmp.getStore().find('name', record.get('game')));
        var country = record.get('country_id');

        if(record.get('big')){
            country = country.split(',')[0];
        }

        var countryToSelect = countryCmp.getStore().getAt(countryCmp.getStore().find('id', country));
        gameCmp.select(gameToSelect);
        countryCmp.select(countryToSelect);
        cmp.expand();
    },

    onWidgetTypeChange: function(cmp, newValue){
        var panel = cmp.up('panel');
        var grid = panel.down('grid');
        var activeItem = newValue == 'grid' ? 0 : 1;

        panel.getLayout().setActiveItem(activeItem);
        panel.updateLayout();
        panel.down('grid').updateLayout();
    }

});