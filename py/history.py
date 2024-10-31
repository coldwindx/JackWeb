import json
import random
import time
from datetime import datetime

users = json.load(open("./src/data/pages/users-db.json", "r", encoding="utf8"))

history = []
esindexs = ["kd2e194259106bca3b42dc8690d340b59", "kd5fee0c6f1d0d730de259c64e6373a0c", "kdeebbea18401e8b5e83c410c6d3a8b4e",
            "ke068ee33b5e9cb317c1af7cecc1bacb5", "ke1e41506da591e55cee1825494ac8f42", "ke29f7f907c96782adbf18d790086ec08", 
            "ke3b3e285390c0e2f7d04bd040bec790d", "ke3b7d39be5e821b59636d0fe7c2944cc", "ke3dd1eb73e602ea95ad3e325d846d37c"]

def strTimeProp(start, end, prop, frmt):
    stime = time.mktime(time.strptime(start, frmt))
    etime = time.mktime(time.strptime(end, frmt))
    ptime = stime + prop * (etime - stime)
    return int(ptime)
 
def randomTimestamp(start, end, frmt='%Y-%m-%d %H:%M:%S'):
    return strTimeProp(start, end, random.random(), frmt)
 
def randomDate(start, end, frmt='%Y-%m-%d %H:%M:%S'):
    return time.strftime(frmt, time.localtime(strTimeProp(start, end, random.random(), frmt)))
 
def randomTimestampList(start, end, n, frmt='%Y-%m-%d %H:%M:%S'):
    return [randomTimestamp(start, end, frmt) for _ in xrange(n)]
 
def randomDateList(start, end, n, frmt='%Y-%m-%d %H:%M:%S'):
    return [randomDate(start, end, frmt) for _ in xrange(n)]
 
start = '2024-10-02 12:12:12'
end = '2024-10-15 00:00:00'


for i in range(20):
    user = random.choice(users)
    history.append({
        "id": i + 1,
        "esindex": random.choice(esindexs),
        "username": user["username"],
        "email": user["email"],
        "timestamp": randomTimestamp(start, end) * 1000 + random.choice(range(0, 1000)),
        "status": random.choice(range(0, 1))
    })

json.dump(history, open("./src/data/pages/history-db.json", "w", encoding="utf8"))