import React, { FC, useState } from "react";
import { Task } from "../../../constants/tasks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Box, Typography } from "@mui/material";
import moment from "moment";

export type DueDateInputProps = {
	task: Task;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
};

export const DueDateInput: FC<DueDateInputProps> = ({ task, setTask }) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		new Date(task.dueDate)
	);

	const handleDateChange = (newDate: Date | null) => {
		setSelectedDate(newDate);
		setTask((prev) => ({
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
