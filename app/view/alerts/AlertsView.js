/**
 * Created by yevgeniy.stebletsov on 29.06.2016.
 */
Ext.define('App.view.alerts.AlertsView', {
    extend: 'Ext.view.View',
    xtype: 'alertssview',

    store: 'Alerts',

    itemSelector: 'div.card',

    emptyText: '<div class="no-events">No alerts found.</div>',

    autoScroll : true,
    cls : 'events-bookmarks',

    tpl : [
        '<tpl for=".">',
            '<tpl if="big == 1">',
            '<div class="card" style="cursor:pointer; margin: 0 10px 10px 5px;background-color:rgb(255, 244, 206);">',
            '</tpl>',
            '<tpl else if="big == 0">',
            '<div class="card" style="cursor:pointer; margin: 0 10px 10px 5px;">',
            '</tpl>',
                '<div style="position: absolute; height:112px; width: 10px; background-color: {color};"></div>',
                '<table style="padding: 15px 10px 10px 20px; font-size: 14px;">',
                    '<tr>',
                        '<td width="100px"><image style="width: 80px;" src="{image}" /></td>',
                        '<td width="200px"><b>{game}</b></td>',
                        '<td width="200px">{message}</td>',
                        '<td width="150px">{date_formated}</td>',
                        '<td>{country}</td>',
                        '<td  width="70px"></td>',
                        '<td  width="70px" style="position: absolute; right: 0;">',
                            '<tpl if="old == 0">',
                                '<div id="disableAlert" class="alert-action" >Dismiss</div>',
                            '</tpl>',
                            '<tpl else if="old == 2">',
                                '<div id="enableAlert" class="alert-action" >Activate</div>',
                            '</tpl>',
                        '</td>',
                    '</tr>',
                '</table>',


            '</div>',
        '</tpl>'
    ]
});