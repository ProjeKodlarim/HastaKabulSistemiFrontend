import axios from "axios"
import patientInformation from "../Entities/patientInformation"

const GetPatientVisitDetail = (identityNumber:string) =>{
    return axios.get("http://localhost:20491/api/patients/getpatientdetail?identynumber="+identityNumber)
}

const AddPatientInformation = (patientInformation:patientInformation)=>{
    return axios.post("http://localhost:20491/api/patients/add",patientInformation)
}

const patientInformationService = {
    GetPatientVisitDetail,
    AddPatientInformation
  }
  export default patientInformationService