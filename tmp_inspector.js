var getProperties = function() {
    var copy = {};
    if( M && $0 && $0.id ) {
        var obj = M.ViewManager.getViewById($0.id);
        if( obj ) {
            var props = Object.getOwnPropertyNames(obj);
            for( var i = 0; i < props.length; ++i ) {
                if( props[i] !== '_name' ) {
                    copy[props[i]] = obj[props[i]];
                }
            }
        }
    }

    return copy;
};

var getDOMId = function() {
    if( M && $0 && $0.id ) {
        var obj = M.ViewManager.getViewById($0.id);
        if( obj ) {
            if( obj.type === 'M.PageView' ) {
                _.each(M.Application.pages, function( p, key ) {
                    if( obj.id === p.id ) {
                        obj._name = key;
                    }
                });
            }
            return {
                id: obj.id,
                title: obj._name
            };
        }
    }

    return null;
};

chrome.devtools.panels.elements.createSidebarPane("The-M-Project", function( sidebar ) {
    function updateProperties() {
        chrome.devtools.inspectedWindow.eval("(" + getDOMId.toString() + ")()", function( obj ) {
            var title = '';
            if( obj && obj.id ) {
                title = obj.title || obj.id;
            }
            sidebar.setExpression("(" + getProperties.toString() + ")()", title);
        });
    }

    updateProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateProperties);
});