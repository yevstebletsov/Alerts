/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('App.view.chart.ChartHolder',{
	extend: 'Ext.container.Container',
	xtype:'chartholder',
	
	requires: [
		'App.view.chart.Highchart',
        'App.util.parser.EvolutionData'
	],

    allowedTypes: {

        'line': {
            chartEngine: 'highchart',
            canBeUsedFor: 'evolution',
            parser: 'evolution'
        }
    },

    /**
     * @cfg {String} type available types
     * - area
     * - bar
     * - column
     * - line
     * - pie
     * - map
     */
    type: 'line',

    /**
     * Has affect only for bar and columns
     */
    dataSetSize: '20',

    /**
     * Store which will have data for showing
     */
    store: {
        fields: ['id'],
        proxy: {
            type: 'memory'
        }
    },

    isMedianHidden: true,

    style: {
        background: 'white'
    },

	layout: 'fit',
	
	items: [{
		xtype: 'highchart',
        width: '100%'
	}],


    initComponent: function(config) {
        this.store = Ext.create('Ext.data.Store', this.store);

        this.on({
            show: this.onComponentShow
        });

        this.callParent(config);
    },

    onComponentShow: function() {
        //if chart was hidden it wasn't rendered, so we need to draw chart
        this.refreshChart();
    },

    setType: function(type, weekOrientation) {
        if(type in this.allowedTypes) {
            var sets = this.getChartSets(type),
                highChart = this.down('highchart');

            this.type = type;
            highChart.setType(type);
            highChart.dataType = weekOrientation ? 'week' : sets.canBeUsedFor;
        } else {
            Ext.Error.raise('Chart error: Chart type "' + type + '" is not allowed');
        }
    },

    getType: function() {
        return this.type;
    },

    getChartSets: function(type) {
        var chosenType = type || this.type,
            highChart = this.down('highchart'),
            config = Ext.clone(this.allowedTypes[chosenType]);

        return config;
    },
    

    /**
     * should refresh chart
     */
    refreshChart: function() {
        //prevent of rendering if don't need it
        if(!this.isHidden()) {
            var chartSets = this.getChartSets(),
                card = this.down(chartSets.chartEngine),
                gridCmp = this.up().down('grid');
                store = this.store,
                parser = this.getParser('evolution');

            parser.parse(gridCmp.getStore(), store);

            //logic will be handled by engine
            card.refresh(store);
        }
    },

    getParser: function(name) {
        var nameStack = name.split('-'),
            fullParserName;

        for (var i = 0; i < nameStack.length; i++) {
            nameStack[i] = Ext.String.capitalize(nameStack[i]);
        }

        fullParserName = nameStack.join('') + 'Data';

        return App.util.parser[fullParserName];
    }
});

