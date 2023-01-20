import axios from "axios"
import department from "../Entities/department"


const AddDepartmen = (department:department)=>{
    return axios.post("http://localhost:20491/api/departments/add",department)
}

const GetAll = () =>{
    return axios.get("http://localhost:20491/api/departments/getall")
}

const departmentService = {
    AddDepartmen,
    GetAll
  }
  export default departmentService