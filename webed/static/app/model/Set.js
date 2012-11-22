Ext.define ('Webed.model.Set', {
    extend: 'Ext.data.Model',
    fields: ['root_uuid', 'uuid', 'name', 'size', 'mime'],

    proxy: {
        type: 'rest',
        url: '/node',
        reader: {
            type: 'json', root: 'results'
        }
    }
});