"""
client_schema_main.py - A script to execute some commands demonstrating MongoDB's client-side field-level encryption.
Note:
-----
Before running this script, first run "client_schema_create_key.py" to
configure a key in the database and to generate "key_bytes.bin"
and "json_schema.json".
"""

import os
from pathlib import Path

from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.errors import EncryptionError
from bson import json_util
from client_schema_create_key import get_connection_string


# Load the secret key from 'key_bytes.bin':
key_bin = Path("key_bytes.bin").read_bytes()

# Load the 'person' schema from "json_schema.json":
collection_schema = json_util.loads(Path("json_schema.json").read_text())

# Configure a single, local KMS provider, with the saved key:
kms_providers = {"local": {"key": key_bin}}

# Create a configuration for PyMongo, specifying the local key,
# the collection used for storing key data, and the json schema specifying
# field encryption:
fle_opts = AutoEncryptionOpts(
    kms_providers,
    "fle_demo.__keystore",
    schema_map={"Leafsaver.UserProfileEncrypted": collection_schema},
)

# Add a new document to the "people" collection, and then read it back out
# to demonstrate that the ssn field is automatically decrypted by PyMongo:
#
# with MongoClient(os.environ["MDB_URL"], auto_encryption_opts=fle_opts) as client:
with MongoClient(get_connection_string(), auto_encryption_opts=fle_opts) as client:
    client.Leafsaver.UserProfileEncrypted.delete_many({})
    client.Leafsaver.UserProfileEncrypted.insert_one(
        {
            "FirstName": "Bertie",
            "LastName": "Valentini",
            "email": "gilcum@ocufu.as",
            "MedicalRecordId": "3D@v[(p$1@2naqO(",
            "AccountId": "wX%%%ic6N%6IwD[n",
            "DOB": "1990/01/01",
            "Phone": "+16246922898",
            "address": {
                "number": 4703,
                "street": "Imamu Turnpike",
                "city": "Otmuof",
                "state": "CT",
                "zip": "24026",
                "location": {
                    "type": "Point",
                    "coordinates": [-72.03626,40.02663]
                }
            },
            "Insurance": {
                "ProviderName": "MEDICARE",
                "PolicyId": "f#%4PW8N$e"
            },
            "Devices": {
                "DeviceId": "Glucose1234"
            },
            "UserId": "61780e2968f275f84ec66f2c"
        }
    )
    print("Decrypted find() results: ")
    print(client.Leafsaver.UserProfileEncrypted.find_one())

# Connect to MongoDB, but this time without FLE configuration.
# This will print the document with ssn *still encrypted*:
# 
# with MongoClient(os.environ["MDB_URL"]) as client:
with MongoClient(get_connection_string()) as client:
    print("Encrypted find() results: ")
    print(client.Leafsaver.UserProfileEncrypted.find_one())

# The following demonstrates that if the ssn field is encrypted as
# "Random" it cannot be filtered:
try:
    # with MongoClient(os.environ["MDB_URL"], auto_encryption_opts=fle_opts) as client:
    with MongoClient(get_connection_string(), auto_encryption_opts=fle_opts) as client:
        print("Find by Medical Profile ID: ")
        print(client.Leafsaver.UserProfileEncrypted.find_one({"MedicalRecordId": "3D@v[(p$1@2naqO("}))
except EncryptionError as e:
    # This is expected if the field is "Random" but not if it's "Deterministic"
    print(e)

# Configure encryption options with the same key, but *without* a schema:
fle_opts_no_schema = AutoEncryptionOpts(
    kms_providers,
    "fle_demo.__keystore",
)
# with MongoClient(
#     os.environ["MDB_URL"], auto_encryption_opts=fle_opts_no_schema
# ) as client:
with MongoClient(
    get_connection_string(), auto_encryption_opts=fle_opts_no_schema
) as client:
    print("Inserting Thomas Moreau, without configured schema.")
    # This will insert a document *without* encrypted Medical Profile ID, because
    # no schema is specified in the client or server:
    client.Leafsaver.UserProfileEncrypted.insert_one(
        {
            "firstName": "Thomas",
            "lastName": "Moreau",
            "MedicalRecordId": "987-98-9876",
        }
    )

# Connect without FLE configuration to show that Bertie Valentini is
# encrypted, but Thomas Moreau has his Medical Record ID saved as plaintext.
#
# with MongoClient(os.environ["MDB_URL"]) as client:
with MongoClient(get_connection_string()) as client:
    print("Encrypted find() results: ")
    for doc in client.Leafsaver.UserProfileEncrypted.find():
        print(" *", doc)