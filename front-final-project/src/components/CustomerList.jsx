import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";


export default function CustomerList() {

	//tilamuuttuja autoille
	const [customers, setCustomers] = useState([{ 
		firstname: '', lastname: '', streetaddress: '', postcode: '', 
		city: '', email: '', phone: ''  }])
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [msg, setMsg] = useState("");

	//ag-grid taulukon sarakkeet 
	const [colDefs, setColDefs] = useState([
		{ field: 'firstname', flex: 1 },
		{ field: 'lastname', flex: 1 },
		{ field: 'email', flex: 1 },
		{ field: 'phone', flex: 1 },
		
	]);


	useEffect(() => getCustomers(), [])


	//hae autot backendistä 
	//getCars funktio
	const getCustomers = () => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers',
			{ method: 'GET' })
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log("data ", data._embedded.customers);
				// Handle data
				setCustomers(data._embedded.customers);

			})
			.catch(err => {
				// Something went wrong
			});
	}


	//näytä autot nettisivulla 
	return (
		<>
			<div className="ag-theme-material" style={{ width: 900, height: 400 }}>
				<AgGridReact
					rowData={customers}
					columnDefs={colDefs}
					pagination={true}
					paginationPageSize={5}
					paginationPageSizeSelector={false}
				>
				</AgGridReact>

				
				<Snackbar
					open={openSnackbar}
					message={msg}
					autoHideDuration={3000}
					onClose={() => setOpenSnackbar(false)}
				>

				</Snackbar>
			</div>
		</>
	)
}