/**
 * Created by yevgeniy.stebletsov on 08.07.2016.
 */
Ext.define('App.view.contacts.CantactsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.contacts',

    onSendFeedbackClick: function(button){
        var win = button.up('window'),
            form = win.down('form'),
            values;

        if(form.isValid()){
            values = form.getValues();

            this.sendMail(values.subject, values.body, win);
        }
    },

    sendMail: function(subject, body, win){
        var message = body;

        win.setLoading(true);
        message = this.replaceAll(message, '"', "'");
        message = this.replaceAll(message, '\n', " ");
        message = this.replaceAll(message, '0in', "0");

        Ext.Ajax.setUseDefaultXhrHeader(false);
        Ext.Ajax.request({
            url: Environment.wrapLink('index.php', {
                module: 'Modules_Json_AlertsDashboard',
                noheader: 1,
                development: +Environment.isDevelopment(),
                action: 'sendMail'
            }),
            params: {
                data: Ext.JSON.encode({subject: subject, message: message})
            },
            success: function(response){
                win.setLoading(false);
                win.close();
            },
            failure: function(){
                Ext.Msg.show({
                    title : 'Error',
                    modal : true,
                    buttons: Ext.MessageBox.OK,
                    msg : 'Error',
                    icon : Ext.MessageBox.ERROR
                });
            }
        });
    },

    replaceAll: function(allStr, string, reqex ){
        for(;;){
            if(allStr.indexOf(string) != -1){
                allStr = allStr.replace(string, reqex);
            }else{
                break;
            }
        }
        return allStr;
    }


});
