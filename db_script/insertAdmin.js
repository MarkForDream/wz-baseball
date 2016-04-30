conn = new Mongo();
db = conn.getDB("wz_baseball");
db.user.insert({
    "_id": ObjectId("56b0ce7a29a9518f5b622051"),
    "updated_at": ISODate("2016-01-15T12:00:00.555Z"),
    "created_at": ISODate("2016-01-01T12:00:00.555Z"),
    "name": "Yin",
    "email": "insideout.tw@gmail.com",
    "password": "$2a$08$eR0qs2TOLFTviHkT2mRTg.4RCq9Jim2VD.HIyWcWvw79wBRQcNipy",
    "__v": 1
});

db.user.insert({
    "_id": ObjectId("56b0ce7a29a9518f5b622052"),
    "updated_at": ISODate("2016-01-15T12:00:00.555Z"),
    "created_at": ISODate("2016-01-01T12:00:00.555Z"),
    "name": "Lava",
    "email": "lava@mail.com",
    "password": "$2a$08$wYK/ukftVur4n/RWHUglTuWyvsuukIDQW8oL.w4yvZZzg9LykkJ12",
    "__v": 1
});
