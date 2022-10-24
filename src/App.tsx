import styles from './App.module.css'
import { Header } from './components/Header'
import { AddTask } from './components/AddTask'
import { TaskProgress } from './components/TaskProgress'
import Clipboard from '././assets/Clipboard.svg'
import './global.css'
import { Task } from './components/Task'
import { useEffect, useState } from 'react'

interface TaskListProps{
  id: string;
  text: string;
  isCheck: boolean;
}

function App() {
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [tasksList, setTasksList] = useState<TaskListProps[]>([])
  const [numberTasks, setNumberTask] = useState([0, 0])

  useEffect(() => {
    countNumberTasks();
    if(tasksList.length === 0)
      setIsEmptyList(true)
    else if(tasksList.length > 0 && isEmptyList === true)
      setIsEmptyList(false)
  }, [tasksList])

  const countNumberTasks = () => {
    setNumberTask(
      [
        tasksList.filter(item => 
          item.isCheck === true).length
        ,
        tasksList.length
      ]
    )
  }

  const handleAddTasks = (task: TaskListProps) => {
    setTasksList([...tasksList, task])
  }

  const handleCheckTask = (id: string) => {
    setTasksList(() => tasksList.map(item => {
      if(item.id === id)
        return {...item, isCheck:!item.isCheck}
      else
        return item
    }))
  }

  const handleDeleteTask = (id: string) => {
    setTasksList(() => tasksList.filter(item => {
      return item.id != id
    }))
  }

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <AddTask addNewTask={handleAddTasks}/>
        <div className={styles.containerTasks}>
          <div className={styles.tasksProgress}>
            <TaskProgress text="Tarefas criadas" total={numberTasks[1]} color='blue'/>
            <TaskProgress text="Concluídas" total={numberTasks[1]} completed={numberTasks[0]} color='purple'/>
          </div>
          <div className={styles.muralTasks}>
            {isEmptyList &&
              <div className={styles.emptyTasks}>
                <img src={Clipboard} alt="" />
                <p><strong>Você ainda não tem tarefas cadastradas</strong><br/>
                Crie tarefas e organize seus itens a fazer</p>
              </div>
            }
            {!isEmptyList &&
              <div>
                {tasksList.map(item => (
                  <Task key={item.id} text={item.text} id={item.id} isCheck={item.isCheck} checking={handleCheckTask} deleting={handleDeleteTask}/>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
