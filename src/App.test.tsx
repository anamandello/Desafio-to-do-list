import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'

describe('na tela da lista de tarefas', () => {
  const newTexts = [
    'Estudar ReactJs',
    'Revisar ReactJs',
  ]

  test('a lista começa vazia', () => {
    render(<App />)

    const emptyList = screen.getByText('Você ainda não tem tarefas cadastradas')

    expect(emptyList).toBeInTheDocument()
  })

  test('é possível adicionar uma nova task', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })
      fireEvent.click(buttonAddTask)
    })

    const listTask = screen.getAllByRole('task')

    listTask.map((task, index) => {
      expect(task.textContent).toBe(newTexts[index])
    })
  })

  test('é possível apagar uma task', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })
      fireEvent.click(buttonAddTask)
    })

    const listTask = screen.getAllByRole('task')
    const buttonExcluir = screen.getAllByRole('trash')

    fireEvent.click(buttonExcluir[0])

    expect(listTask[0]).not.toBeInTheDocument()
    expect(listTask[1]).toBeInTheDocument()
  })

  test('é possível dar check na task', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })

      fireEvent.click(buttonAddTask)
    })

    const listCheckbox = screen.getAllByRole('checkbox')

    fireEvent.click(listCheckbox[0])

    expect(listCheckbox[0]).toHaveAttribute('data-state', 'checked')
    expect(listCheckbox[1]).toHaveAttribute('data-state', 'unchecked')
  })

  test('é possível dar uncheck na task', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })

      fireEvent.click(buttonAddTask)
    })

    const listCheckbox = screen.getAllByRole('checkbox')

    listCheckbox.map(checkTask => {
      fireEvent.click(checkTask)
    })

    listCheckbox.map((task, index) => {
      expect(listCheckbox[index]).toHaveAttribute('data-state', 'checked')
    })

    listCheckbox.map(checkTask => {
      fireEvent.click(checkTask)
    })

    listCheckbox.map((task, index) => {
      expect(listCheckbox[index]).toHaveAttribute('data-state', 'unchecked')
    })
  })

  test('é possível apagar uma task com check', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })

      fireEvent.click(buttonAddTask)
    })

    const listCheckbox = screen.getAllByRole('checkbox')

    listCheckbox.map(checkTask => {
      fireEvent.click(checkTask)
    })

    const listTask = screen.getAllByRole('task')
    const buttonExcluir = screen.getAllByRole('trash')

    fireEvent.click(buttonExcluir[1])

    expect(listTask[0]).toBeInTheDocument()
    expect(listTask[1]).not.toBeInTheDocument()
  })

  test('contagem das tasks criadas', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })

      fireEvent.click(buttonAddTask)
    })

    const listTask = screen.getAllByRole('task')
    const contagemTotalTask = screen.getByRole('TotalTasks')

    expect(contagemTotalTask.textContent).toBe((listTask.length).toString())
  })

  test('contagem das tasks criadas e concluídas', () => {
    render(<App />)

    const inputAddTask = screen.getByPlaceholderText('Adicione uma nova tarefa')
    const buttonAddTask = screen.getByRole('button')

    newTexts.map(task => {
      fireEvent.change(inputAddTask, {
        target: {
          value: task
        }
      })

      fireEvent.click(buttonAddTask)
    })

    const listTask = screen.getAllByRole('task')

    const listCheckbox = screen.getAllByRole('checkbox')

    listCheckbox.map(checkTask => {
      fireEvent.click(checkTask)
    })
    
    const contagemTasksConcluidas = screen.getByRole('ProgressTasks')

    expect(contagemTasksConcluidas.textContent).toBe(`${(listCheckbox.length).toString()} de ${(listTask.length).toString()}`)

    fireEvent.click(listCheckbox[0])
    
    expect(contagemTasksConcluidas.textContent).toBe(`1 de ${(listTask.length).toString()}`)
  })
})