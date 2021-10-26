from settings import COLLECTION_TS_NAME, DB_NAME, CLUSTER_URL
from faker import Faker
import pymongo
import random
import datetime
import time
import requests
import sys


fake = Faker()

connection = pymongo.MongoClient(CLUSTER_URL)
db = connection[DB_NAME]

while True:
    DeviceValue = random.randrange(50, 150)

    sensorDate = datetime.datetime.utcnow()
    
    document = { 'DeviceDate': sensorDate, 'meta' : { 'DeviceId': 'Heart1234', 'DeviceType': 'HeartRate Monitor', 'UserId': '61780e2968f275f84ec66f2c'}, 'value': DeviceValue }
    
    db.IoT_TS_Data.insert_one(document)
    
    time.sleep(10); 