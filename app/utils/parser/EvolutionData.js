Ext.define('App.util.parser.EvolutionData', {

    singleton: true,

    parse: function(gridStore, chartStore, options) {
        this.regularFillStore(gridStore, chartStore, options);
    },


    regularFillStore: function(gridStore, chartStore, options) {
        var rows = gridStore.collect('dimension'),
            chartData = [],
            evolutionRe = /^(\d{4})-(\d{2})-(\d{2})$/i,
            evoColumns = [];

        gridStore.getRange().forEach(function(it){
            var data = it.getData();
            for(var index in data){
                if(index != 'dimension' && index != 'id'){
                    if(!Ext.Array.contains(evoColumns, index)){
                        Ext.Array.push(evoColumns, index);
                    }
                }
            }
        });
        evoColumns.sort();
        for (var rowIndex in rows) {
            //decrease speed of selecting because someone specify like case insensitive rows
            //so let's thanks for that misterios guys, now our performance will ne lower
            var rowId = rows[rowIndex],
            record = gridStore.findRecord('dimension', rowId, 0, false, false, true),
            dimensionName = '',
            chartEntity = {
            },
            entityData = [];
            

            if(record) {
                dimensionName = record.get('dimension');
                chartEntity['id'] = dimensionName;
                chartEntity['dimension'] = dimensionName;

                //In Highcharts order of data is very important
                for (var i = evoColumns.length - 1; i >= 0; i--) {
                    var evoColumn = evoColumns[i],
                    value = record.get(evoColumn),
                    dateEvoStruc = evolutionRe.exec(evoColumn);
                    
                    
                    entityData.push({
                        dateName: evoColumn,
                        x: Date.UTC(+dateEvoStruc[1],  (+dateEvoStruc[2]) - 1, +dateEvoStruc[3]),
                        y: value == 0 ? null : parseFloat(value),
                        formatValue: Formatter.format({"__GLOBAL__": "0,0.0"}, value,evoColumn,  rowId)
                    });
                }

                chartEntity['data'] = entityData;

                chartData.push(chartEntity);
            }
        }
        chartStore.loadData(chartData);
    }
    


});