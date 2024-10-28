import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegionList from './components/RegionList';
import CityList from './components/CityList';
import MonumentList from './components/MonumentList';
import TouristSiteList from './components/TouristSiteList';
import TouristSiteDetails from './components/TouristSiteDetails';
import MonumentDetails from './components/MonumentDetails';
import RegionDetails from './components/RegionDetails';
import CityDetails from './components/CityDetails';
import NotFound from './components/NotFound';
import Explore from './components/Explore';
import CitySearch from './components/CitySearch'; // Add this import


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/regions" element={<RegionList />} />
      <Route path="/cities" element={<CityList />} />
      <Route path="/monuments" element={<MonumentList />} />
      <Route path="/tourist-sites" element={<TouristSiteList />} />
      <Route path="/tourist-site/:id" element={<TouristSiteDetails />} />
      <Route path="/cities/search/:cityName" element={<CitySearch />} />
      <Route path="/monument/:id" element={<MonumentDetails />} />
      <Route path="/region/:id" element={<RegionDetails />} />
      <Route path="/city/:id" element={<CityDetails />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
