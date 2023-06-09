import { useState } from 'react'
import { useRoundRobin } from './useRoundRobin'

const procesos = [
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Calculadora',
    tiempoLlegada: 0,
    rafagaCPU: 3
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Word',
    tiempoLlegada: 1,
    rafagaCPU: 4
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Paint',
    tiempoLlegada: 3,
    rafagaCPU: 6
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'Excel',
    tiempoLlegada: 5,
    rafagaCPU: 5
  },
  {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0],
    nombre: 'PowerPoint',
    tiempoLlegada: 4,
    rafagaCPU: 3
  }
]

export default function useApp ({ toast }) {
  const [isStarted, setIsStarted] = useState(false)
  const [listaProcesos, setListaProcesos] = useState([])
  const [quantumActual, setQuantumActual] = useState(2)

  const addData = ({ nombre, tiempoLlegada, rafagaCPU }) => {
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0]
    const newTiempoLlegada = parseInt(tiempoLlegada)
    const newRafagaCPU = parseInt(rafagaCPU)
    const nuevaListaProcesos = [...listaProcesos, { id, nombre, tiempoLlegada: newTiempoLlegada, rafagaCPU: newRafagaCPU }]
    setListaProcesos(nuevaListaProcesos)
  }

  const startProgram = () => {
    if (listaProcesos.length === 0) {
      toast.error('No hay datos para iniciar el programa')
      return
    }

    if (quantumActual < 1) {
      toast.error('El quantum debe ser mayor a 0')
      return
    }

    setIsStarted(true)

    toast.success('Programa iniciado')
  }

  const resetProgram = () => {
    window.location.reload()
  }

  const setExampleData = () => {
    setListaProcesos(procesos)
  }

  const setQuantum = (quantum) => {
    const newQuantum = parseInt(quantum)
    if (newQuantum < 1) {
      toast.error('El quantum debe ser mayor a 0')
      return
    }
    setQuantumActual(newQuantum)
  }

  const {
    procesosCola,
    enProceso,
    promedioTiempoServicio,
    promedioTiempoEspera,
    promedioIndice,
    tiempo,
    listaTerminados,
    listaProcesosInicial
  } = useRoundRobin({ listaProcesos, isStarted })

  return {
    isStarted,
    addData,
    startProgram,
    resetProgram,
    promedioTiempoServicio,
    promedioTiempoEspera,
    promedioIndice,
    listaProcesos,
    preProcesos: listaProcesos,
    listaCola: procesosCola,
    listaTerminados,
    tiempo,
    quantumActual,
    setQuantum,
    procesoActual: enProceso,
    listaProcesosInicial,
    setExampleData
  }
}
