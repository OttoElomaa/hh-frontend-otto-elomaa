import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import {
	Button, Snackbar, Dialog, TextField,
	DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@mui/material";

export default function AddCarForm() {


	const [cars, setCars] = useState([{
		brand: '', model: '',
		color: '', fuel: '',
		modelYear: '', price: ''
	}])


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="ag-theme-material" style={{ width: 900, height: 400 }}>


			<Button onClick={handleClickOpen} >
				Open form dialog
			</Button>


			< Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: (event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						const email = formJson.email;
						console.log(email);
						handleClose();
					},
				}
				}
			>
				<DialogTitle>Subscribe </DialogTitle>
				< DialogContent >
					<DialogContentText>
						Add a new car to the database by entering its information.
					</DialogContentText>
					< TextField
						required
						id="brand"
						name="brand"
						label="Brand"
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				< DialogActions >
					<Button onClick={handleClose}> Cancel </Button>
					< Button type="submit" > Subscribe </Button>
				</DialogActions>
			</Dialog>

		</div>
	)


}