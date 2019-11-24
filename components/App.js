import React, { useEffect, useState } from 'react'

import Room from './Room'

const App = () => {
  const [rooms, setRooms] = useState([
    {
      _id: 1,
      adults: 1,
      children: 0,
      selected: true,
    },
    {
      _id: 2,
      adults: 1,
      children: 0,
      selected: false,
    },
    {
      _id: 3,
      adults: 1,
      children: 0,
      selected: false,
    },
    {
      _id: 4,
      adults: 1,
      children: 0,
      selected: false,
    },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!testStorage()) return false

    if (localStorage['rooms']) {
      const data = JSON.parse(localStorage.getItem('rooms'))
      setRooms(data)
    }
  }, [])

  const testStorage = () => {
    const test = 'test'

    try {
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (error) {
      console.error('localStorage is not available.')
      return false
    }
  }

  const handleChange = (roomNumber, event) => {
    const roomsState = [...rooms]
    const isCheckbox = event.target.type === 'checkbox'
    const checkedRoom = roomsState[roomNumber]
    const boolean = !checkedRoom.selected
    let i = 3

    if (isCheckbox) {
      while (i >= 1) {
        if (boolean) {
          if (i <= roomNumber) {
            roomsState[i].selected = true
          }
        } else {
          if (i >= roomNumber) {
            roomsState[i].selected = false
            roomsState[i].adults = 1
            roomsState[i].children = 0
          }
        }
        i--
      }
      setRooms(roomsState)
      handleSubmit()
    }
  }

  const updateRooms = (event, type, roomNumber) => {
    const roomsState = [...rooms]
    roomsState[roomNumber][type] = event.target.value
    setRooms(roomsState)
  }

  const handleSubmit = () => {
    if (!testStorage()) return false

    localStorage.setItem('rooms', JSON.stringify(rooms))
  }

  return (
    <>
      <form method="post" className="w-full max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-start bg-gray-400 rounded px-2 -mx-3 my-6">
          {rooms.map((room, index) => {
            return (
              <Room
                key={index}
                room={room}
                number={index}
                handleChange={handleChange}
                updateRooms={updateRooms}
              />
            )
          })}
        </div>
        <button
          className="bg-transparent hover:bg-indigo-600 border-4 border-indigo-600 hover:border-indigo-600 text-indigo-600 hover:text-white text-lg font-bold uppercase tracking-wide py-3 px-12 -ml-4 rounded"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default App
