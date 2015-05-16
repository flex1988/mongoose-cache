'use strict';

var redis = require('redis');
var _ = require('underscore');

function cache(mongoose, opts) {
    var exec = mongoose.Query.prototype.exec;
    var opts = opts || {
        expire: 15 * 60 * 1000,
        host: 'localhost',
        port: 6379
    };
    var redisClient = redis.createClient(opts.port, opts.host);
    var cacheList = {};
    var execCache = function() {
        var key = JSON.stringify({
            modelnName: this.model.modelName,
            contidions: this._conditions
        });
        var me = this;
        var params = arguments;
        return new Promise(function(resolve, reject) {
            if (me.__cache && cacheList[key] && ((new Date).getTime() - cacheList[key].expire < opts.expire)) {
                redisClient.get(key, function(err, val) {
                    if (val) {
                        var res = JSON.parse(val);
                        if (Array.isArray(res)) {
                            _.each(res, function(item) {
                                item.__proto__ = cacheList[key].proto;
                            });
                        } else {
                            res.__proto__ = cacheList[key].proto;
                        }
                        return resolve(res);
                    } else if (err) {
                        return reject(err);
                    }
                });
            } else if (me.__cache) {
                return exec.call(me, function(err, val) {
                    if (err)
                        reject(err);
                    redisClient.set(key, JSON.stringify(val));
                    cacheList[key] = {};
                    cacheList[key].expire = (new Date).getTime();
                    cacheList[key].proto = Array.isArray(val) ? val[0].__proto__ : val.__proto__;
                    resolve(val);
                });
            } else {
                return exec.call(me, function(err, val) {
                    if (err)
                        reject(err);
                    resolve(val);
                });
            }

        });
    }

    var cache = function() {
        this.__cache = true;
        return this;
    }

    mongoose.Query.prototype.exec = execCache;
    mongoose.Query.prototype.cache = cache;
}

exports = module.exports = cache;

