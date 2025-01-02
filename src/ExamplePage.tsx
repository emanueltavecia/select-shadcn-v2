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
    <div className="flex flex-col gap-5">
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
          useShadcnStyle={false}
          triggerButtonProps={{
            className:
              'flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50',
            noSelectionClassName: 'text-gray-400',
          }}
          triggerTextProps={{
            className: 'flex-1 text-left truncate',
          }}
          clearButtonProps={{
            className: 'ml-2 text-gray-400 hover:text-gray-600',
            iconProps: {
              className: 'h-4 w-4',
            },
          }}
          popoverContentProps={{
            className:
              'bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden',
          }}
          commandProps={{
            className: 'w-full',
          }}
          searchContainerProps={{
            className: 'border-b border-gray-200 p-2',
            inputProps: {
              className: 'w-full bg-transparent outline-none text-sm',
            },
            iconProps: {
              className: 'h-4 w-4 text-gray-400',
            },
          }}
          listProps={{
            className: 'max-h-[300px] overflow-auto p-1',
            emptyMessageProps: {
              className: 'text-center text-sm text-gray-500 p-4',
            },
          }}
          itemProps={{
            className:
              'flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100 cursor-pointer',
            selectedClassName: 'bg-blue-50 text-blue-600',
            checkIconProps: {
              className: 'ml-auto h-4 w-4',
            },
          }}
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
          triggerButtonProps={{
            style: {
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              gap: 10,
            },
            noSelectionStyle: {
              color: '#94a3b8',
            },
          }}
          triggerTextProps={{
            style: {
              flex: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
          clearButtonProps={{
            style: {
              marginLeft: '8px',
              color: '#94a3b8',
              cursor: 'pointer',
            },
            iconProps: {
              style: {
                width: '16px',
                height: '16px',
              },
            },
          }}
          popoverContentProps={{
            sideOffset: 10,
            style: {
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            },
          }}
          searchContainerProps={{
            style: {
              padding: '8px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
            },
            inputProps: {
              style: {
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '14px',
              },
            },
            iconProps: {
              style: {
                width: '16px',
                height: '16px',
                color: '#94a3b8',
              },
            },
          }}
          groupProps={{
            style: {
              padding: '4px',
            },
          }}
          listProps={{
            style: {
              maxHeight: '300px',
              overflow: 'auto',
            },
            emptyMessageProps: {
              style: {
                textAlign: 'center',
                padding: '16px',
                color: '#64748b',
                fontSize: '14px',
              },
            },
          }}
          itemProps={{
            style: {
              display: 'flex',
              alignItems: 'center',
              padding: '6px 8px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
            },
            selectedStyle: {
              backgroundColor: '#eff6ff',
              color: '#2563eb',
            },
            checkIconProps: {
              style: {
                marginLeft: 'auto',
                width: '16px',
                height: '16px',
              },
            },
          }}
        />
      </div>
    </div>
  )
}
