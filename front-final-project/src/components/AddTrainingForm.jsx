import { useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import {
	Button, Snackbar, Dialog, TextField,
	DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import dayjs from "dayjs";
import { DatePicker } from "rsuite";

export default function AddTrainingForm(props) {


	const [training, setTraining] = useState({
		date: null, duration: '', activity: '', customerlink: ''
	})


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSaveTrainingButton = () => {
		props.func(training)
		handleClose()
	}

	const handleInputChange = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value })
	}

	return (
		<div className="ag-theme-material" style={{ width: 900, height: 400 }}>


			<Button onClick={handleClickOpen} >
				Add Session
			</Button>


			< Dialog
				open={open}
				onClose={handleClose}
			>

				<DialogTitle>Add training </DialogTitle>
				< DialogContent >

					<DialogContentText>
						Add a new training session to the database by entering its information.
					</DialogContentText>

					{/* EVENT IS THE TEXTFIELD OBJECT */}
					<TextField
						required
						name="date"
						value={training.date}
          				type="datetime-local"
						onChange={event => handleInputChange(event)
						}
					/>
					< TextField
						required
						name="duration" label="Duration"
						value={training.duration}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>

					< TextField
						required
						name="activity" label="Activity"
						value={training.activity}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					

				</DialogContent>
				< DialogActions >
					< Button onClick={handleSaveTrainingButton} > Add Training Session </Button>
					<Button onClick={handleClose}> Cancel </Button>

				</DialogActions>
			</Dialog>

		</div>
	)


}