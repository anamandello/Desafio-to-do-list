import { useEffect, useState } from 'react';
import styles from './TaskProgress.module.css'

interface TaskProps {
  text: string;
  total: number;
  concluida?: number
  color: 'blue' | 'purple';
}

export function TaskProgress({ text, total, color, concluida}: TaskProps){
  const [cor, setCor]= useState('var(--white)');
  const [isConcluida, setIsConcluida] = useState(false)

  useEffect(() => {
    if(typeof(concluida) !== 'undefined')
      setIsConcluida(true)

    switch(color){
      case 'blue':
        setCor('var(--blue-300)')
        console.log(cor)
        break;
      case 'purple':
        setCor('var(--purple-300)')
        console.log(cor)
        break
      default:
        setCor('var(--white)')
        console.log(cor)
        break;
      }
  },[])


  return(
    <div>
      <div className={styles.task}>
        <span style={{color: cor}}>{text}</span>
        <div className={styles.contador}>
          {isConcluida &&
            <span>{concluida} de {total}</span>
          }
          {!isConcluida &&
            <span>{total}</span>
          } 
        </div>       
      </div>
    </div>
  )
}