/**
 * Created by yevgeniy.stebletsov on 29.06.2016.
 */
Ext.define('App.view.dashboard.DashboardDataGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'datagrid',
    maxHeight: 400,
    flex: 1,

    requires: [
        'App.utils.Formatter'
    ],

    header: {
        style: {
            background: '#e4e8eb'
        },
        height: 50,
        padding: '3px 13px 3px 10px',
        title: {
            style: {
                fontWeight: 'bold',
                color: '#404040'
            }
        }
    },

    cls: 'card',
    margin: '0 0 10px 0',
    layout: 'card',

    tools:[{
        xtype: 'segmentedbutton',
        allowMultiple: false,
        scale: 'small',
        cls: 'data-type-switcher',
        style: {
            borderRadius: '5px',
            margin: '0 0 10px 0'
        },
        items: [{
            text: 'Grid',
            pressed: true,
            value: 'grid',
            style: {
                borderBottomLeftRadius: 'inherit',
                borderTopLeftRadius: 'inherit'
            }
        }, {
            text: 'Chart',
            value: 'chart',
            style: {
                borderBottomRightRadius: 'inherit',
                borderTopRightRadius: 'inherit'
            }
        }],
        listeners: {
            change: 'onWidgetTypeChange'
        }
    }],

    items: [{
        xtype: 'grid',
        formatMap: {
            "__GLOBAL__": "0,0"
        },

        columns: [{
            dataIndex: '-',
            header: 'Game'
        }],

        emptyText: 'No data found.',

        store: {
            proxy: {
                type: 'memory'
            }
        },
        generateGrid: function(response){
            var data = response['data'];
            var meta = response['meta'];
            var formatedData = [];

            for(var index in data){
                formatedData.push(data[index]);
            }

            var columns = [{
                header: 'Game',
                minWidth: 200,
                flex: 1,
                dataIndex: 'dimension'
            }]
            for(var index in meta['columnNames']){
                var row = {
                    header: meta['columnNames'][index],
                    meta: meta,
                    minWidth: 100,
                    align: 'center',
                    flex: 1,
                    renderer: this.columnRenderer,
                    scope: this,
                    dataIndex: meta['columnNames'][index]
                };
                columns.push(row);
            }
            this.columns = columns;
            this.getStore().loadData(formatedData);
            this.reconfigure(undefined, columns);
            if(this.up().ratings){
                setTimeout(function(){
                    Environment.rateItRender();
                }, 1);
            }
        },

        columnRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var column = this.columns[colIndex];
            if(value == 0 || !value){
                return  '-';
            }
            if(this.up().ratings) {
                return '<div class="rateit" data-rateit-value="' + value + '" data-rateit-ispreset="true" data-rateit-readonly="true"></div>'
            }
            value = Formatter.format(this.formatMap, value);
            if(this.up().installs || this.up().crashes){
                var gameName = record.get('dimension');
                var columnName = column['dataIndex'];
                var metaDiff = column['meta']['difference'];
                var diff = null;

                if(metaDiff[columnName][gameName]){
                    diff = metaDiff[columnName][gameName];
                }

                var link = !Environment.isProductionServer() ? '/resources/images/' + diff + '.png' : './app/alerts/resources/images/' + diff + '.png';
                var img = diff ? ' ' + '<span style="position: absolute; right: 8px;"><img src="' + link + '" /></span>'  : '';

                return value + img;
            }

            return value;
        }
    },{
        xtype: 'chartholder'
    }]

});