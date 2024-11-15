import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import {
	Button, Snackbar, Dialog, TextField,
	DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@mui/material";

export default function AddCarForm(props) {


	const [car, setCar] = useState({
		brand: '', model: '',
		color: '', fuel: '',
		modelYear: '', price: ''
	})


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSaveCarButton = () => {
		props.func(car)
		handleClose()
	}

	const handleInputChange = (event) => {
		setCar({ ...car, [event.target.name]: event.target.value })
	}

	return (
		<div className="ag-theme-material" style={{ width: 900, height: 400 }}>


			<Button onClick={handleClickOpen} >
				Add Car Form
			</Button>


			< Dialog
				open={open}
				onClose={handleClose}
			>

				<DialogTitle>Add car </DialogTitle>
				< DialogContent >
				
					<DialogContentText>
						Add a new car to the database by entering its information.
					</DialogContentText>

					{/* EVENT IS THE TEXTFIELD OBJECT */}
					< TextField
						required
						name="brand"
						label="Brand"
						value={car.brand}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="model"
						label="Model"
						value={car.model}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>


				</DialogContent>
				< DialogActions >
					< Button onClick={handleSaveCarButton} > Add Car </Button>
					<Button onClick={handleClose}> Cancel </Button>

				</DialogActions>
			</Dialog>

		</div>
	)


}