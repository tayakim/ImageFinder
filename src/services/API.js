import axios from 'axios';

const fetchImagesAPI = async(query, page = 1) => {
    const apiKey = `19539916-67a6db161f09ee9bfd5c70184`;
    let URL = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12`;
    return await axios.get(URL)

    .then((response) => response.data.hits);

}
export default fetchImagesAPI;