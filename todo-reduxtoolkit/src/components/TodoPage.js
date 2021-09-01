import React from 'react'
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import TotalCompleteItems from './TotalCompleteItems';

export const TodoPage = () => {
    return (
        <div>
            <h1>My Todo List</h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems /> 
        </div>
    )
}
