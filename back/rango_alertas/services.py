import json
import os

#CONFIG_FILE = "../config.json"
CONFIG_FILE = os.path.join(os.path.dirname(__file__), "../../config.json")


def load_config():
    with open(CONFIG_FILE, "r") as file:
        return json.load(file)

def update_config(new_config: dict):
    with open(CONFIG_FILE, "w") as file:
        json.dump(new_config, file, indent=4)
