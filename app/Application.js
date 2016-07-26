/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    
    name: 'App',

    requires: [
        'Ext.container.Viewport',
        'App.view.contacts.ContactUsWindow'
    ],

    models: [
        'Alerts'
    ],

    stores: [
        // TODO: add global / shared stores here
        'Alerts',
        'Countries',
        'Crashes',
        'Installs',
        'Ratings',
        'Games'
    ],

    launch: function () {
        // TODO - Launch the application
        this.stayOnline();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    stayOnline : function() {
        Ext.TaskManager.start({
            run: function(){
                Ext.Ajax.request({
                    url : 'https://fbstat.mdc.gameloft.org/Tdw/index.php',
                    method : 'GET'
                })
            },
            interval: 1000 * 60 * 9 //9 minutes
        })
    }
});
