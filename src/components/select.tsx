'use client'

import { useState, useMemo, useEffect, MouseEvent, ReactNode } from 'react'

import { Check, ChevronDown, X } from 'lucide-react'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

import { cn } from '../lib/utils'

export type Option<T = unknown> = T & {
  value: string
  label: string
  icon?: ReactNode
}

export type OptionsGrouped<T = unknown> = {
  groupName: string
  options: Option<T>[]
}

export interface SelectProps {
  options: (Option | OptionsGrouped)[]
  selected: string[] | undefined
  onSelect: (value: string[]) => void
  setIsAllSelected?: (isAllSelected: boolean) => void
  multiple?: boolean
  useClear?: boolean
  useAll?: boolean
  allDescription?: string
  allSelectedDescription?: string
  allIcon?: ReactNode
  selectIcon?: ReactNode
  useSearch?: boolean
  searchPlaceholder?: string
  emptyMessage?: string | ReactNode
  placeholder: string
  allowNoSelection?: boolean
  triggerDescriptionSeparator?: string
  triggerDescriptionLastSeparator?: string
  selectWidth?: number
}

export function Select({
  options,
  selected,
  onSelect,
  setIsAllSelected,
  multiple,
  useClear,
  useAll,
  allDescription = 'Select All',
  allSelectedDescription,
  allIcon,
  selectIcon,
  useSearch,
  searchPlaceholder,
  emptyMessage = 'No options found',
  placeholder = 'Select...',
  allowNoSelection = true,
  triggerDescriptionSeparator = ', ',
  triggerDescriptionLastSeparator,
  selectWidth = 300,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  const flattenedOptions = useMemo(() => {
    return options.flatMap((option) =>
      'groupName' in option ? option.options : [option],
    )
  }, [options])

  const isAllSelected: boolean = useMemo(() => {
    if (useAll && selected?.includes('ALL')) {
      return true
    }
    const allOptionValues = flattenedOptions.map((opt) => opt.value)
    return selected?.length === allOptionValues.length
  }, [useAll, selected, flattenedOptions])

  const getTriggerDescription = () => {
    const formattedOptions = flattenedOptions
      .filter((option) => selected?.includes(option.value))
      .map((option) => option.label)

    const result =
      formattedOptions.length > 1
        ? `${formattedOptions.slice(0, -1).join(triggerDescriptionSeparator)}${triggerDescriptionLastSeparator || triggerDescriptionSeparator}${formattedOptions.slice(-1)}`
        : formattedOptions.join('')

    return isAllSelected && allSelectedDescription
      ? allSelectedDescription
      : selected?.length
        ? result
        : placeholder
  }

  useEffect(() => {
    if (setIsAllSelected) {
      setIsAllSelected(isAllSelected)
    }
  }, [isAllSelected, setIsAllSelected])

  const handleSelect = (value: string) => {
    if (!multiple) {
      if (!allowNoSelection && selected?.includes(value)) {
        return
      }
      const newSelected = selected?.includes(value) ? [] : [value]
      onSelect(newSelected)
      setOpen(false)
      return
    }

    if (value === 'ALL') {
      if (isAllSelected) {
        if (allowNoSelection) {
          onSelect([])
        }
      } else {
        onSelect(flattenedOptions.map((opt) => opt.value))
      }
    } else {
      const isSelected = selected?.includes(value)
      const newSelected = isSelected
        ? selected?.filter((item) => item !== value)
        : [...(selected || []), value]

      if (!allowNoSelection && newSelected?.length === 0) {
        onSelect(flattenedOptions.map((opt) => opt.value))
      } else {
        onSelect(newSelected || [])
      }
    }
  }

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onSelect([])
    setOpen(false)
  }

  const allOption = (
    <CommandItem
      value={`${allDescription} ALL`}
      onSelect={() => handleSelect('ALL')}
      className={cn(
        'justify-between',
        isAllSelected && 'bg-gray-200/70 dark:bg-gray-900',
      )}
    >
      {allIcon}
      <span className="w-full text-left">{allDescription}</span>
      <Check
        className={cn('h-4 w-4', isAllSelected ? 'opacity-100' : 'opacity-0')}
      />
    </CommandItem>
  )

  const OptionItem = ({ value, label, icon, i }: Option & { i: number }) => (
    <CommandItem
      key={value}
      value={`${label} ${value}`}
      onSelect={() => handleSelect(value)}
      className={cn(
        'justify-between',
        selected?.includes(value) && 'bg-gray-200/70 dark:bg-gray-900',
        (i || useAll) && 'mt-1',
      )}
    >
      {icon}
      <span className="w-full text-left">{label}</span>
      <Check
        className={cn(
          'h-4 w-4',
          selected?.includes(value) ? 'opacity-100' : 'opacity-0',
        )}
      />
    </CommandItem>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm font-normal shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:hover:bg-gray-900/50',
            !selected?.length &&
              'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
          )}
        >
          {selectIcon}
          <span className="w-full overflow-hidden text-ellipsis text-nowrap text-left">
            {getTriggerDescription()}
          </span>
          {selected?.length && useClear ? (
            <span
              onClick={handleClear}
              className="p-0 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 [&_svg]:size-3.5"
            >
              <X className="mr-px shrink-0" />
            </span>
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        id="select"
        style={{ width: selectWidth }}
      >
        <Command>
          {useSearch && <CommandInput placeholder={searchPlaceholder} />}

          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>

            {options.every((option) => 'groupName' in option) ? (
              <>
                {useAll && <CommandGroup>{allOption}</CommandGroup>}

                {options.map((option, i) => (
                  <CommandGroup
                    key={i}
                    heading={option.groupName}
                    className={cn(!i && 'pt-0')}
                  >
                    {option.options.map((groupedOption, i) => (
                      <OptionItem
                        key={groupedOption.value}
                        value={groupedOption.value}
                        label={groupedOption.label}
                        icon={groupedOption.icon}
                        i={i}
                      />
                    ))}
                  </CommandGroup>
                ))}
              </>
            ) : (
              <CommandGroup>
                {useAll && allOption}

                {options.map(
                  (option, i) =>
                    !('groupName' in option) && (
                      <OptionItem
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        icon={option.icon}
                        i={i}
                      />
                    ),
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
