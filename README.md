# mongoose-cache

####mongoose-cache is a cache module for mongoose querys base on redis.The node environment is strictly limit to 0.12.x or higher.


##Useage

    var mongoose=require('mongoose');
    var cache=require('mongoose-cache');
    cache(mongoose);

##Notice
1. all querys must end with exec,and querys has defaultly been cached to redis store.
2. If config is not set,the expire time is 15 minutes and redis store is localhost:6379.
