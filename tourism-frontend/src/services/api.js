import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api';

// Tourist Site API calls
export const getTouristSite = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/tourist-sites/${id}`);
  return response.data;
};

export const getTouristSites = async (page = 1, limit = 6, searchTerm = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourist-sites`, {
      params: { page, limit, search: searchTerm }
    });

    // Ensure we're returning data in the expected format
    return {
      data: response.data.data || [], // Array of tourist sites
      totalPages: response.data.totalPages || 0,
      currentPage: response.data.currentPage || 1,
      totalItems: response.data.totalItems || 0
    };
  } catch (error) {
    console.error('Error fetching tourist sites:', error);
    throw error;
  }
};


// Monument API calls
export const getMonument = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/monuments/${id}`);
  return response.data;
};

export const getMonuments = async (page = 1, limit = 9, searchTerm = '') => {
  const response = await axios.get(`${API_BASE_URL}/monuments`, {
    params: { page, limit, search: searchTerm }
  });
  return response.data;
};

export const getMonumentsByCity = async (cityId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/monuments/city/${cityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching monuments for city:', error);
    throw error;
  }
};

export const getMonumentsByRegion = async (regionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/monuments/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching monuments for region:', error);
    throw error;
  }
};

// City API calls
export const getCity = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/cities/${id}`);
  return response.data;
};

export const getCities = async (page = 1, limit = 6, searchTerm = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`, {
      params: { page, limit, search: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Add this new function
export const getCityByName = async (cityName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities/name/${encodeURIComponent(cityName)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city by name:', error);
    return null;
  }
};

// Region API calls
export const getRegion = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/regions/${id}`);
  return response.data;
};

export const getRegions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/regions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

// Alias for backwards compatibility
export const getAllRegions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/regions`);
    return response.data; // Should return { data: [...regions] }
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const getAllCities = getCities;

// Add these new functions
export const getCitiesByRegion = async (regionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities for region:', error);
    throw error;
  }
};


export const getRegionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/regions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching region:', error);
    throw error;
  }
};

export const getCityById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};

// Add this new function
export const getTouristSitesByRegion = async (regionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourist-sites/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist sites for region:', error);
    throw error;
  }
};

export const searchCity = async (cityName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities/search/${encodeURIComponent(cityName)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching city:', error);
    return null;
  }
};