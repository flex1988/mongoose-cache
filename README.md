
[![Build Status](https://travis-ci.org/flex1988/mongoose-cache.svg?branch=master)](https://travis-ci.org/flex1988/mongoose-cache)

## Usage

    var mongoose = require('mongoose');
    var cache = require('mongoose-cache');
    cache(mongoose,{expire: 900000,host:'127.0.0.1',port:6379});

## Notice

- Compatible only with ES6 and koa,yield a query and end it with exec.
- All querys defaultly stored in redis.
- If config is not set, the expire time is 15 minutes and redis store is localhost: 6379.
- The node environment is strictly limit to 0.12.x or higher.

## Example

### Enable cache
    var UserSchema = new Schema({
        name: {
            type: string
        },
        age: {
            type: int
        }
    });

    var User=mongoose.model('User',UserSchema);

    var users=yield User.find().cache().exec();

    use cache function to enable cacheing.

    Then users have been stored in redis,any other querys for users will return cached object in redis if the expire time is not exceed.

### Delete cache
    
    User.find().delcache();

    query for users will be deleted,next query will come from mongodb.

