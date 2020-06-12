import axios from "axios";
import {SL} from './SL'

export const getDB = async () => {
   
    try {
        const res = await axios.get(`${SL}/api/products/getall`)
        
        return res.data
       
    }
    catch (err) {console.log(err)}
}

export default getDB