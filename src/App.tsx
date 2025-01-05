import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard, deleteBoard, addTask, deleteTask, updateTask, moveTask } from './redux/boardSlice';
import { RootState } from './redux/store';
import { useDrag, useDrop } from 'react-dnd';

const Task = ({ task, columnId, boardId }: { task: any; columnId: string; boardId: string }) => {
	const dispatch = useDispatch();
	const [ , drag ] = useDrag({
		type: 'TASK',
		item: { taskId: task.id, fromColumnId: columnId, boardId }
	});

	const handleDelete = () => {
		dispatch(deleteTask({ boardId, columnId, taskId: task.id }));
	};

	const handleEdit = () => {
		const newTaskName = prompt('Edit Task Name', task.name);
		const newDescription = prompt('Edit Task Description', task.description);
		if (newTaskName && newDescription) {
			const updatedTask = { ...task, name: newTaskName, description: newDescription };
			dispatch(updateTask({ boardId, columnId, task: updatedTask }));
		}
	};

	return (
		<div
			ref={drag}
			className={`task ${task.priority.toLowerCase()}`}
			style={{
				backgroundColor: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'
			}}
		>
			<h3>{task.name}</h3>
			<p>{task.description}</p>
			<p>Assignee: {task.assignee}</p>
			<p>Due Date: {task.dueDate}</p>
			<button onClick={handleEdit}>Edit</button>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

const Column = ({ column, boardId }: { column: any; boardId: string }) => {
	const dispatch = useDispatch();
	const [ { isOver }, drop ] = useDrop({
		accept: 'TASK',
		drop: (item: any) => {
			const { taskId, fromColumnId } = item;
			dispatch(moveTask({ boardId, fromColumnId, toColumnId: column.id, taskId }));
		},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	});

	return (
		<div
			ref={drop}
			className={`column ${isOver ? 'highlight' : ''}`}
			style={{ padding: 10, border: '1px solid black', marginRight: 10 }}
		>
			<h2>{column.name}</h2>
			{column.tasks.map((task: any) => <Task key={task.id} task={task} columnId={column.id} boardId={boardId} />)}
		</div>
	);
};

const App = () => {
	const dispatch = useDispatch();
	const boards = useSelector((state: RootState) => state.board.boards);
	const [ boardName, setBoardName ] = useState('');
	const [ taskDetails, setTaskDetails ] = useState({
		name: '',
		description: '',
		assignee: '',
		priority: 'High',
		dueDate: ''
	});
	const [ selectedColumnId, setSelectedColumnId ] = useState<string>('');

	const handleAddBoard = () => {
		if (boardName) {
			dispatch(
				addBoard({
					id: Date.now().toString(),
					name: boardName,
					columns: [
						{ id: '1', name: 'To-Do', tasks: [] },
						{ id: '2', name: 'In Progress', tasks: [] },
						{ id: '3', name: 'Done', tasks: [] }
					]
				})
			);
			setBoardName('');
		}
	};

	const handleAddTask = () => {
		if (taskDetails.name && taskDetails.dueDate && selectedColumnId) {
			const task = {
				id: Date.now().toString(),
				...taskDetails
			};
			// Dynamically pass the columnId and boardId
			const boardId = boards[0].id; // For now, adding to the first board
			dispatch(addTask({ boardId, columnId: selectedColumnId, task }));
			setTaskDetails({
				name: '',
				description: '',
				assignee: '',
				priority: 'High',
				dueDate: ''
			});
			setSelectedColumnId(''); // Reset column selection
		}
	};

	const handleDeleteBoard = (boardId: string) => {
		dispatch(deleteBoard(boardId));
	};

	return (
		<div className="container">
			<h1 className='heading'>Kanban Board Application</h1>
			<div className="flex items-center space-x-4 mb-4" style={{ gap: '20px' }}>
				<input
					type="text"
					placeholder="Board Name"
					value={boardName}
					onChange={(e) => setBoardName(e.target.value)}
					className="input-field"
				/>
				<button className="add-button" onClick={handleAddBoard}>
					Add Board
				</button>
			</div>
			{boards.map((board) => (
				<div key={board.id}>
					<h1>{board.name}</h1>
					<div className="flex">
						{board.columns.map((column: any) => (
							<Column key={column.id} column={column} boardId={board.id} />
						))}
					</div>

					<button
						onClick={() => handleDeleteBoard(board.id)}
						className="delete-btn bg-red-500 text-white px-4 py-2 ml-2"
						style={{ backgroundColor: 'red' }}
					>
						Delete Board
					</button>

					<div>
						<h3>Add Task</h3>
						<input
							type="text"
							value={taskDetails.name}
							onChange={(e) => setTaskDetails({ ...taskDetails, name: e.target.value })}
							placeholder="Task Name"
						/>
						<textarea
							value={taskDetails.description}
							onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
							placeholder="Task Description"
						/>
						<input
							type="text"
							value={taskDetails.assignee}
							onChange={(e) => setTaskDetails({ ...taskDetails, assignee: e.target.value })}
							placeholder="Assignee"
						/>
						<select
							value={taskDetails.priority}
							onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
						>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
						<input
							type="date"
							value={taskDetails.dueDate}
							onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })}
						/>
						<select value={selectedColumnId} onChange={(e) => setSelectedColumnId(e.target.value)}>
							<option value="">Select Column</option>
							{board.columns.map((column: any) => (
								<option key={column.id} value={column.id}>
									{column.name}
								</option>
							))}
						</select>
						<button onClick={handleAddTask}>Add Task</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
