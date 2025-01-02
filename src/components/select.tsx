'use client'

import {
  useState,
  useMemo,
  useEffect,
  MouseEvent,
  ReactNode,
  ComponentPropsWithoutRef,
} from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Command as CommandPrimitive } from 'cmdk'
import { Check, ChevronDown, X, Search } from 'lucide-react'

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
  animate?: boolean
  useShadcnStyle?: boolean
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
  animate = true,
  useShadcnStyle = true,
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

  const Group = ({
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) => (
    <CommandPrimitive.Group
      className={cn(
        useShadcnStyle &&
          'overflow-hidden p-1 text-gray-950 dark:text-gray-50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 dark:[&_[cmdk-group-heading]]:text-gray-400',
        className,
      )}
      {...props}
    />
  )

  const Item = ({
    value,
    label,
    icon,
    className,
    selected,
    ...props
  }: Option &
    ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
      selected: boolean | undefined
    }) => (
    <CommandPrimitive.Item
      key={value}
      value={`${label} ${value}`}
      onSelect={() => handleSelect(value)}
      className={cn(
        'flex select-none',
        useShadcnStyle &&
          'relative cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-all duration-100 data-[disabled=true]:pointer-events-none data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 data-[disabled=true]:opacity-50 dark:data-[selected=true]:bg-gray-900/70 dark:data-[selected=true]:text-gray-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        selected && 'bg-gray-200/70 dark:bg-gray-900',
        className,
      )}
      {...props}
    >
      {icon}
      <span className="w-full text-left">{label}</span>
      <Check
        className={cn('h-4 w-4', selected ? 'opacity-100' : 'opacity-0')}
      />
    </CommandPrimitive.Item>
  )

  const allOption = (
    <Item
      value="ALL"
      label={allDescription}
      icon={allIcon}
      selected={isAllSelected}
    />
  )

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls="select"
          className={cn(
            'flex h-9 w-full items-center justify-center gap-2',
            useShadcnStyle &&
              'whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm font-normal shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900/50 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
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
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            useShadcnStyle &&
              'z-50 rounded-md border border-gray-200 bg-white p-0 text-gray-950 shadow-md outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50',
            animate &&
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          )}
          align="start"
          sideOffset={4}
          id="select"
          style={{ width: selectWidth }}
        >
          <CommandPrimitive
            className={cn(
              useShadcnStyle &&
                'flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-gray-950 dark:bg-gray-950 dark:text-gray-50',
            )}
          >
            {useSearch && (
              <div
                className="flex items-center border-b px-3 dark:border-gray-800"
                // eslint-disable-next-line react/no-unknown-property
                cmdk-input-wrapper=""
              >
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandPrimitive.Input
                  placeholder={searchPlaceholder}
                  className={cn(
                    useShadcnStyle &&
                      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-400',
                  )}
                />
              </div>
            )}

            <CommandPrimitive.List
              className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden')}
            >
              <CommandPrimitive.Empty className="pb-5 pt-6 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>

              {options.every((option) => 'groupName' in option) ? (
                <>
                  {useAll && <Group>{allOption}</Group>}

                  {options.map((option, i) => (
                    <Group
                      key={i}
                      heading={option.groupName}
                      className={cn(!i && 'pt-0')}
                    >
                      {option.options.map((groupedOption, i) => (
                        <Item
                          key={groupedOption.value}
                          value={groupedOption.value}
                          label={groupedOption.label}
                          icon={groupedOption.icon}
                          className={cn((i || useAll) && 'mt-1')}
                          selected={selected?.includes(groupedOption.value)}
                        />
                      ))}
                    </Group>
                  ))}
                </>
              ) : (
                <Group>
                  {useAll && allOption}

                  {options.map(
                    (option, i) =>
                      !('groupName' in option) && (
                        <Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          icon={option.icon}
                          className={cn((i || useAll) && 'mt-1')}
                          selected={selected?.includes(option.value)}
                        />
                      ),
                  )}
                </Group>
              )}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
