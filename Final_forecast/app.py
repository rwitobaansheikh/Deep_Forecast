from flask import Flask, render_template
from tensorflow import keras
from tensorflow.keras.models import model_from_json
import pandas as pd
import numpy as np 
#import seaborn as sns
#import matplotlib.pyplot as plt
import requests
from datetime import date, timedelta
json_file=open('model_json','r')
loaded_model_json=json_file.read()
json_file.close()
loaded_model=model_from_json(loaded_model_json)
app = Flask(__name__)

def model_run(model,data,day1):
    model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['accuracy'],
    )
    d=data.json()['data']
    windmph, precipinch = 2.237, 25.4
    temperature=[ i['temp'] for i in d]
    dewpoint=[ i['dewpt'] for i in d ]
    humidity=[ i['rh'] for i in d ]
    windspeed=[ i['wind_spd']*windmph for i in d ]
    pressure=[ i['pres'] for i in d ] 
    precipitation=[ i['precip']/precipinch for i in d ]
    cur_dat=[]

    cur_dat.append(max(temperature))
    cur_dat.append(sum(temperature)/len(d))
    cur_dat.append(min(temperature))

    cur_dat.append(max(dewpoint))
    cur_dat.append(sum(dewpoint)/len(d))
    cur_dat.append(min(dewpoint))

    cur_dat.append(max(humidity))
    cur_dat.append(sum(humidity)/len(d))
    cur_dat.append(min(humidity))

    cur_dat.append(max(windspeed))
    cur_dat.append(sum(windspeed)/len(d))
    cur_dat.append(min(windspeed))

    cur_dat.append(max(pressure))
    cur_dat.append(sum(pressure)/len(d))
    cur_dat.append(min(pressure))

    cur_dat.append(sum(precipitation))

    forecast2=[]
    forecast2.append(np.array(cur_dat))
    for i in range(7):
        forecast2.append(model.predict(forecast2[-1].reshape(1,16))[0])
    col=['PredTempCMax','PredTempCAvg','PredTempCMin','PredDewPointCMax','PredDewPointCAvg','PredDewPointCMin','PredHumidityPercentMax','PredHumidityPercentAvg','PredHumidityPercentMin','PredWindSpeedmphMax','PredWindSpeedmphAvg','PredWindSpeedmphMin','PredPressureHgMax','PredPressureHgAvg','PredPressureHgMin','PredPrecipitationInches']
    result2=pd.DataFrame(forecast2, columns=col)
    result2.insert(0,column='Date',value=np.array([ (day1+timedelta(days=i)).strftime("%d-%m-%Y") for i in range(8) ]))
    for i in range(len(result2.PredPrecipitationInches)):
        if result2['PredPrecipitationInches'][i] < 0:
            result2['PredPrecipitationInches'][i] = 0
    result2.index=result2.index+1
    result2=result2.round(decimals=2)
    return result2

def graph(data):
    l=[]
    l.append([ i for i in data['PredTempCMax']])
    l.append([ i for i in data['PredTempCAvg']])
    l.append([ i for i in data['PredTempCMin']])

    l.append([ i for i in data['PredDewPointCMax']])
    l.append([ i for i in data['PredDewPointCAvg']])
    l.append([ i for i in data['PredDewPointCMin']])

    l.append([ i for i in data['PredHumidityPercentMax']])
    l.append([ i for i in data['PredHumidityPercentAvg']])
    l.append([ i for i in data['PredHumidityPercentMin']])

    l.append([ i for i in data['PredWindSpeedmphMax']])
    l.append([ i for i in data['PredWindSpeedmphAvg']])
    l.append([ i for i in data['PredWindSpeedmphMin']])

    l.append([ i for i in data['PredPressureHgMax']])
    l.append([ i for i in data['PredPressureHgAvg']])
    l.append([ i for i in data['PredPressureHgMin']])

    l.append([ i for i in data['PredPrecipitationInches']])
    return l

@app.route("/")
def index():
    return render_template("Index.html")

@app.route("/Sriharikota")
def ind():
    loaded_model.load_weights('model_in.h5')
    
    day1=(date.today()-timedelta(days=2))
    x_date=day1.strftime("%Y-%m-%d")
    data=requests.get("https://api.weatherbit.io/v2.0/history/hourly?lat=13.7331&lon=80.2047&start_date={}:00&end_date={}:24&key=7b1aa63966864388bf424795f8136f00".format(x_date,x_date))
    data2=model_run(loaded_model,data,day1)
    value=graph(data2)
    return render_template("Ind.html",result=data2.loc[:,['Date','PredTempCAvg','PredDewPointCAvg','PredHumidityPercentAvg','PredWindSpeedmphAvg','PredPressureHgAvg','PredPrecipitationInches']].to_html(),labels=[ _ for _ in data2['Date'] ], values=value )

@app.route("/Tanegashima")
def jpn():
    loaded_model.load_weights('model_jpn.h5')
    
    day1=(date.today()-timedelta(days=2))
    x_date=day1.strftime("%Y-%m-%d")
    data=requests.get("https://api.weatherbit.io/v2.0/history/hourly?lat=30.3749&lon=130.9576&start_date={}:00&end_date={}:24&key=7b1aa63966864388bf424795f8136f00".format(x_date,x_date))
    data2=model_run(loaded_model,data,day1)
    value=graph(data2)
    return render_template("Jpn.html",result=data2.loc[:,['Date','PredTempCAvg','PredDewPointCAvg','PredHumidityPercentAvg','PredWindSpeedmphAvg','PredPressureHgAvg','PredPrecipitationInches']].to_html(),labels=[ _ for _ in data2['Date'] ], values=value)

@app.route("/CapeCanaveral")
def usa():
    loaded_model.load_weights('model_us.h5')
    
    day1=(date.today()-timedelta(days=2))
    x_date=day1.strftime("%Y-%m-%d")
    data=requests.get("https://api.weatherbit.io/v2.0/history/hourly?lat=28.3922&lon=-80.60776&start_date={}:00&end_date={}:24&key=7b1aa63966864388bf424795f8136f00".format(x_date,x_date))
    data2=model_run(loaded_model,data,day1)
    value=graph(data2)
    return render_template("Us.html",result=data2.loc[:,['Date','PredTempCAvg','PredDewPointCAvg','PredHumidityPercentAvg','PredWindSpeedmphAvg','PredPressureHgAvg','PredPrecipitationInches']].to_html(),labels=[ _ for _ in data2['Date'] ], values=value)

@app.route("/Baikonur")
def rus():
    loaded_model.load_weights('model_rus.h5')
    
    day1=(date.today()-timedelta(days=2))
    x_date=day1.strftime("%Y-%m-%d")
    data=requests.get("https://api.weatherbit.io/v2.0/history/hourly?lat=45.9646&lon=63.3052&start_date={}:00&end_date={}:24&key=7b1aa63966864388bf424795f8136f00".format(x_date,x_date))
    data2=model_run(loaded_model,data,day1)
    value=graph(data2)
    return render_template("Rus.html",result=data2.loc[:,['Date','PredTempCAvg','PredDewPointCAvg','PredHumidityPercentAvg','PredWindSpeedmphAvg','PredPressureHgAvg','PredPrecipitationInches']].to_html(),labels=[ _ for _ in data2['Date'] ], values=value)

if __name__=="__main__":
    app.run(debug=False)
