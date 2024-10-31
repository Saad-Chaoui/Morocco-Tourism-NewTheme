import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import OptimizedRoute from './components/common/OptimizedRoute';
import OptimizedImage from './components/common/OptimizedImage';

// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const RegionList = lazy(() => import('./components/RegionList'));
const CityList = lazy(() => import('./components/CityList'));
const MonumentList = lazy(() => import('./components/MonumentList'));
const TouristSiteList = lazy(() => import('./components/TouristSiteList'));
const TouristSiteDetails = lazy(() => import('./components/TouristSiteDetails'));
const MonumentDetails = lazy(() => import('./components/MonumentDetails'));
const RegionDetails = lazy(() => import('./components/RegionDetails'));
const CityDetails = lazy(() => import('./components/CityDetails'));
const NotFound = lazy(() => import('./components/NotFound'));
const Explore = lazy(() => import('./components/Explore'));
const CitySearch = lazy(() => import('./components/CitySearch'));
const AccommodationList = lazy(() => import('./components/AccommodationList'));
const AccommodationDetails = lazy(() => import('./components/AccommodationDetails'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OptimizedRoute component={HomePage} />} />
      <Route path="/regions" element={<OptimizedRoute component={RegionList} />} />
      <Route path="/cities" element={<OptimizedRoute component={CityList} />} />
      <Route path="/monuments" element={<OptimizedRoute component={MonumentList} />} />
      <Route path="/tourist-sites" element={<OptimizedRoute component={TouristSiteList} />} />
      <Route path="/tourist-site/:id" element={<OptimizedRoute component={TouristSiteDetails} />} />
      <Route path="/city/search/:cityName" element={<OptimizedRoute component={CitySearch} />} />
      <Route path="/monument/:id" element={<OptimizedRoute component={MonumentDetails} />} />
      <Route path="/region/:id" element={<OptimizedRoute component={RegionDetails} />} />
      <Route path="/city/:id" element={<OptimizedRoute component={CityDetails} />} />
      <Route path="/explore" element={<OptimizedRoute component={Explore} />} />
      <Route path="/accommodations" element={<OptimizedRoute component={AccommodationList} />} />
      <Route path="/accommodation/:id" element={<OptimizedRoute component={AccommodationDetails} />} />
      <Route path="*" element={<OptimizedRoute component={NotFound} />} />
    </Routes>
  );
}

export default AppRoutes;