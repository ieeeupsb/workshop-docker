import requests
import time

from sys import argv
from bs4 import BeautifulSoup

def processText(txt):
    res = list()
    soup = BeautifulSoup(txt, 'html.parser')
    predictions = soup.select(".even")

    for prediction in predictions:
        res.append((prediction.findChildren()[3].text, prediction.findChildren()[5].text, prediction.findChildren()[6].text))
    
    return res


stop = argv[1] if len(argv) >= 2 else input("Stop code? ")

while True:
    res = requests.get("http://www.stcp.pt/pt/itinerarium/soapclient.php?codigo="+stop)
    if res.status_code == 200:
        arrivals = processText(res.text)
        print("\033[H\033[J")
        print("Code\t\tETA\t\tTime Remaining")
        for arrival in arrivals:
            print(arrival[0] + "\t\t" + arrival[1] + "\t\t" + arrival[2])
    else:
        print("Request failed with " + res.status_code)

    time.sleep(60)

    