import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import DeleteButton from "./DeleteButton";
import dayjs from "dayjs";
import AddTrainingForm from "./AddTrainingForm";


export default function TrainingList() {


	const [trainings, setTrainings] = useState([{
		date: '', duration: '', activity: '', customerlink: ''
	}])

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [msg, setMsg] = useState("");

	useEffect(() => getTrainings(), [])


	//ag-grid taulukon sarakkeet 
	const [colDefs, setColDefs] = useState([
		{
			headerName: 'Date/Time',
			sortable: true, filter: true, floatingFilter: true,
			cellRenderer: (params) =>
				dayjs(params.data.date).format('DD.MM.YYYY HH:MM')
			, flex: 1
		},

		{
			field: 'duration', flex: 1,
			sortable: true, filter: true, floatingFilter: true
		},

		{
			field: 'activity', flex: 1,
			sortable: true, filter: true, floatingFilter: true
		},

		{
			headerName: 'Customer',
			cellRenderer: (params) =>
				UserNameRenderer(params.data.customerlink)
			, flex: 1,
			sortable: true, filter: true, floatingFilter: true,

		},
		{
			headerName: '',
			cellRenderer: (params) =>
				<DeleteButton func={deleteTraining} params={params} />
			, flex: 1,
		}

	]);







	const UserNameRenderer = (link) => {

		const [userName, setUserName] = useState('Loading...');

		fetch(link,
			{ method: 'GET' })
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUserName(data.firstname + " " + data.lastname)
				console.log(userName)
			})
			.catch(err => {
				console.error(err)
			});

		return (<>{userName}</>);

	}




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
				const trainingData = data._embedded.trainings

				// FROM CHATGPT
				// Transform the data to extract links
				const transformedData = trainingData.map(
					(item) => (
						{
							date: item.date,
							duration: item.duration,
							activity: item.activity,
							customerlink: item._links?.customer?.href || 'link missing'
						}
					)
				);
				// Save transformed data to state
				setTrainings(transformedData);
				// CHATGPT END
			})
			.catch(err => {
				// Something went wrong
			});
	}


	const addTrainingFunc = (train) => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(train)
			})
			.then(
				getTrainings()
			)
			.catch(err => console.error(err))
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

				<AddTrainingForm func={addTrainingFunc} />


				<Snackbar
					open={openSnackbar}
					message={msg}
					autoHideDuration={3000}
					onClose={() => setOpenSnackbar(false)}
				/>


			</div>
		</>
	)
}