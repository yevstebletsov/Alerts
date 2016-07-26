/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.view.alerts.AlertsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.alerts',

    onAlertsTypeChange: function(){
        this.reloadAlertsStore();
    },

    onCountrySelect: function(){
        this.reloadAlertsStore();
    },

    reloadAlertsStore: function(){
        var form = this.lookupReference('typesAlerts');
        var values = form.getValues();
        var types = [];
        var countryId = this.lookupReference('countryAlerts').getValue();
        var isOldAlertsRequested = this.lookupReference('switchAlertsCmp')['old'];
        var alertsStore = Ext.getStore('Alerts');

        for(var index in values){
            types.push(index);
        }
        alertsStore.load({
            params: {
                types: Ext.JSON.encode(types),
                country: countryId,
                old: isOldAlertsRequested
            }
        });
    },

    labelClick: function(opts, opts2, cmp){
        if(!cmp.old){
            cmp.setText('Show active alerts');
            cmp.old = 1;
        }else{
            cmp.setText('Show old/disabled alerts');
            cmp.old = 0;
        }
        this.reloadAlertsStore();
    },

    onLabelAfterRender: function(cmp){
        var el = cmp.getEl();
        el.on('click', this.labelClick, this, cmp)
    },

    onAlertClick: function( cmp , record , item , index , e , eOpts){
        var targetId = e.target['id'];

        //checking, if dismiss/activate alert was triggered
        if(targetId == 'disableAlert' || targetId == 'enableAlert'){
            this.changeAlertState(cmp, record, targetId);
        }else{
            var dashboard = this.getView().up('app-main').lookupReference('dashboard');
            dashboard.fireEvent('alertclick', record);
        }
    },

    changeAlertState: function(cmp, record, action){
        var id = record.get('alert_id');
        var date = record.get('date');
        var params = {
            id: id,
            date: date
        };
        cmp.setLoading(true);

        this.alertClickSendRequest(action, params, function(response){
            var data = Ext.JSON.decode(response.responseText).data;

            cmp.getStore().remove(record);
            cmp.setLoading(false);

        });
    },

    alertClickSendRequest: function(action, params, callback){
        Ext.Ajax.setUseDefaultXhrHeader(false);
        Ext.Ajax.request({
            method: 'GET',
            url: Environment.wrapLink('index.php', {
                module: Environment.isDevelopment() ? 'Modules_Json_AlertsDashboardTest': 'Modules_Json_AlertsDashboard',
                noheader: 1,
                development: +Environment.isDevelopment(),
                action: action
            }),
            params: params,
            success: callback
        });
    }

});