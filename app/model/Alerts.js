/**
 * Created by yevgeniy.stebletsov on 28.06.2016.
 */
Ext.define('App.model.Alerts', {
    extend: 'Ext.data.Model',

    fields : [{
        name : 'date',
        type : 'string'
    },{
        name : 'date_formated',
        mapping: 'date',
        type : 'string',
        convert: function (date) {return Ext.Date.format(new Date(date), 'd M Y');}
    }]

});