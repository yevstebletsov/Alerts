/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.view.alerts.Alerts', {
    extend: 'Ext.panel.Panel',
    xtype: 'alerts',

    requires: [
        'App.store.Countries',
        'App.view.alerts.AlertsView'
    ],

    header: {
        style: {
            background: '#6a73bc',
            borderRadius: '2px',
            cursor: 'pointer'
        },
        title: {
            style: {
                fontWeight: 'bold',
                color: 'whitesmoke'
            },
            text: 'Alerts'
        }
    },

    controller: 'alerts',

    items: [{
        xtype: 'container',
        region: 'west',
        layout: 'vbox',
        items: [{
            xtype: 'form',
            reference: 'typesAlerts',
            style: {
                padding: '10px 55px 10px 45px',
                margin: '5px'
            },
            cls: 'card',
            defaults:{
                xtype: 'checkbox',
                checked: true,
                listeners: {
                    change: 'onAlertsTypeChange'
                }
            },
            items: [{
                fieldLabel: 'Installs',
                name: 'downloads',
                style: {
                    color: '#4cae4c'
                }
            },{
                fieldLabel: 'Crashes',
                name: 'crashes',
                style: {
                    color: '#2e6da4'
                }
            },{
                fieldLabel: 'Ratings',
                name: 'ratings',
                style: {
                    color: 'rgb(198, 117, 9)'
                }
            }]
        },{
            xtype: 'container',
            style: {
                padding: '10px 10px 3px 10px',
                margin: '5px'
            },
            cls: 'card',
            items: [{
                xtype: 'combobox',
                reference: 'countryAlerts',
                labelWidth: 55,
                width: 203,
                displayField: 'name',
                value: 0,
                queryMode: 'local',
                valueField: 'name',
                store: 'Countries',
                fieldLabel: 'Country',
                listeners: {
                    select: 'onCountrySelect'
                }
            }]
        }]
    },{
        xtype: 'panel',
        flex: 1,
        region: 'center',
        layout: 'fit',
        padding: '6px 3px 0 5px',
        items: [{
            xtype: 'alertssview',
            listeners: {
                itemclick: 'onAlertClick'
            }
        }],
        dockedItems: [{
            cls: 'card',
            style: {
                margin: '0 0 5px 0',
                padding: '5px'
            },
            xtype: 'container',
            dock: 'top',
            flex: 1,
            height: 30,
            items: [{
                xtype: 'label',
                text: 'Sort by:',
                style: {
                    fontWeight: 'bold',
                    color: '#4151ab',
                    margin: '0 10px 0 0'
                }
            },{
                xtype: 'label',
                text: 'Alert date',
                cls: 'sort',
                deskSort: true,
                style: {
                    cursor: 'pointer',
                    margin: '0 10px 0 0',
                    padding: '0 3px 0 3px'
                },
                labelClick: function(){
                    var alertsStore = Ext.getStore('Alerts');
                    alertsStore.sort([{
                        property: 'date',
                        direction: this.deskSort ? 'ASC' : 'DESC'
                    }]);
                    this.deskSort = !this.deskSort;
                },

                listeners: {
                    afterrender: function(cmp){
                        var el = cmp.getEl();
                        el.on('click', this.labelClick, this)
                    }
                }
            },{
                xtype: 'label',
                text: 'Show old/dismissed alerts',
                alignTarget: 'right',
                reference: 'switchAlertsCmp',
                old: 0,
                cls: 'alert-action',
                pack: 'right',
                style: {
                    float: 'right',
                    cursor: 'pointer',
                    margin: '0 10px 0 0',
                    padding: '0 3px 0 3px'

                },
                listeners: {
                    afterrender: 'onLabelAfterRender'
                }
            }]
        }]
    }]

});
