from locust import HttpUser, task, between
import random

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def index_page(self):
        self.client.get(f'go/write/?input={random.randint(1, 100)}')