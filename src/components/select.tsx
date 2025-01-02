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

export interface SelectProps {
  options: Option[]
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
  searchPlaceholder?: string
  emptyMessage?: string | ReactNode
  placeholder: string
  allowNoSelection?: boolean
  triggerDescriptionSeparator?: string
  triggerDescriptionLastSeparator?: string
}

export function Select({
  options,
  selected,
  onSelect,
  setIsAllSelected,
  multiple = false,
  useClear = false,
  useAll = false,
  allDescription = 'Select All',
  allSelectedDescription,
  allIcon,
  selectIcon,
  searchPlaceholder,
  emptyMessage = 'No options found',
  placeholder = 'Select...',
  allowNoSelection = true,
  triggerDescriptionSeparator = ', ',
  triggerDescriptionLastSeparator,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  const isAllSelected: boolean = useMemo(() => {
    return (
      selected?.length === options.length ||
      selected?.some((selected) => selected === 'ALL') ||
      false
    )
  }, [selected, options])

  const getTriggerDescription = () => {
    const formattedOptions = options
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
      onSelect([value])
      setOpen(false)
      return
    }

    if (value === 'ALL') {
      if (isAllSelected) {
        onSelect([])
      } else {
        onSelect(options.map((opt) => opt.value))
      }
    } else {
      const isSelected = selected?.includes(value)
      const newSelected = isSelected
        ? selected?.filter((item) => item !== value)
        : [...(selected || []), value]

      if (!allowNoSelection && newSelected?.length === 0) {
        onSelect(options.map((opt) => opt.value))
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
      <PopoverContent className="w-full p-0" align="start" id="select">
        <Command>
          {searchPlaceholder && (
            <CommandInput placeholder={searchPlaceholder} />
          )}
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {useAll && (
                <CommandItem
                  value="ALL"
                  onSelect={() => handleSelect('ALL')}
                  className={cn(
                    'justify-between',
                    isAllSelected && 'bg-gray-200/70 dark:bg-gray-900',
                  )}
                >
                  {allIcon}
                  <span className="w-full text-left">{allDescription}</span>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      isAllSelected ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              )}

              {options.map((option, i) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    'justify-between',
                    selected?.includes(option.value) &&
                      'bg-gray-200/70 dark:bg-gray-900',
                    (i || useAll) && 'mt-1',
                  )}
                >
                  {option.icon}
                  <span className="w-full text-left">{option.label}</span>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected?.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
