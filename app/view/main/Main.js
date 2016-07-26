/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'App.view.main.MainController',
        'App.view.alerts.Alerts',
        'Ext.layout.container.Border',
        'App.view.dashboard.Dashboard',
        'App.utils.Environment'
    ],

    controller: 'main',
    viewModel: 'main',

    // title: 'Tool',

    dockedItems: [{
        xtype: 'container',
        dock: 'top',
        height: 60,
        cls: 'x-header-app-custom',
        items: [{
            xtype : 'image',
            height: 50,
            style: {
                margin: '5px 5px 5px 15px'
            },
            src: !Environment.isProductionServer() ? 'resources/images/glogo.png' : './app/alerts/resources/images/glogo.png'
        },{
            xtype: 'button',
            style: {
                'float': 'right',
                background: '#ffffff',
                border: '1px solid #c2cdd1',
                borderRadius: '4px',
                margin: '15px 20px 0 0'
            },
            text: '<b>CONTACT US</b>',
            cls: 'contact-us-btn',
            action: 'show-contact',
            listeners: {
                click: 'onContactUsClick'
            }
        },{
            xtype: 'label',
            html: '<b>Go to GAT</b>',
            cls: 'alert-action',
            style: {
                color: '#6a73bc',
                'float': 'right',
                margin: '23px 15px 0 0'
            },
            labelClick: function(){
                window.location.href = 'https://gat.gameloft.org/';
            },

            listeners: {
                afterrender: function(cmp){
                    var el = cmp.getEl();
                    el.on('click', this.labelClick, this)
                }
            }
        }]
    }
    ],

    layout: 'fit',
    items: [{
        xtype: 'container',
        flex: 10,
        layout: 'accordion',
        style: {
            // border: '2px solid #2989d8'
        },

        animate: true,
        defaults: {
            bodyStyle: {
                background: 'white'
            },
            layout: 'border'
        },
        items: [{
            xtype: 'alerts'
        },{
            xtype: 'dashboard'
        }]
    }]

});
