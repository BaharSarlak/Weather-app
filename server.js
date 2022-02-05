const express= require('express');
const https= require('https');
const appId=require('./appId.js');

const app=express();

app.listen(3000, 'localhost', ()=>console.log('server running on port 3000'));

app.get('/', (req,res)=>{
    const unitsSystem='metric'
    const londonUrl=`https://api.openweathermap.org/data/2.5/find?q=London&units=${unitsSystem}&appid=${appId}`;
    https.get(londonUrl, (response)=>{
        console.log('response status code: '+ response.statusCode);
        response.on('data',d=>{
            const londonData= JSON.parse(d);
            const londonTemp=londonData.list[0].main.temp
            const londonDescription=londonData.list[0].weather[0].description
            const londonIconUrl=`http://openweathermap.org/img/wn/${londonData.list[0].weather[0].icon}@2x.png`
            console.log(londonIconUrl)
            console.log('Tempreture: '+londonTemp +' Celcius | weather description: '+ londonDescription)
            res.write(`<h1>Temperature in London is: ${londonTemp}</h1>`)
            res.write(`Weather condition is: ${londonDescription}`)
            res.write(`<img src=${londonIconUrl}></img>`)
            res.send()
        })
    })
})
