import { useState } from 'react'

import { Option, Select } from './components/select'

const options: Option[] = [
  { label: 'First Option', value: 'first' },
  { label: 'Second Option', value: 'second' },
  { label: 'Third Option', value: 'third' },
  { label: 'Fourth Option', value: 'fourth' },
  { label: 'Fifth Option', value: 'fifth' },
  { label: 'Sixth Option', value: 'sixth' },
  { label: 'Seventh Option', value: 'seventh' },
  { label: 'Eighth Option', value: 'eighth' },
]

export function ExamplePage() {
  const [value, setValue] = useState<string[]>()

  return (
    <Select
      options={options}
      selected={value}
      onSelect={(value) => setValue(value)}
      placeholder="Select..."
      allDescription="All"
      allSelectedDescription="All Selected"
      useClear
      useAll
      multiple
      triggerDescriptionLastSeparator=" and "
    />
  )
}
