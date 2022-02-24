import './App.css';
import {  WiWindy, WiRainMix, WiNightAltCloudyGusts } from "react-icons/wi";
import {  BiError } from "react-icons/bi";
import { BsThermometerHalf } from "react-icons/bs";
import { IoIosWater } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import { useState, useEffect } from 'react';
import ForcastCard from './ForcastCard';

function App() {

  let [city, setCity] = useState(null);
  let [search, setSearch] = useState("Ghaziabad");
  let [change,setChnage] = useState(0);
  let [cityName,setCityName] = useState("Ghaziabad");
  let [forcast,setForcast] = useState([]);

  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((pos)=>{
  //     console.log(pos);
  //   })
  // },[]);

  
  useEffect(()=>{
    const fetchApi1 = async () =>{
      let api = `https://api.weatherapi.com/v1/current.json?key=acc18d5b59ea4ae890e100957220901&q=${search}`;

      const response = await fetch(api);
      const data = await response.json();

      setCity(data.current);
    };

    fetchApi1();

    const fetchApi2 = async () =>{
      let api2 = `https://api.weatherapi.com/v1/forecast.json?key=acc18d5b59ea4ae890e100957220901&q=${search}&days=7`;

      const response2 = await fetch(api2);
      const data2 = await response2.json();
      console.log(data2.forecast.forecastday);

      setForcast(data2.forecast.forecastday);
    }

    fetchApi2();
  },[change]);
  


  return (
    <div className='wholePart'>
    <div className="card" >
      <h1 style={{marginTop:8,marginBottom:10}} >{cityName}</h1>
      <div className="searchPart">
        <input type="text" placeholder="Enter City" className="searching" value={search} onChange={(e) => {setSearch(e.target.value) }} />
        <FcSearch size='50' style={{ cursor: 'pointer' }} className='searchIcon' onClick={()=>{setChnage(change+1); setCityName(search);}}  />
      </div>


      {
        !city ? (
          <div className='errorData'>
             <p>City Not Found </p>
             <p>Enter another City 🙄</p>
             <BiError size={50} className='weatherImg' />
          </div>
          ) :
        (
          <>
          {/* Image */}
          <img src={city.condition.icon} alt="icon_img" className="weatherImg" />
      <span>{city.last_updated}</span>
      <br />
      <span className="temp">{city.temp_c}&#176;C</span>
      <br />
      <span>{city.condition.text} Weather</span>
      <br />

      <div className="sideData">
        <div className="twoData">
          <div className="oneBox">
            <WiWindy size='50' color='white' />
            <div className="oneData">
              <p>{city.wind_kph} Km/h</p>
              <p>Wind</p>
            </div>
          </div>
          <div className="oneBox">
            <WiNightAltCloudyGusts size='50' color='white' />
            <div className="oneData">
              <p>{city.gust_kph} Km/h</p>
              <p>Gust Speed</p>
            </div>
          </div>
        </div>
        <div className="twoData">
          <div className="oneBox">
            <BsThermometerHalf size='50' color='white' />
            <div className="oneData">
              <p>{city.pressure_mb} mbar</p>
              <p>Pressure</p>
            </div>
          </div>
          <div className="oneBox">
            <IoIosWater size='50' color='white' />
            <div className="oneData">
              <p>{city.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </div>
          </>
        )
      }
    </div>

    <div className="forecastCard">
    <h1>Forcasting</h1>
        {
          !city ? (
             <div style={{display:'flex',flexDirection:'column',width:250,justifyContent:'center',alignItems:'center',marginTop:'1rem'}}>
             <p>Enter another City 🙄</p>
             <BiError size={50} className='weatherImg' />
             </div>
          ) :
          (
           forcast.map((ele)=>{
             return (
               <ForcastCard ele={ele} />
             )
           })
          )
        }   
    </div>
    </div>
  );
}

export default App;
