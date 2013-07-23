SecMessage.Observable = function (object) {
    var $observable = object || {};

    $observable._listeners = {};
    $observable.on = function (eventName, callback) {
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }

        this._listeners[eventName].push(callback);
    }

    $observable.dispatchEvent = function (eventName, param) {
        if (this._listeners[eventName]) {
            jQuery(this._listeners[eventName]).each(function (index, callback) {
                callback(param);
            });
        }
    };

    return $observable;
}