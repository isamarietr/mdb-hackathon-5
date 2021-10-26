# Pre-requisites
1. Create a file called `settings.py` in the root of this directory and include your MongoDB connection string, such as:

2. DB_NAME = 'Your_DB_Name'
   COLLECTION_NAME = 'You_Collection_Name'
   COLLECTION_TS_NAME = 'You_Collection_TS_Name'
   CLUSTER_URL = 'YOUR_CLUSTER_URI'

3. Run scripts to simulate different users/devices for IoT_Data Collection: ReadGlugose1.py, ReadHeartRate1.py, ReadTemp1.py.

4. Run scripts to simulate  different users/devices for IoT_TS_Data Collection: ReadGlugoseTS1.py, ReadHeartTS1.py, ReadTempTS1.py. 
5. Run script to create UserProfile Collection:
   mgeneratejs UserProfile.json -n 5 | mongoimport --uri "mongodb+srv://user:pswd@leafie.lkxsd.mongodb.net/Leafsaver?retryWrites=true" --collection UserProfile
   
6. Run script to create KB_Articles Collection:
   mgeneratejs KB_Articles.json -n 5 | mongoimport --uri "mongodb+srv://ctselebis:ctselebis@leafie.lkxsd.mongodb.net/Leafsaver?retryWrites=true" --collection KB_Articles




