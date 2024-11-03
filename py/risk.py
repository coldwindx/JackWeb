import json
import random
import time
from datetime import datetime

risks = []

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


txt = """
4544:WanaCry.exe--->608(1):attrib +h .
4544:WanaCry.exe--->4172(1):icacls . /grant Everyone:F /T /C /Q
4172:icacls.exe--->1624(1):\\??\\C:\\Windows\\system32\\conhost.exe 0xffffffff
4544:WanaCry.exe--->4540(1):taskdl.exe
4544:WanaCry.exe--->4140(1):C:\\Windows\\system32\\cmd.exe /c 4501705282403.bat
4140:cmd.exe--->4128(1):\\??\\C:\\Windows\\system32\\conhost.exe 0xffffffff
600:svchost.exe--->1968(0):C:\\Windows\\system32\\DllHost.exe /Processid:{AB8902B4-09CA-4BB6-B78D-A8F59079A8D5}
4544:WanaCry.exe--->3428(1):@WanaDecryptor@.exe co
4544:WanaCry.exe--->4328(1):cmd.exe /c start /b @WanaDecryptor@.exe vs
4328:cmd.exe--->4596(1):\\??\\C:\\Windows\\system32\\conhost.exe 0xffffffff
4328:cmd.exe--->4608(1):@WanaDecryptor@.exe  vs
3428:@WanaDecryptor@.exe--->4572(1):TaskData\\Tor\\taskhsvc.exe
4572:taskhsvc.exe--->2988(1):\\??\\C:\\Windows\\system32\\conhost.exe 0xffffffff
892:unknown--->1964(0):\\??\\C:\\Windows\\system32\\conhost.exe 0xffffffff
4608:@WanaDecryptor@.exe--->892(0):cmd.exe /c vssadmin delete shadows /all /quiet & wmic shadowcopy delete & bcdedit /set {default} bootstatuspolicy ignoreallfailures & bcdedit /set {default} recoveryenabled no & wbadmin delete catalog -quiet
892:cmd.exe--->4664(0):vssadmin  delete shadows /all /quiet 
516:services.exe--->4332(0):C:\\Windows\\system32\\vssvc.exe
892:cmd.exe--->1920(0):wmic  shadowcopy delete 
600:svchost.exe--->2440(0):C:\\Windows\\sysWOW64\\wbem\\wmiprvse.exe -secured -Embedding
"""

time = randomTimestamp(start, end) * 1000

for line in txt.split('\n'):
    if 0 == len(line): continue
    process, obj = line.split("--->", 1)
    pid, pname = process.split(":", 1)
    objname = obj.split(":", 1)[1]
    time = time + random.choice(range(0, 1000))

    risks.append({
        "pid": int(pid),
        "pname": pname,
        "event": "ProcessStart",
        "object": objname,
        "timestamp": time
    })

json.dump(risks, open("./src/data/pages/risk-db.json", "w", encoding="utf8"))