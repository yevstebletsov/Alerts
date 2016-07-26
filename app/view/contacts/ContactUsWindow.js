/**
 * Created by yevgeniy.stebletsov on 08.07.2016.
 */
Ext.define('App.view.contacts.ContactUsWindow', {
    extend : 'Ext.window.Window',
    alias : 'widget.contactus',

    modal : true,
    autoShow : true,
    resizable : false,

    width : 600,
    layout : 'fit',

    header: {
        style: {
            background: '#6a73bc',
            borderColor: '#6a73bc'
        },
        title: {
            style: {
                fontWeight: 'bold',
                color: 'whitesmoke'
            },
            text : 'Contact us'
        }
    },

    style: {
        border: '1px solid #6a73bc'
    },

    requires: [
        'App.view.contacts.CantactsController',
        'Ext.form.field.HtmlEditor'
    ],

    controller: 'contacts',

    items : [{
        xtype : 'form',
        defaults : {
            anchor : '100%',
            labelWidth: 70,
            style: {
                margin: '0 0 3px 12px'
            },
            allowBlank: false
        },
        bodyPadding : 5,
        items :[{
            xtype: 'textfield',
            name: 'subject',
            fieldLabel: 'Subject'
        },{
            xtype : 'htmleditor',
            fieldLabel : 'Body',
            grow : true,
            name : 'body',
            height: 250
        }],
        buttons : [
            {
                text: 'Send',
                handler: 'onSendFeedbackClick'
            },
            {
                text: 'Cancel',
                handler: function(){
                    this.up('window').close();
                }
            }
        ]
    }]
})