mongoose - cache is a cache module
for mongoose querys base on redis.


##Useage

    var mongoose = require('mongoose');
    var cache = require('mongoose-cache');
    cache(mongoose);

##Notice

- Compatible only with ES6 and koa,
    yield a query and end it with exec.
- All querys have been defaultly stored in redis store.
- If config is not set, the expire time is 15 minutes and redis store is localhost: 6379.
- The node environment is strictly limit to 0.12.x or higher.

##Example

    var UserSchema = new Schema({
        name: {
            type: string
        },
        age: {
            type: int
        }
    });

    var User=mongoose.model('User',UserSchema);

    var users=yield User.find().exec();

users have been store in redis,any other querys for users will return cached object in redis if the expire time is not exceed.
