import axios from "axios";

export const getDB = async () => {
   
    try {
        const res = await axios.get('/api/products/getall')
        
        return res.data
       
    }
    catch (err) {console.log(err)}
}

export default getDB