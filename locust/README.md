# Locust
## Installation
First you need to install locust using:

```
pip3 install locust
```

Validate your installation by:

```
locust -V
```

For each API, there is a python file. In roder to load test go-write, run:

```
locust -f go-write.py
```

Then go to http://127.0.0.1:8089/ and enter number of users and host to see the result.
