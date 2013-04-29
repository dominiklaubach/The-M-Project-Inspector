var getProperties = function() {
    var copy = {};
    if( M && $0 && $0.id ) {
        var obj = M.ViewManager.getViewById($0.id);
        if( obj ) {
            var props = Object.getOwnPropertyNames(obj);
            for( var i = 0; i < props.length; ++i ) {
                copy[props[i]] = obj[props[i]];
            }
        }
    }

    return copy;
};

chrome.devtools.panels.elements.createSidebarPane("The-M-Project", function( sidebar ) {
    function updateProperties() {
        sidebar.setExpression("(" + getProperties.toString() + ")()");
    }

    updateProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateProperties);
});