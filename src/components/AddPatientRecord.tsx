import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import patientInformation from '../Entities/patientInformation';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import patientInformationService from '../services/patientInformationService';
import doctor from '../Entities/doctor';
import doctorService from '../services/doctorService';
import { ToastContainer, toast } from 'react-toastify';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

const AddPatientRecord = () => {

    const [open, setOpen] = useState(false);

    const [id, setId] = useState<number>(0)
    const [identyNumber, setIdentyNumber] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [doctorId, setDoctorId] = useState<number>(0)
    const [doctorName, setDoctorName] = useState<string>("")
    const [doctorList, setDoctorList] = useState<doctor[]>([])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setIdentyNumber("")
        setFirstName("")
        setLastName("")
        setAdress("")
        setPhoneNumber("")
        setDoctorName("")
        setOpen(false);
    };
    useEffect(() => {
        doctorService.GetAll().then(response => setDoctorList(response.data)).catch(error => toast.error(error.message))
        
    }, [])


    const save = () => {
        const patientInf: patientInformation = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            adress: adress,
            phoneNumber: phoneNumber,
            identyNumber: identyNumber,
            doctorId: doctorId
        }
        if (patientInf.firstName != null) {
            console.log(patientInf)
            patientInformationService.AddPatientInformation(patientInf).then(response => handleClose()).catch(error => toast.error(error.message))
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setDoctorId(parseInt(event.target.value))
        setDoctorName(event.target.value)
        
      };


    return (
        <div>
            <React.Fragment>
                <Button onClick={handleOpen} variant='contained'>Yeni Hasta Kaydı Ekle</Button>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={(_, reason) => {
                        if (reason !== "backdropClick") {
                            handleClose();
                        }
                    }}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                    style={{overflow:'scroll'}}
                >
                    <Box sx={{ ...style }}>
                    <h3>Yeni Kayıt Ekle</h3>
                        <hr style={{ width: "100%" }} />
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }} direction="row" justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    value={identyNumber}
                                    onChange={(event) => setIdentyNumber(event.target.value)}
                                    label="TC Kimlik No giriniz"
                                    variant="outlined"
                                    style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    label="İsim giriniz"
                                    variant="outlined"
                                    style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    label="Soyisim giriniz"
                                    variant="outlined"
                                    style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    value={adress}
                                    onChange={(event) => setAdress(event.target.value)}
                                    label="Adres giriniz"
                                    variant="outlined"
                                    style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                    label="Telefon numarası giriniz"
                                    variant="outlined"
                                    style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Doktor seçiniz</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={doctorName}
                                        label="Doktor seçiniz"
                                        onChange={handleChange}
                                    >
                                        {
                                            doctorList.map((key)=>(
                                                <MenuItem value={key.id}>{key.firstName+" "+key.lastName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Button onClick={handleClose}sx={{ height: "35px", textTransform: "none" }}>Kapat</Button>
                        <Button variant="contained" onClick={save} startIcon={<SaveIcon />} sx={{ height: "35px", marginLeft: "232px",marginTop:"10px", textTransform: "none" }}>
                            Kaydet
                        </Button>
                    </Box>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default AddPatientRecord
