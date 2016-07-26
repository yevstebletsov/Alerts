/**
 * This view is an example list of people.
 */
Ext.define('App.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'App.store.Personnel',
        'App.store.Alerts'
    ],

    title: 'Personnel',

    store: {
        type: 'alerts'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
