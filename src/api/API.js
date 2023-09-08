import axios from 'axios';

const instanse = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '38407139-ecc8ce3f4d9849c22fd8a553c',
    per_page: 12,
  },
});

export const fetchImages = async (q, page = 1) => {
  const { data } = await instanse.get('/', { params: { q, page } });
  return data;
};
