Ext.define ('Webed.container.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',

    requires: [
        'Ext.layout.container.Border',
        'Webed.grid.LeafList',
        'Webed.statusbar.StatusBar',
        'Webed.tab.TabManager',
        'Webed.toolbar.MainToolbar',
        'Webed.tree.NodeTree'
    ],

    items: [{
        layout: 'border',
        items: [{
            border: false,
            collapsible: true,
            collapsed: true,
            flex: 1,
            minWidth: 281,
            name: 'projects',
            layout: 'border',
            region: 'west',
            split: true,
            title: '·····',

            tools: [{
                type: 'refresh',
                tooltip: '<p>Refresh</p>',
                action: 'node-tree:refresh'
            },{
                type: 'help',
                tooltip: '<div>Project Tree&nbsp;<div class="w-shortcut">[F9]</div></div>'
            }],

            listeners: {
                expand: function (self) { self.setTitle ('Projects'); },
                collapse: function (self) { self.setTitle ('·····'); }
            },

            items: [{
                flex: 1,
                region: 'center',
                xtype: 'node-tree'
            },{
                collapsible: true,
                collapseMode: 'header',
                flex: 1,
                name: 'documents',
                region: 'south',
                split: true,
                title: 'Documents',
                xtype: 'leaf-list',

                tools: [{
                    type: 'refresh',
                    tooltip: '<p>Refresh</p>',
                    action: 'leaf-list:refresh'
                },{
                    type: 'help',
                    tooltip: '<div>Document List&nbsp;<div class="w-shortcut">[F10]</div></div>'
                }]
            }]
        },{
            border: false,
            flex: 4,
            name: 'hbox',
            layout: {type: 'hbox', align: 'stretch'},
            region: 'center',
            style: {borderStyle: 'solid', borderWidth: '0 0 0 1px'},

            items: [{
                border: false,
                flex: 1,
                layout: {type: 'vbox', align: 'stretch'},
                name: 'vbox',

                items: [{
                    border: false,
                    flex: 1,
                    tabPosition: 'bottom',
                    xtype: 'tab-manager'
                }]
            }]
        }]
    }]
});