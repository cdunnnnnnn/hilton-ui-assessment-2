import React from 'react'

const Room = ({
  number,
  room: { adults, children, selected },
  handleChange,
  updateRooms,
}) => {
  const disabled = number === 0 ? false : !selected

  return (
    <div
      disabled={disabled}
      className={
        'w-full h-full md:w-1/2 lg:w-1/4 py-4 px-2  mb-6 md:mb-0' +
        (disabled ? ' cursor-not-allowed' : '')
      }
    >
      <div
        className={
          'w-full h-full rounded p-3' +
          (disabled ? ' bg-gray-500' : ' bg-gray-800')
        }
      >
        {number < 1 ? (
          <label className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-2">
            Room 1
          </label>
        ) : (
          <label
            htmlFor={`selected-${number + 1}`}
            className={
              'block uppercase tracking-wide text-gray-500 text-lg font-bold mb-2' +
              (disabled ? ' text-gray-600' : '')
            }
          >
            <input
              type="checkbox"
              selected
              id={`selected-${number + 1}`}
              className="mr-2 leading-tight"
              checked={selected}
              onChange={event => handleChange(number, event)}
            />
            Room {number + 1}
          </label>
        )}
        <fieldset disabled={disabled} aria-disabled={disabled}>
          <label
            htmlFor={`adults-${number + 1}`}
            className={
              'block uppercase tracking-wide text-xs font-bold mb-2' +
              (disabled
                ? ' cursor-not-allowed text-gray-300'
                : ' text-gray-200')
            }
          >
            Adults (18+)
          </label>
          <div className="relative pb-3">
            <select
              name="adults"
              id={`adults-${number + 1}`}
              className={
                'block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' +
                (disabled
                  ? ' cursor-not-allowed text-gray-500'
                  : ' text-gray-700')
              }
              value={adults}
              onChange={event => updateRooms(event, 'adults', number)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <label
            htmlFor={`children-${number + 1}`}
            className={
              'block uppercase tracking-wide text-xs font-bold mb-2' +
              (disabled
                ? ' cursor-not-allowed text-gray-300'
                : ' text-gray-200')
            }
          >
            Children (0-17)
          </label>
          <div className="relative pb-3">
            <select
              name="children"
              id={`children-${number + 1}`}
              className={
                'block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' +
                (disabled
                  ? ' cursor-not-allowed text-gray-500'
                  : ' text-gray-700')
              }
              value={children}
              onChange={event => updateRooms(event, 'children', number)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </fieldset>
      </div>
    </div>
  )
}

export default Room
