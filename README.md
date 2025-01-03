# React Select Component

A highly customizable and feature-rich select component for React applications, inspired by the components from shadcn/ui. This component supports single and multiple selections, grouped options, search functionality, and extensive styling options via props and Tailwind CSS (optional).

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Styling](#styling)
- [Props](#props)
- [Types](#types)

## Features

- 🔍 Searchable options
- ✨ Single and multiple selection modes
- 📑 Support for grouped options
- 🎨 Customizable styling (with Tailwind CSS or inline props)
- 🌗 Dark mode support
- 🎯 "Select All" functionality
- 🧹 Clear selection option
- 🎉 Animations
- ♿ Accessibility features
- 🎨 Icon support for options
- 💅 Style customization via props

## Installation

The component can be added to your project in two ways:

### Option 1: Install via NPM

```bash
npm i select-shadcn-v2
```

### Option 2: Copy the Component

Copy the `Select` component from `src/components/select.tsx` and include it in your project. Ensure you install the required dependencies:

```bash
npm install @radix-ui/react-popover cmdk lucide-react
```

### Note:
- Tailwind CSS is **optional**. You can customize styles using inline CSS or by leveraging the component props.

## Usage

### Basic Setup

```tsx
import { Select, Option } from 'select-shadcn-v2'

const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

function App() {
  const [selected, setSelected] = useState<string>([])

  return (
    <Select
      options={options}
      selected={selected}
      onSelect={setSelected}
      placeholder="Choose an option"
    />
  );
}
```

## Examples

### Single Selection

```jsx
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  selected={selected}
  onSelect={setSelected}
  placeholder="Select one"
/>
```

### Multiple Selection with Search

```jsx
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
  selected={selected}
  onSelect={setSelected}
  multiple
  useSearch
  searchPlaceholder="Search options..."
/>
```

### Grouped Options

```jsx
<Select
  options={[
    {
      groupName: 'Group 1',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ],
    },
    {
      groupName: 'Group 2',
      options: [
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
      ],
    },
  ] as OptionsGrouped[]}
  selected={selected}
  onSelect={setSelected}
/>
```

### Icon Support

```jsx
import { Activity, User, Settings } from 'lucide-react'

<Select
  options={[
    { value: 'user', label: 'User', icon: <User /> },
    { value: 'settings', label: 'Settings', icon: <Settings /> },
  ]}
  selected={selected}
  onSelect={setSelected}
  selectIcon={<Activity />}
/>
```

## Styling

While Tailwind CSS provides default styling, you can also use inline styles or custom CSS. Styling customization options include:

- Toggling default shadcn styles with `useShadcnStyle`.
- Overriding styles using props like `triggerButtonProps`, `popoverContentProps`, etc.
- Applying utility classes directly through props.

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `(Option \| OptionsGrouped)[]` | Required | Array of options or grouped options to display |
| `selected` | `string[]` | Required | Array of selected option values |
| `onSelect` | `(value: string[]) => void` | Required | Callback function when selection changes |
| `multiple` | `boolean` | `false` | Enable multiple selection mode |
| `placeholder` | `string` | `'Select...'` | Placeholder text when no option is selected |

### Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `useSearch` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `undefined` | Placeholder text for search input |
| `useClear` | `boolean` | `false` | Show clear selection button |
| `useAll` | `boolean` | `false` | Show "Select All" option |
| `allowNoSelection` | `boolean` | `true` | Allow deselecting all options |
| `animate` | `boolean` | `true` | Enable animations |
| `useShadcnStyle` | `boolean` | `true` | Use shadcn-style Tailwind classes |

### Customization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectWidth` | `number` | `300` | Width of the select dropdown in pixels |
| `allDescription` | `string` | `'Select All'` | Text for "Select All" option |
| `allSelectedDescription` | `string` | `undefined` | Text shown when all options are selected |
| `allIcon` | `ReactNode` | `undefined` | Icon for "Select All" option |
| `selectIcon` | `ReactNode` | `undefined` | Icon shown in trigger button |
| `emptyMessage` | `string \| ReactNode` | `'No options found'` | Message shown when no options match search |
| `triggerDescriptionSeparator` | `string` | `', '` | Separator between selected items |
| `triggerDescriptionLastSeparator` | `string` | `undefined` | Separator before last selected item |

### Style Override Props

| Prop | Type | Description |
|------|------|-------------|
| `triggerButtonProps` | `TriggerButtonProps` | Props for trigger button |
| `triggerTextProps` | `TriggerTextProps` | Props for trigger text |
| `clearButtonProps` | `ClearButtonProps` | Props for clear button |
| `popoverContentProps` | `PopoverContentProps` | Props for popover content |
| `commandProps` | `CommandProps` | Props for command component |
| `searchContainerProps` | `SearchContainerProps` | Props for search container |
| `listProps` | `ListProps` | Props for options list |
| `groupProps` | `GroupProps` | Props for option groups |
| `itemProps` | `ItemProps` | Props for individual items |

## Types

### Option
```typescript
type Option<T = unknown> = T & {
  value: string
  label: string
  icon?: ReactNode
}
```

### OptionsGrouped
```typescript
type OptionsGrouped<T = unknown> = {
  groupName: string
  options: Option<T>[]
}
```
