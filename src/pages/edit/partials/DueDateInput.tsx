import React, { FC, useState } from "react";
import { Note } from "../../../constants/notes";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Box, Typography } from "@mui/material";
import moment from "moment";

export type DueDateInputProps = {
	note: Note;
	setNote: React.Dispatch<React.SetStateAction<Note>>;
};

export const DueDateInput: FC<DueDateInputProps> = ({ note, setNote }) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		new Date(note.dueDate)
	);

	const handleDateChange = (newDate: Date | null) => {
		setSelectedDate(newDate);
		setNote((prev) => ({
			...prev,
			dueDate: newDate === null ? "" : newDate.toDateString(),
		}));
	};

	return (
		<Box display="flex" width={1} alignItems="center" gap={1}>
			<Typography fontWeight="bolt">Due date: </Typography>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label="Select date"
					value={selectedDate}
					format="dd/MM/yyyy"
					onChange={handleDateChange}
				/>
			</LocalizationProvider>
		</Box>
	);
};
