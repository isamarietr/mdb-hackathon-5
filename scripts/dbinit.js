use Leafsaver
db.IoT_TS_Data.drop()

db.createCollection("IoT_TS_Data",
    {
        "timeseries" : {
            "timeField" : "DeviceDate",
            "metaField" : "meta",
            "granularity" : "seconds"
        },
        "storageEngine" : {
            "wiredTiger" : {
                "configString" : "block_compressor=zstd"
            }
        }
    }
)

db.IoT_TS_Data.createIndex({
    "meta.UserId" : 1,
    "meta.DeviceId" : 1,
    "DeviceDate" : 1,
})

// Example insert
//db.IoT_TS_Data.insertOne({ DeviceDate: ISODate("2021-05-20T10:24:51.303Z"), meta : { DeviceId: '1234', UserId: '61780e0cbc9c376267050bba'}, foo: "bar" })

print("======================")
print("Collection details:")
db.getCollectionInfos( { name: { $in:["IoT_TS_Data", "system.buckets.IoT_TS_Data"]}} )
print("======================")
print("Indexes:")
db.IoT_TS_Data.getIndexes()
