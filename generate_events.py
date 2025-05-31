# generate_events.py
from pymongo import MongoClient
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()
client = MongoClient('your_mongodb_connection_string')
db = client['faym']
collection = db['events']

event_types = ['view', 'click', 'location']
start_date = datetime(2025, 5, 1)
end_date = datetime(2025, 5, 29)

def generate_event():
    event_type = random.choice(event_types)
    user_id = fake.uuid4()
    timestamp = fake.date_time_between(start_date=start_date, end_date=end_date)
    payload = {}

    if event_type == 'view':
        payload = {
            'url': fake.url(),
            'title': fake.sentence(),
        }
    elif event_type == 'click':
        payload = {
            'element_id': fake.uuid4(),
            'text': fake.word(),
            'xpath': fake.uri_path(),
        }
    elif event_type == 'location':
        payload = {
            'latitude': fake.latitude(),
            'longitude': fake.longitude(),
            'accuracy': random.uniform(5.0, 100.0),
        }

    return {
        'user_id': user_id,
        'event_type': event_type,
        'timestamp': timestamp,
        'payload': payload,
    }

# Generate and insert events
events = [generate_event() for _ in range(5000)]
collection.insert_many(events)
print("Synthetic events inserted successfully.")
