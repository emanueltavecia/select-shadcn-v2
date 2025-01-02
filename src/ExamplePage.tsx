import { useState } from 'react'

import { AlarmCheck, AArrowUp, BookDownIcon, Activity } from 'lucide-react'

import { Select, Option, OptionsGrouped } from './components/select'

const options: Option[] = [
  { label: 'First Option', value: 'first' },
  {
    label: 'Second Option',
    value: '5',
    icon: <AlarmCheck />,
  },
  { label: 'Third Option', value: 'third' },
  { label: 'Fourth Option', value: 'fourth', icon: <Activity /> },
  { label: 'Fifth Option', value: 'fifth' },
  { label: 'Sixth Option', value: 'sixth' },
  { label: 'Seventh Option', value: 'seventh' },
  { label: 'Eighth Option', value: 'eighth' },
]

const optionsGrouped: OptionsGrouped[] = [
  {
    groupName: 'Group 1',
    options: [
      { label: 'First Option', value: 'first', icon: <AlarmCheck /> },
      {
        label:
          'Second Option Second Option Second Option Second OptionSecond OptionSecond OptionSecond OptionSecond OptionSecond Second Option Second Option Second Option Second OptionSecond OptionSecond OptionSecond OptionSecond OptionSecond Option',
        value: 'second',
        icon: <AlarmCheck />,
      },
      { label: 'Third Option', value: 'third', icon: <AlarmCheck /> },
      { label: 'Fourth Option', value: 'fourth', icon: <Activity /> },
      { label: 'Fifth Option', value: 'fifth', icon: <AlarmCheck /> },
      { label: 'Sixth Option', value: 'sixth', icon: <AlarmCheck /> },
      { label: 'Seventh Option', value: 'seventh', icon: <AlarmCheck /> },
      { label: 'Eighth Option', value: 'eighth', icon: <AlarmCheck /> },
    ],
  },
  {
    groupName: 'Group 2',
    options: [
      { label: 'First Option1', value: 'first1', icon: <AlarmCheck /> },
      {
        label:
          'Second Option Second Option Second Option Second OptionSecond OptionSecond OptionSecond OptionSecond OptionSecond Second Option Second Option Second Option Second OptionSecond OptionSecond OptionSecond OptionSecond OptionSecond Option1',
        value: 'second1',
        icon: <AlarmCheck />,
      },
      { label: 'Third Option1', value: 'third1', icon: <AlarmCheck /> },
      { label: 'Fourth Option1', value: 'fourth1', icon: <Activity /> },
      { label: 'Fifth Option1', value: 'fifth1', icon: <AlarmCheck /> },
      { label: 'Sixth Option1', value: 'sixth1', icon: <AlarmCheck /> },
      { label: 'Seventh Option1', value: 'seventh1', icon: <AlarmCheck /> },
      { label: 'Eighth Option1', value: 'eighth1', icon: <AlarmCheck /> },
    ],
  },
]

export function ExamplePage() {
  const [value, setValue] = useState<string[]>()

  return (
    <div className="grid grid-cols-2 justify-center gap-2 px-20">
      <Select
        options={options}
        selected={value}
        onSelect={(value) => setValue(value)}
        placeholder="Select..."
        allDescription="Todos"
        allSelectedDescription="All Selected"
        useClear
        useAll
        multiple
        triggerDescriptionLastSeparator=" and "
        allowNoSelection={true}
        allIcon={<AArrowUp />}
        selectIcon={<BookDownIcon />}
        searchPlaceholder="Search..."
        useSearch
      />

      <Select
        options={optionsGrouped}
        selected={value}
        onSelect={(value) => setValue(value)}
        placeholder="Select..."
        allDescription="Todos"
        allSelectedDescription="All Selected"
        useClear
        useAll
        multiple
        triggerDescriptionLastSeparator=" and "
        allowNoSelection={true}
        allIcon={<AArrowUp />}
        selectIcon={<BookDownIcon />}
        searchPlaceholder="Search..."
        useSearch
        animate={false}
        useShadcnStyle={false}
      />
    </div>
  )
}
