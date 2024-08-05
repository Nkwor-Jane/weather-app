import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'

const WeatherApp = () => {
    const [data, setData] = useState(false);

    const inputRef = useRef();
    const allIcons ={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const searchCity = async(city) =>{
        if(city === ''){
            alert("Enter city name")
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
            const res = await fetch(url);
            const data = await res.json()
            if(!res.ok){
                alert(data.message)
                return;
            }
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }catch(err){
            setData(false);
            console.error("Error getting weather data",err)
        }
    }
    useEffect(() =>{
        searchCity("london")
    },[])
  return (
       <div className=' p-10 place-content-center rounded grid bg-blue-200 h-screen font-mono '>
        <div className='flex flex-col items-center bg-blue-600 rounded-md p-10'>
            <div className='flex gap-4 '>
                <input ref={inputRef} className='p-2 cursor-pointer border-none h-9 rounded-3xl text-gray-500 bg-gray-50 outline-0' type="text" placeholder='Search City' />
                <img onClick={() => searchCity(inputRef.current.value)} src={search_icon} alt="Search icon"  className='p-3 cursor-pointer w-10 rounded-3xl bg-gray-50 '/>
            </div>
            {data?<>
                <img src={data.icon} alt="weather icons" className='w-20 my-5 '/>
                <p className='text-white text-4xl leading-1'>{data.temp}°C</p>
                <p className='text-white text-2xl '>{data.location}</p>
            <div className='w-full mt-8 text-white flex justify-between gap-8'>
                    <div className='flex items-start gap-4 text-lg'>
                        <img src={humidity_icon} alt="Humidity icon" className='w-7 mt-3' />
                        <div>
                            <p>{data.humidity}%</p>
                            <span className='block text-base'>Humidity</span>
                        </div>
                    </div>
                    <div className='flex items-start gap-4 text-lg'>
                        <img src={wind_icon} alt="Wind icon" className='w-7 mt-3' />
                        <div>
                            <p>{data.windSpeed}Km/h</p>
                            <span className='block text-base'>Wind Speed</span>
                        </div>
                    </div>
            </div>
            </>:<>
            </>}
           
        </div>
            
        </div> 
  )
}

export default WeatherApp