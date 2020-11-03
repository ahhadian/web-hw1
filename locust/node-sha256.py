from locust import HttpUser, task, between
import random

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def index_page(self):
        self.client.post('nodejs/sha256',json={'number1': random.randint(0, 100), 'number2': random.randint(0, 200)},)
