import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import DeleteButton from "./DeleteButton";


export default function TrainingList() {

	//tilamuuttuja autoille
	const [trainings, setTrainings] = useState([{ 
		date: '', duration: '', activity: '', customerLink: ''}])

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [msg, setMsg] = useState("");

	//ag-grid taulukon sarakkeet 
	const [colDefs, setColDefs] = useState([
		{ field: 'date', flex: 1 },
		{ field: 'duration', flex: 1 },
		{ field: 'activity', flex: 1 },
		{ field: 'customerLink', flex: 1 },
		{
			cellRenderer: (params) =>
				<DeleteButton func={deleteTraining} params={params} />
			, flex: 1
		}
		
	]);



	useEffect(() => getTrainings(), [])


	//hae autot backendistä 
	//getCars funktio
	const getTrainings = () => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings',
			{ method: 'GET' })
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log("data ", data._embedded.trainings);
				// Handle data
				setTrainings(data._embedded.trainings);

			})
			.catch(err => {
				// Something went wrong
			});
	}


	const deleteTraining = (params) => {
		console.log("params ", params.data._links.self.href);

		fetch(params.data._links.self.href,
			{ method: 'DELETE' })
			.then(response => {
				if (response.ok) {
					setOpenSnackbar(true);
					setMsg("Delete succeed");
					getTrainings();
				}
				else {
					openSnackbar(false);
				}
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
					rowData={trainings}
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