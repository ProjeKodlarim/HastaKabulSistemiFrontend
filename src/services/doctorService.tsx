import axios from "axios"
import doctor from "../Entities/doctor"

const GetAll = () =>{
    return axios.get("http://localhost:20491/api/doctors/getall")
}
const AddDoctor = (doctor:doctor)=>{
    return axios.post("http://localhost:20491/api/doctors/add",doctor)
}

const doctorService = {
    GetAll,
    AddDoctor
  }
  export default doctorService