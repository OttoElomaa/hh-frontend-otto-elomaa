import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import AddCarForm from "./AddCarForm";
import EditCarForm from "./EditCarForm";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";


export default function CarList() {

	//tilamuuttuja autoille
	const [cars, setCars] = useState([{ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' }])
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [msg, setMsg] = useState("");

	//ag-grid taulukon sarakkeet 
	const [colDefs, setColDefs] = useState([
		{ field: 'brand', flex: 1 },
		{ field: 'model', flex: 1 },
		{ field: 'color', flex: 1 },
		{ field: 'fuel', flex: 1 },
		{ field: 'modelYear', flex: 1 },
		{ field: 'price', flex: 1 },
		{
			cellRenderer: (params) =>
				<Button
					size="small"
					color="error"
					onClick={() => deleteCar(params)}
				>Delete</Button>
				, flex: 1
			},
		{
			cellRenderer: (params) =>
				<EditCarForm func={editCarFunc} params={params}/>
			, flex: 1
		}

	]);


	const deleteCar = (params) => {
		console.log("params ", params.data._links.car.href);

		fetch(params.data._links.car.href,
			{ method: 'DELETE' })
			.then(response => {
				if (response.ok) {
					setOpenSnackbar(true);
					setMsg("Delete succeed");
					getCars();
				}
				else {
					openSnackbar(false);
				}
			})
			.catch(err => {
				// Something went wrong
			});
	}


	const addCarFunc = (car) => {
		fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(car)
			})
			.then(getCars() )
			.catch(err => console.error(err) )
	}

	const editCarFunc = (car) => {
		fetch(car._links.self.href,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(car)
			})
			.then(getCars() )
			.catch(err => console.error(err) )
	}



	useEffect(() => getCars(), [])


	//hae autot backendistä 
	//getCars funktio
	const getCars = () => {
		fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars',
			{ method: 'GET' })
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log("data ", data._embedded.cars);
				// Handle data
				setCars(data._embedded.cars);

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
					rowData={cars}
					columnDefs={colDefs}
					pagination={true}
					paginationPageSize={5}
					paginationPageSizeSelector={false}
				>
				</AgGridReact>

				<AddCarForm func={addCarFunc} />

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