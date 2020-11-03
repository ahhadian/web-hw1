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

## Usage
For each API, there is a python file. In roder to load test go-write, run:

```
locust -f go-write.py
```

Then go to http://127.0.0.1:8089/ and enter number of users and host to see the result.

## Resluts
The results for 500 user and 100 spawn rate are available:

go-write:

![](https://github.com/ahhadian/web-hw1/blob/master/locust/results/gowrite.png)

nodejs-write:

![](https://github.com/ahhadian/web-hw1/blob/master/locust/results/nodewrite.png)

go-sha256:

![](https://github.com/ahhadian/web-hw1/blob/master/locust/results/gosha.png)

node-sha256:

![](https://github.com/ahhadian/web-hw1/blob/master/locust/results/nodesha.png)

