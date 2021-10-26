from settings import COLLECTION_NAME
from faker import Faker
import pymongo
import random
import datetime
import time
import requests

fake = Faker()

while True:
    DeviceValue = fake.pydecimal(min_value=50, max_value=150, right_digits=2)

    sensorDate = datetime.datetime.now()
    data = "{\"meta\":{\"DeviceId\":\"Heart1234\", \"UserId\":\"61780e1d059bdc5f0e0f810e\", \"DeviceType\":\"HeartRate Monitor\"}, \"value\":" +str(DeviceValue) +", \"DeviceDate\":\"" + str(sensorDate) + "\"}"
    print(data)
    url = 'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/iot_data-nkiiw/service/IoT_Data/incoming_webhook/IoT_Data'
    headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
    response = requests.post(url, data=data, headers=headers )
    for x in response:
            print(x)

    time.sleep(10);   