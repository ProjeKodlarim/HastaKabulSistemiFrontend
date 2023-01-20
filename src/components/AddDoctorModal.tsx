import React, { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import department from '../Entities/department';
import departmentService from '../services/departmentService';
import doctor from '../Entities/doctor';
import doctorService from '../services/doctorService';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from '@mui/material';
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

const AddDoctorModal = () => {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>(0)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [departmentId, setDepartmentId] = useState<number>(0)
  const [departmentName, setDepartmentName] = useState<string>("")
  const [departmentList, setDepartmentList] = useState<department[]>([])


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setFirstName("")
    setLastName("")
    setOpen(false);
  };

  useEffect(() => {
    departmentService.GetAll().then(response => setDepartmentList(response.data)).catch(error => toast.error(error.message))

  }, [])

  const save = () => {
    const doctor: doctor = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      departmentId: departmentId
    }
    if (doctor.firstName != null) {
      doctorService.AddDoctor(doctor).then(response => handleClose()).catch(error => toast.error(error.message))
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setDepartmentId(parseInt(event.target.value))
    setDepartmentName(event.target.value)

  };
  return (
    <div>
      <React.Fragment>
        <Button onClick={handleOpen} variant='contained'>Yeni Doktor Kaydı Ekle</Button>
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
          style={{ overflow: 'scroll' }}
        >
          <Box sx={{ ...style }}>
            <h3>Yeni Doktor Ekle</h3>
            <hr style={{ width: "100%" }} />
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }} direction="row" justifyContent="center">
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Bölüm seçiniz</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={departmentName}
                    label="Bölüm seçiniz"
                    onChange={handleChange}
                  >
                    {
                      departmentList.map((key) => (
                        <MenuItem value={key.id}>{key.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button onClick={handleClose} sx={{ height: "35px", textTransform: "none" }}>Kapat</Button>
            <Button variant="contained" onClick={save} startIcon={<SaveIcon />} sx={{ height: "35px", marginLeft: "10px", textTransform: "none" }}>
              Kaydet
            </Button>
          </Box>
        </Modal>
      </React.Fragment>

    </div>
  )
}
export default AddDoctorModal
