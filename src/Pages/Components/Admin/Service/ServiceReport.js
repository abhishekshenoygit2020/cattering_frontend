import React, { useEffect, useState } from "react";
import { Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from "../../../../api/axios";
const URL = './service/service';

const ServiceReport = () => {    

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "first_name", headerName: "first name", width: 130 },
        { field: "last_name", headerName: "last name", width: 130 },
        { field: "contact", headerName: "contact", width: 130 },
        { field: "pname", headerName: "product name", width: 130 },
        { field: "service_no", headerName: "service no", width: 130 },
        { field: "problem", headerName: "problem", width: 130 },
        { field: "date", headerName: "date", width: 130 },
        { field: "status", headerName: "status", width: 130 },
        { field: "amount", headerName: "amount", width: 130 },
    ];
    

    const [dataList, setDataList] = useState([]);        
    const [refreshData, setRefreshData] = useState(false);
    
    useEffect(() => {
        loadData();        
    }, [refreshData]);

    const loadData = async () => {
        try {
            const response = await axios.get(URL); 
            if (response.data.status == 401) {
                setDataList('');      
            } else {
                setDataList(response.data.data);
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                console.log(err?.response.data);
            }
        } 
    };
    
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <div className="formInputs" style={{ margin: 0, padding: 0, height: '100%', backgroundColor: 'rgb(246 249 255)' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box sx={{ height: '100%', width: '100%', padding: 0 }}>
                            <DataGrid
                                rows={dataList}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}                          
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ServiceReport;
