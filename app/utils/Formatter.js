Ext.define('App.utils.Formatter', {
    alternateClassName: 'Formatter',
    singleton: true,

    cachedFn: {},

    /**
     * Priorities for formats, ordered by desc
     */
    prios: [
        'important',
        'row',
        'column',
        '__GLOBAL__'
    ],

    //From now the most complicated formats will be supported, even HTML can be inserted
    //Note: if we will have HTML in format we need somehow parse it on server-side when making export
    applyFormat: function(format, value) {
        var formatRe = /^(.*?)(0+(?:,0+?)?(?:\.0+)?)(.*)$/,
            valueStruc = formatRe.exec(format);

        return valueStruc ? valueStruc[1] + Ext.util.Format.number(value, valueStruc[2]) + valueStruc[3] : '';
    },

    registerFormatter: function(format) {
        if(format !== null) {
            if(!this.cachedFn[format]) {
                var repairRe = /[^{]\{([^}]+)\}/ig,
                    exprParsed = 'return ' + format.replace(repairRe, '{ f: \'$1\' }') + ';';

                this.cachedFn[format] = new Function('value', 'column', 'row', exprParsed);
            }
            return this.cachedFn[format];
        }
        return null;
    },

    getCurrentFormat: function(computedFormats) {
        for (var i = 0; i < this.prios.length; i++) {
            var prio = this.prios[i];
            if(prio in computedFormats) {
                return computedFormats[prio];
            }
        }
        return null;
    },

    runFormat: function(format, value, column, row) {
        var formatFn = this.getFormula(format),
            registeredFormatFn = this.registerFormatter(formatFn),
            calculatedFormat;

        if(typeof registeredFormatFn == 'function') {
            calculatedFormat = registeredFormatFn(value, column, row);
            if(typeof calculatedFormat == 'object' && 'f' in calculatedFormat) {
                calculatedFormat = this.applyFormat(calculatedFormat.f, value);
            }
        } else {
            calculatedFormat = this.applyFormat(format, value);
        }

        return calculatedFormat || value;
    },

    computeFormat: function(formatMap, value, column, row) {
        var computedFormats = { '__GLOBAL__': formatMap['__GLOBAL__'] },
            currentFormat,
            calculatedFormat,
            formatFn,
            registeredFormatFn;

        for (var i in formatMap) {
            var field = formatMap[i];

            if(field['type'] == 'column' && field['name'] == column) {
                computedFormats[field['important'] ? 'important' : 'column'] = field['format'];
            } else if(field['type'] == 'row' && field['name'] == row) {
                computedFormats[field['important'] ? 'important' : 'row'] = field['format'];
            } else if(field['name'] == row) {
                computedFormats[field['important'] ? 'important' : 'row'] = field['format'];
            }
        }

        currentFormat = this.getCurrentFormat(computedFormats);
        formatFn = this.getFormula(currentFormat);
        registeredFormatFn = this.registerFormatter(formatFn);
        
        if(typeof registeredFormatFn == 'function') {
            calculatedFormat = registeredFormatFn(value, column, row);
            if(typeof calculatedFormat == 'object' && 'f' in calculatedFormat) {
                return calculatedFormat.f;
            }
        } else {
            return currentFormat;
        }
        
        return null;
    },

    format: function(formatMap, value, column, row) {
        
        var computedFormats = { '__GLOBAL__': formatMap['__GLOBAL__'] },
            currentFormat;

        // for (var i in formatMap) {
        //     var field = formatMap[i];
        //
        //     if(field['type'] == 'column' && field['name'] == column) {
        //         computedFormats[field['important'] ? 'important' : 'column'] = field['format'];
        //     } else if(field['type'] == 'row' && field['name'] == row) {
        //         computedFormats[field['important'] ? 'important' : 'row'] = field['format'];
        //     } else if(field['name'] == row) {
        //         computedFormats[field['important'] ? 'important' : 'row'] = field['format'];
        //     }
        // }

        currentFormat = this.getCurrentFormat(computedFormats);

        return this.runFormat(currentFormat, value, column, row);
    },

    getFormula: function(formula) {
        var formulaRe = /^{{(.+)}}$/,
            result = formulaRe.exec(formula);
        return result ? result[1] : null;
    }
});