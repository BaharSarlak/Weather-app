const express= require('express');
const https= require('https');
const appId=require('./appId.js');

const app=express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(3000, 'localhost', ()=>console.log('server running on port 3000'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/', (req,res)=>{
    const query=req.body.cityName
    const unitsSystem='metric';
    const cityUrl=`https://api.openweathermap.org/data/2.5/find?q=${query}&units=${unitsSystem}&appid=${appId}`;
    https.get(cityUrl, (response)=>{
        console.log('response status code: '+ response.statusCode);
        response.on('data', d=>{
            const cityData= JSON.parse(d);
            const cityTemp=cityData.list[0].main.temp;
            const cityDescription=cityData.list[0].weather[0].description;
            const cityIconUrl=`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`
            console.log(`${query}: Tempreture: ${cityTemp} +' Celcius | weather description: ${cityDescription}`);
            res.write(`<h1>Temperature in ${query} is: ${cityTemp}</h1>`);
            res.write(`Weather condition is: ${cityDescription}`);
            res.write(`<img src=${cityIconUrl}></img>`);
            res.send()
        })
    })
})
