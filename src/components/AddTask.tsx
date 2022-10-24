import styles from './AddTask.module.css'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TaskListProps{
  id: string;
  text: string;
  isCheck: boolean;
}

interface AddTaskProps {
  addNewTask: (task: TaskListProps) => void
}

export function AddTask({addNewTask}: AddTaskProps){
  const [valueText, setValueText] = useState<string>('')

  const handleValueText = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value
    setValueText(valor);
  }

  const handleAddNewTask = (event: FormEvent) => {
    event.preventDefault()
    const newTask:TaskListProps  = {
      id: uuidv4(),
      text: valueText,
      isCheck: false
    }
    if(newTask.text.length > 0){
      addNewTask(newTask)
      setValueText('')
    }
  }

  return(
    <div className={styles.container}>
      <form className={styles.form} action="">
        <input 
          type="text" 
          placeholder='Adicione uma nova tarefa'
          value={valueText}
          onChange={handleValueText}
        />
        <button 
        onClick={handleAddNewTask}
        type='submit'>
          <span>Criar</span>
          <PlusCircle size={16}/>
        </button>
      </form>
    </div>
  )
}