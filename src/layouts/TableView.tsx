import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect } from 'react';

const columns: GridColDef[] = [
  { field: 'identyNumber', headerName: 'TC Kimlik No', width: 130 },
  { field: 'firstName', headerName: 'İsim', width: 130 },
  { field: 'lastName', headerName: 'Soyisim', width: 130 },
  { field: 'adress',headerName: 'Adres',width: 130,sortable:false},
  { field: 'phoneNumber',headerName: 'Telefon numarası',width: 130,sortable:false},
  { field: 'doctorName',headerName: 'Doktor İsmi',width: 130,},
  { field: 'departmentName',headerName: 'Bölüm',width: 100,},
  { field: 'createdDate',headerName: 'Geldiği Tarih',type: 'Date',width: 160,},
  // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TableView=(props:any)=> {
  useEffect(() => {
    console.log(props.patientVisitDetail) 
    console.log(rows)
  })
  
  return (
    <div style={{ height: 400, width: '70%',marginLeft:250 }}>
      <DataGrid
        rows={props.patientVisitDetail}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}      
      />
    </div>
  )
}
export default TableView