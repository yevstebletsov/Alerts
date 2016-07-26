/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.view.dashboard.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard',

    requires: [
        'App.view.dashboard.DashboardDataGrid',
        'App.view.dashboard.DashboardController',
        'App.utils.Environment',
        'App.view.chart.ChartHolder'
    ],

    controller: 'dashboard',

    reference: 'dashboard',

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
            text: 'Dashboard'
        }
    },

    listeners: {
        expand: 'onDashboardShow',
        alertclick: 'onAlertClick'
    },
    
    items: [{
        xtype: 'container',
        region: 'west',
        layout: 'vbox',
        items: [{
            xtype: 'container',
            style: {
                padding: '10px 10px 3px 10px',
                margin: '5px'
            },
            cls: 'card',
            items: [{
                xtype: 'combobox',
                reference: 'countryDashboard',
                labelWidth: 55,
                width: 203,
                displayField: 'name',
                queryMode: 'local',
                valueField: 'id',
                value: 0,
                store: 'Countries',
                fieldLabel: 'Country',
                listeners: {
                    select: 'onCountrySelect'
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
                reference: 'gameDashboard',
                labelWidth: 55,
                width: 203,
                displayField: 'name',
                queryMode: 'local',
                valueField: 'name',
                value: 'All games',
                store: 'Games',
                fieldLabel: 'Game',
                listeners: {
                    select: 'onGameSelect'
                }
            }]
        }]
    },{
        xtype: 'container',
        flex: 1,
        region: 'center',
        scrollable: 'vertical',
        style: {
            padding: '10px'
        },
        
        items: [{
            xtype: 'datagrid',
            reference: 'Installs',
            installs: true,
            listeners: {
                afterrender: function(){
                    this.setTitle('Installs');
                }
            }
        },{
            xtype: 'datagrid',
            reference: 'Ratings',
            ratings: true,
            listeners: {
                afterrender: function(){
                    this.setTitle('Ratings');
                }
            }
        },{
            xtype: 'datagrid',
            reference: 'Crashes',
            crashes: true,
            listeners: {
                afterrender: function(){
                    this.setTitle('Crashes');
                }
            }
        }]
    }]

});
