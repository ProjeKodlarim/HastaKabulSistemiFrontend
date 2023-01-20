import { Box, Button, Modal } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import department from '../Entities/department';
import departmentService from '../services/departmentService';
import SaveIcon from '@mui/icons-material/Save'
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
const AddDepartmentModal = () => {

  const [open, setOpen] = useState(false);

  const [id, setId] = useState<number>(0)
  const [name, setName] = useState<string>("")

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("")
    setOpen(false);
  };

  const save = () => {
    const department: department = {
        id: id,
        name: name
    }
    if (department.name != null) {
        departmentService.AddDepartmen(department).then(response => handleClose()).catch(error => toast.error(error.message))
    }
}

  return (
    <div>
      <React.Fragment>
                <Button onClick={handleOpen} variant='contained'>Yeni Bölüm Ekle</Button>
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
                    <h3>Yeni Bölüm Ekle</h3>
                        <hr style={{ width: "100%" }} />
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }} direction="row" justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    label="Bölüm ismi giriniz"
                                    variant="outlined"
                                    style={{ width: "100%" }} />
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

export default AddDepartmentModal