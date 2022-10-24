import styles from './Task.module.css'
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, Trash } from 'phosphor-react';

interface taskProps {
  id: string;
  isCheck: boolean;
  text: string;
  checking: (id: string) => void;
  deleting: (id: string) => void;
}

export function Task({id, text, isCheck, checking, deleting}: taskProps){
  const handleModifyCheck = () => {
    checking(id);
  }

  const handleDeleteTask = () => {
    deleting(id)
  }

  return(
    <div>
      <label htmlFor="" className={styles.container}>
          <Checkbox.Root className={styles.checking} data-state={isCheck ? "checked" : "unchecked"} checked={isCheck} onClick={handleModifyCheck}>
            <Checkbox.Indicator className={styles.checkingOn}> 
              <Check size={10}/>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <p>{text}</p>
          <div className={styles.containerTrash}>
            <div className={styles.trash} onClick={handleDeleteTask}>
              <Trash size={16}/>
            </div>
          </div>
      </label>
    </div>
  )
}