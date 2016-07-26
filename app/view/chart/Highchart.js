Ext.define('App.view.chart.Highchart', {
    extend: 'Ext.Component',
    xtype: 'highchart',
	
    /**
	 * @cfg store
	 */

    /**
	 * @property {Highcharts.Chart} chart
	 * @private
	 */

    dataType: 'evolution',

    /**
     * types:
     * - bar
     * - column
     * - area
     * - pie
     */
    type: 'line',
    dimensionTitle: 'Series',
    metricTitle: null,
    title: '',
    isDirty: true,
    disableEventsBars: false,

    eventStore: null,

    chartProperties: {
        'evolution': {
            xAxis: {
                id: 'x-axis-evo',
                type: 'datetime',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e. %b',
                week: '%e. %b',
                month: '%b \'%y',
                year: '%Y',
                title: {
                    text: null
                }
                
            },
            yAxis: {
                id: 'y-axis'
            },
            tooltip: {
                useHTML: true,
                formatter: function() {
                    return this.series.name + '<br />' + this.point.dateName +': '+ this.point.formatValue;
                }
            }
        }
    },

    setType: function(type) {
        this.type = type;
        this.isDirty = true;
    },

    initComponent: function(config) {
        this.on({
            resize: this.onResize,
            scope: this
        });

        if(App.store.Events) {
            //yes this's bad place to put it, but I have only few hours to make events rendering =(
            this.eventStore = Ext.getStore('Events');
        }

        this.callParent(config);
    },

    onResize: function(width, height) {
        var chart = this.chart;
        if(chart) {
            chart.setSize(width, height, false);
        }
    },

    cleanChart: function() {
        var chart = this.insureInChartExisting();

        if(this.$_tempData) {
            delete this.$_tempData;
        }

        for (var i = chart.series.length - 1; i >= 0; i--) {
            var series = chart.series[i];
            series.remove(false);
        }
    },

    assignHighChartTypeProperties: function(config) {
        var highChartType = this.highChartType;
        config.chart['type'] = this.type;
        return Ext.apply(config, this.chartProperties[highChartType]);
    },

    insureInChartExisting: function() {
        if(this.isDirty) {
            var el = this.getEl(),
            config = {
                chart: {
                    renderTo: el.dom
                },
                animation: false,
                legend: {
                    width: 200,
                    align: 'right',
                    verticalAlign: 'middle'
                },
                tooltip: {
                    useHTML: true,
                    formatter: function() {
                        var seriesName = '';
                        if(this.point){
                            if(this.point.name){
                                seriesName = ', ' + this.point.name;
                            }
                        }
                        return (this.x || this.point.x) + seriesName +': '+ (this.point.formatValue || this.point.y);
                    }
                },
                width: this.getWidth(),
                height: this.getHeight()
            };

            this.chart = new Highcharts.Chart(this.assignHighChartTypeProperties(config));

            this.isDirty = false;
        }
        return this.chart;
    },

    refresh: function(store) {
        if(!this.store) {
            this.store = store;
        }
        try {
            this.drawChart();
        } catch(e) {
            this.isDirty = true;
            throw e;
        }
    },

    registerHighChartType: function(newValue) {
        var oldChartType = this.highChartType;

        if(oldChartType !== newValue) {
            this.isDirty = true;
            this.highChartType = newValue;
            if(this.chart) {
                this.chart.destroy()
            }
            this.insureInChartExisting();
            if(this.$_tempData) {
                delete this.$_tempData;
            }
        } else {
            this.cleanChart();
        }
    },

    drawChart: function() {
        this.registerHighChartType('evolution');
        this.updateEvolutionSeries();
        this.updateYAxis();

        
        this.chart.setTitle({
            text: this.title
        });

        this.chart.redraw();
    },

    updateYAxis: function() {
        var chart = this.chart,
        yAxis = chart.get('y-axis'),
        metricTitle = this.metricTitle;

        yAxis.setTitle({
            text: metricTitle
        }, false);
    },

    updateEvolutionSeries: function() {
        var store = this.store,
        chart = this.chart;

        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);

            chart.addSeries({
                name: record.get('dimension'),
                pointInterval: 24 * 3600 * 1000,
                type: this.type,
                visible: i < 4,
                data: record.get('data'),
                color: this.getColor(i)
            }, false);
        }
    },

    getColor: function(index){
        if(!this.defaultColors[index]){
            return null;
        }
        return this.defaultColors[index];
    },

    defaultColors: [
        '#4572A6',
        '#A94643',
        '#88A44E',
        '#7F699A'
    ]
});