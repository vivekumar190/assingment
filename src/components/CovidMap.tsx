import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import { CountryData } from '../models/CountryData';

const fetchCountryData = async (): Promise<CountryData[]> => {
  const response = await axios.get<CountryData[]>(`${import.meta.env.VITE_API_URL}/countries`);
  return response.data;
};

const CovidMap: React.FC = () => {
  const { data: countries, isLoading, isError } = useQuery({
    queryKey: ['countryData'],
    queryFn: fetchCountryData,
  });

  const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  if (isLoading) return <div className='flex justify-center'><ClipLoader /></div>;
  if (isError || !countries) return <p>Error fetching data</p>;

  return (
    <div>
        <h3 className='text-3xl font-bold pb-6'>Covid Based Map</h3>
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      {countries.map((country, index) => (
        <Marker
          key={index}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={defaultIcon}
        >
          <Popup>
            <div className='space-y-6'>
              <h3 className='font-bold'>{country.country}</h3>
              <img src={country.countryInfo.flag} alt="flag" className='w-14 border border-gray-700' />
              <p><strong>Active Cases:</strong> {country.active.toLocaleString()}</p>
              <p><strong>Recovered:</strong> {country.recovered.toLocaleString()}</p>
              <p><strong>Deaths:</strong> {country.deaths.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default CovidMap;
