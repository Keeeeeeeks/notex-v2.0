describe ('PropertyController', function () {
    Ext.require('Webed.controller.Property');

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    var controller = null, lock = create_lock ();

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    beforeEach (function () {
        if (!controller) controller = window.app.getController ('Property');
        expect (controller).toBeTruthy (); controller.init ();

        var MIMEs = window.app.getStore ('MIMEs');
        expect (MIMEs).toBeTruthy ();
        MIMEs.load ({scope: this, callback: function (recs, op, success) {
            expect (success).toBeTruthy ();
        }});
    });

    afterEach (function () {
        controller = null;

        lock.init ([true]); Ext.Ajax.request ({
            url: '/refresh/', callback: function (opt, success, xhr) {
                expect (success).toBeTruthy (); lock.pop ();
            }
        });

        waitsFor (function () { return lock.empty (); }, 'unlock');
    });

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    it ('should set properties', function () {
        var nodes = window.app.getStore ('Nodes');
        expect (nodes).toBeTruthy ();
        nodes.loadLock.clear ();
        expect (nodes.loadLock.empty ()).toBeTruthy ();

        lock.init ([true, true]); // ensure callback verification!
        expect (lock.empty ()).toBeFalsy ();

        nodes.load ({scope: this, callback: function (records, op, success) {
            expect (records).toBeTruthy ();
            expect (records.length).toBeGreaterThan (0);

            var node = records[0];
            expect (node).toBeTruthy ();
            var uuid = node.get ('uuid');
            expect (uuid).toBeTruthy ();

            window.app.fireEvent ('set_property', this, {
                scope: this, callback: on_set, property: [{
                    node_uuid: uuid,
                    name: 'flag',
                    data: '....',
                    size: 4,
                    mime: 'plain/text',
                    type: 'StringProperty'
                },{
                    node_uuid: uuid,
                    name: 'flag',
                    data: '....',
                    size: 4,
                    mime: 'plain/text',
                    type: 'StringProperty'
                }]
            });

            function on_set (prop, op, index) {
                expect (prop).toBeTruthy ();
                expect (prop.get ('node_uuid')).toEqual (uuid);
                expect (prop.get ('name')).toEqual ('flag');
                expect (prop.get ('data')).toEqual ('....');
                expect (prop.get ('size')).toEqual (4);
                expect (prop.get ('mime')).toEqual ('plain/text');
                expect (prop.get ('type')).toEqual ('StringProperty');
                expect (op).toBeTruthy ();
                expect (op.success).toBeTruthy ();
                expect (index).toBeGreaterThan (-1);
                lock.pop ();
            }
        }});

        waitsFor (function () { return lock.empty (); }, 'unlock');
    });

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    it ('should get properties', function () {
        var properties = window.app.getStore ('Properties');
        expect (properties).toBeTruthy ();
        properties.loadLock.clear ();
        expect (properties.loadLock.empty ()).toBeTruthy ();

        lock.init ([true, true]); // ensure callback verification!
        expect (lock.empty ()).toBeFalsy ();

        properties.load ({scope: this, callback: function (records) {
            expect (records).toBeTruthy ();
            expect (records.length).toBeGreaterThan (0);

            window.app.fireEvent ('get_property', this, {
                scope: this, callback: on_get, property: [{
                    name: 'data'
                },{
                    name: 'data'
                }]
            });

            function on_get (props, index) {
                expect (props).toBeTruthy ();
                expect (props.length).toBeGreaterThan (0);
                expect (props[0]).not.toBeUndefined ();
                expect (props[0].get ('name')).toEqual ('data');
                expect (props[0].get ('size')).toBeGreaterThan (-1);
                expect (index).toBeGreaterThan (-1);
                lock.pop ();
            }
        }});

        waitsFor (function () { return lock.empty (); }, 'unlock');
    });

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
});
