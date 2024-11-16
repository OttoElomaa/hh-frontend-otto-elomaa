import { useEffect } from "react";
import { useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import {
	Button, Snackbar, Dialog, TextField,
	DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@mui/material";

export default function EditCarForm(props) {


	const [car, setCar] = useState({
		brand: '', model: '',
		color: '', fuel: '',
		modelYear: '', price: ''
	})


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		console.log(props.params.data)
		setCar(props.params.data)
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
		<div>


			<Button onClick={handleClickOpen} >
				Edit 
			</Button>


			< Dialog
				open={open}
				onClose={handleClose}
			>

				<DialogTitle>Edit car </DialogTitle>
				< DialogContent >
				
					<DialogContentText>
						Edit a car to the database by entering its information.
					</DialogContentText>

					{/* EVENT IS THE TEXTFIELD OBJECT */}
					< TextField
						required
						name="brand" label="Brand"
						value={car.brand}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="model" label="Model"
						value={car.model}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="color" label="Color"
						value={car.color}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="fuel" label="Fuel"
						value={car.fuel}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="modelYear" label="Year"
						value={car.modelYear}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="price" label="Price"
						value={car.price}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>


				</DialogContent>
				< DialogActions >
					< Button onClick={handleSaveCarButton} > Save Car </Button>
					<Button onClick={handleClose}> Cancel </Button>

				</DialogActions>
			</Dialog>

		</div>
	)


}