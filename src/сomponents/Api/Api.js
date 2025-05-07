import axios from 'axios';

const ACCESS_KEY = 'lBBPE1jlk4sgAGnVQbwgY2Xe2TwZWeZn9-__W4ebnpE';
export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        page,
        per_page: 12,
        client_id: ACCESS_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error('Failed to fetch images. Please try again later.');
  }
};
