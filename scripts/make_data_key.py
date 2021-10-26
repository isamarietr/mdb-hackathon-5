import base64
from uuid import UUID
from csfle import read_master_key, write_data_key, read_data_key, get_connection_string, CsfleHelper


def main():

    local_master_key = read_master_key()

    kms_provider = {
        "local": {
            "key": local_master_key
        },
    }

    print("Testing connection string")
    print(get_connection_string())

    csfle_helper = CsfleHelper(kms_provider=kms_provider)
    binary_data_key = csfle_helper.find_or_create_data_key()
    data_key = base64.b64encode(binary_data_key).decode("utf-8")
    write_data_key(data_key)

    print("The Base64 version of the data key is", data_key)
    print("Copy and paste this into your application when setting up the encrypted client.")
    print("A copy has been saved to data-key.txt file for future use.")
    # print(read_data_key().decode("utf-8"))


if __name__ == "__main__":
    main()
