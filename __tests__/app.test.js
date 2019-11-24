import { mount } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import App from '../components/App'
import Room from '../components/Room'

test('renders the page', () => {
  const div = document.createElement('div')

  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('matches snapshot of a selectable room', () => {
  const room = {
    adults: 1,
    children: 0,
    selected: false,
  }

  const component = renderer.create(
    <Room
      key={1}
      room={room}
      number={1}
      handleChange={() => {}}
      updateRooms={() => {}}
    />
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('matches snapshot of room number 1, which is always selected abnd cannot be unselected', () => {
  const room = {
    adults: 1,
    children: 0,
    selected: true,
  }

  const component = renderer.create(
    <Room
      key={0}
      room={room}
      number={0}
      handleChange={() => {}}
      updateRooms={() => {}}
    />
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('updates a selected room', () => {
  let isSelected = false
  const room = {
    adults: 1,
    children: 0,
    selected: isSelected,
  }

  const component = mount(
    <Room
      key={1}
      room={room}
      number={1}
      handleChange={(roomNumber, event) => {
        isSelected = true
      }}
      updateRooms={() => {}}
    />
  )

  const roomCheckbox = component.find('input[type="checkbox"]')

  roomCheckbox.simulate('change', { target: { checked: true } })
  expect(isSelected).toEqual(true)
})

test('updates an unselected room', () => {
  let isSelected = true
  const room = {
    adults: 1,
    children: 0,
    selected: isSelected,
  }

  const component = mount(
    <Room
      key={1}
      room={room}
      number={1}
      handleChange={(roomNumber, event) => {
        isSelected = false
      }}
      updateRooms={() => {}}
    />
  )

  const roomCheckbox = component.find('input[type="checkbox"]')

  roomCheckbox.simulate('change', { target: { checked: false } })
  expect(isSelected).toEqual(false)
})

test('updates the selected room adults count', () => {
  let adultCount = 1
  const room = {
    adults: adultCount,
    children: 0,
    selected: true,
  }

  const component = mount(
    <Room
      key={1}
      room={room}
      number={1}
      handleChange={() => {}}
      updateRooms={(event, type, roomNumber) => {
        adultCount = event.target.value
      }}
    />
  )

  const adultSelect = component.find('select[name="adults"]')

  adultSelect.simulate('change', { target: { value: 2 } })
  expect(adultCount).toEqual(2)
})

test('updates the selected room children count', () => {
  let childrenCount = 0
  const room = {
    adults: 1,
    children: childrenCount,
    selected: true,
  }

  const component = mount(
    <Room
      key={1}
      room={room}
      number={1}
      handleChange={() => {}}
      updateRooms={(event, type, roomNumber) => {
        childrenCount = event.target.value
      }}
    />
  )

  const childrenSelect = component.find('select[name="children"]')

  childrenSelect.simulate('change', { target: { value: 1 } })
  expect(childrenCount).toEqual(1)
})
