import { useEffect, useState } from 'react';
import styles from './TaskProgress.module.css'

interface TaskProps {
  text: string;
  total: number;
  completed?: number;
  color: 'blue' | 'purple';
}

export function TaskProgress({ text, total, color, completed}: TaskProps){
  const [colorText, setColorText]= useState('var(--white)');
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if(typeof(completed) !== 'undefined')
      setIsCompleted(true)

    switch(color){
      case 'blue':
        setColorText('var(--blue-300)')
        break;
      case 'purple':
        setColorText('var(--purple-300)')
        break
      default:
        setColorText('var(--white)')
        break;
      }
  },[])


  return(
    <div>
      <div className={styles.task}>
        <span style={{color: colorText}}>{text}</span>
        <div className={styles.counter}>
          {isCompleted &&
            <span role='ProgressTasks'>{completed} de {total}</span>
          }
          {!isCompleted &&
            <span role='TotalTasks'>{total}</span>
          } 
        </div>       
      </div>
    </div>
  )
}