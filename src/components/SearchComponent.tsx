import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import patientInformationService from '../services/patientInformationService'
import patientVisitDetail from '../DTOs/patientVisitDetail'
import TableView from '../layouts/TableView'


export default function SearchComponent() {
    const [searchText, setSearchText] = useState<string>("")
    const [patientVisitDetail, setPatientVisitDetail] = useState<patientVisitDetail[]>([])

    const handleChange = (event: any) => {
        setSearchText(event.target.value)
        console.log(event.target.value)
    }

    const handleSubmit = () => {
        setPatientVisitDetail([])
        patientInformationService.GetPatientVisitDetail(searchText).then(response => setPatientVisitDetail(response.data)).catch(error => console.log(error));
    }
    return (
        <div>
            <div>
                <h3>Hasta Kaydı Sorgula</h3>
            </div>
            <div>
                <TextField label="TC kimlik numarası giriniz" id="outlined-size-small" size="small" value={searchText} onChange={handleChange} style={{marginBottom:10}}/>
            </div>
            <div>
                <Button variant="contained" onClick={handleSubmit} style={{marginBottom:10}}>Ara</Button>
            </div>
            <div>
                {
                    patientVisitDetail.length>0?<TableView patientVisitDetail={patientVisitDetail}/>:"Eşleşen kayıt yok."
                }
            </div>

        </div>
    )
}
