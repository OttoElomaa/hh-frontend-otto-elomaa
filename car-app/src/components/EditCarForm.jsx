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





}