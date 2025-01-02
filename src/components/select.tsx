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

interface TriggerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  noSelectionClassName?: string
  noSelectionStyle?: React.CSSProperties
}

interface TriggerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  noSelectionClassName?: string
  noSelectionStyle?: React.CSSProperties
}

interface ClearButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconProps?: React.ComponentProps<typeof X>
}

interface SearchContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  inputProps?: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
  iconProps?: React.ComponentProps<typeof Search>
}

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  emptyMessageProps?: React.HTMLAttributes<HTMLDivElement>
}

interface GroupProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  notFirstClassName?: string
}

interface ItemProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    'selected'
  > {
  selectedClassName?: string
  selectedStyle?: React.CSSProperties
  checkIconProps?: React.ComponentProps<typeof Check>
  itemSpacingClassName?: string
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

  triggerButtonProps?: TriggerButtonProps
  triggerTextProps?: TriggerTextProps
  clearButtonProps?: ClearButtonProps
  popoverContentProps?: ComponentPropsWithoutRef<
    typeof PopoverPrimitive.Content
  >
  commandProps?: ComponentPropsWithoutRef<typeof CommandPrimitive>
  searchContainerProps?: SearchContainerProps
  listProps?: ListProps
  groupProps?: GroupProps
  itemProps?: ItemProps
}

/**
 * A custom Select component that supports single and multiple selections,
 * optional search functionality, and various customization options.
 *
 * @param {Object} props - The properties for the Select component.
 * @param {Array} props.options - The options to display in the select dropdown.
 * @param {Array} props.selected - The currently selected options.
 * @param {Function} props.onSelect - Callback function to handle selection changes.
 * @param {Function} [props.setIsAllSelected] - Callback function to set the "all selected" state.
 * @param {boolean} [props.multiple] - Whether multiple selections are allowed.
 * @param {boolean} [props.useClear] - Whether to show a clear button.
 * @param {boolean} [props.useAll] - Whether to include an "All" option.
 * @param {string} [props.allDescription='Select All'] - Description for the "All" option.
 * @param {string} [props.allSelectedDescription] - Description when all options are selected.
 * @param {ReactNode} [props.allIcon] - Icon for the "All" option.
 * @param {ReactNode} [props.selectIcon] - Icon for the select trigger button.
 * @param {boolean} [props.useSearch] - Whether to include a search input.
 * @param {string} [props.searchPlaceholder] - Placeholder text for the search input.
 * @param {string} [props.emptyMessage='No options found'] - Message to display when no options are found.
 * @param {string} [props.placeholder='Select...'] - Placeholder text for the select trigger button.
 * @param {boolean} [props.allowNoSelection=true] - Whether to allow no selection.
 * @param {string} [props.triggerDescriptionSeparator=', '] - Separator for multiple selected options.
 * @param {string} [props.triggerDescriptionLastSeparator] - Separator for the last selected option.
 * @param {number} [props.selectWidth=300] - Width of the select dropdown.
 * @param {boolean} [props.animate=true] - Whether to animate the dropdown.
 * @param {boolean} [props.useShadcnStyle=true] - Whether to use Shadcn styles.
 * @param {Object} [props.triggerButtonProps] - Additional props for the trigger button.
 * @param {Object} [props.triggerTextProps] - Additional props for the trigger text.
 * @param {Object} [props.clearButtonProps] - Additional props for the clear button.
 * @param {Object} [props.popoverContentProps] - Additional props for the popover content.
 * @param {Object} [props.commandProps] - Additional props for the command component.
 * @param {Object} [props.searchContainerProps] - Additional props for the search container.
 * @param {Object} [props.listProps] - Additional props for the list component.
 * @param {Object} [props.groupProps] - Additional props for the group component.
 * @param {Object} [props.itemProps] - Additional props for the item component.
 *
 * @returns {JSX.Element} The rendered Select component.
 */

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

  triggerButtonProps,
  triggerTextProps,
  clearButtonProps,
  popoverContentProps,
  commandProps,
  searchContainerProps,
  listProps,
  groupProps,
  itemProps,
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

  const Group = ({ className, ...props }: GroupProps) => (
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
    selectedClassName,
    selectedStyle,
    checkIconProps,
    itemSpacingClassName,
    style,
    ...props
  }: Option &
    ItemProps & {
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
        selected &&
          (useShadcnStyle
            ? 'bg-gray-200/70 dark:bg-gray-900'
            : selectedClassName),
        itemSpacingClassName,
        className,
      )}
      style={{
        ...(selected ? selectedStyle : {}),
        ...style,
      }}
      {...props}
    >
      {icon}
      <span className="w-full text-left">{label}</span>
      <Check
        className={cn('h-4 w-4', selected ? 'opacity-100' : 'opacity-0')}
        {...checkIconProps}
      />
    </CommandPrimitive.Item>
  )

  const allOption = (
    <Item
      value="ALL"
      label={allDescription}
      icon={allIcon}
      selected={isAllSelected}
      {...itemProps}
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
              (useShadcnStyle
                ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                : triggerButtonProps?.noSelectionClassName),
            triggerButtonProps?.className,
          )}
          style={{
            ...(!selected?.length ? triggerButtonProps?.noSelectionStyle : {}),
            ...triggerButtonProps?.style,
          }}
          {...triggerButtonProps}
        >
          {selectIcon}
          <span
            className={cn(
              'w-full overflow-hidden text-ellipsis text-nowrap text-left',
              triggerTextProps?.className,
              !selected?.length && triggerTextProps?.noSelectionClassName,
            )}
            style={{
              ...(!selected?.length ? triggerTextProps?.noSelectionStyle : {}),
              ...triggerTextProps?.style,
            }}
            {...triggerTextProps}
          >
            {getTriggerDescription()}
          </span>
          {selected?.length && useClear ? (
            <span
              onClick={handleClear}
              className={cn(
                useShadcnStyle &&
                  'p-0 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 [&_svg]:size-3.5',
                clearButtonProps?.className,
              )}
              style={clearButtonProps?.style}
              {...clearButtonProps}
            >
              <X
                className={cn(
                  'mr-px shrink-0',
                  clearButtonProps?.iconProps?.className,
                )}
                {...clearButtonProps?.iconProps}
              />
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
            popoverContentProps?.className,
          )}
          style={{
            width: selectWidth,
            ...popoverContentProps?.style,
          }}
          align="start"
          sideOffset={4}
          id="select"
          {...popoverContentProps}
        >
          <CommandPrimitive
            className={cn(
              useShadcnStyle &&
                'flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-gray-950 dark:bg-gray-950 dark:text-gray-50',
              commandProps?.className,
            )}
            {...commandProps}
          >
            {useSearch && (
              <div
                className={cn(
                  'flex items-center border-b px-3 dark:border-gray-800',
                  searchContainerProps?.className,
                )}
                style={searchContainerProps?.style}
                // eslint-disable-next-line react/no-unknown-property
                cmdk-input-wrapper=""
                {...searchContainerProps}
              >
                <Search
                  className={cn(
                    'mr-2 h-4 w-4 shrink-0 opacity-50',
                    searchContainerProps?.iconProps?.className,
                  )}
                  {...searchContainerProps?.iconProps}
                />
                <CommandPrimitive.Input
                  placeholder={searchPlaceholder}
                  className={cn(
                    useShadcnStyle &&
                      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-400',
                    searchContainerProps?.inputProps?.className,
                  )}
                  {...searchContainerProps?.inputProps}
                />
              </div>
            )}

            <CommandPrimitive.List
              className={cn(
                'max-h-[300px] overflow-y-auto overflow-x-hidden',
                listProps?.className,
              )}
              style={listProps?.style}
              {...listProps}
            >
              <CommandPrimitive.Empty
                className={cn(
                  'pb-5 pt-6 text-center text-sm',
                  listProps?.emptyMessageProps?.className,
                )}
                style={listProps?.emptyMessageProps?.style}
                {...listProps?.emptyMessageProps}
              >
                {emptyMessage}
              </CommandPrimitive.Empty>

              {options.every((option) => 'groupName' in option) ? (
                <>
                  {useAll && <Group {...groupProps}>{allOption}</Group>}

                  {options.map((option, i) => (
                    <Group
                      key={i}
                      heading={option.groupName}
                      className={cn(
                        !i && 'pt-0',
                        groupProps?.className,
                        !i && groupProps?.notFirstClassName,
                      )}
                      {...groupProps}
                    >
                      {option.options.map((groupedOption, i) => (
                        <Item
                          key={groupedOption.value}
                          value={groupedOption.value}
                          label={groupedOption.label}
                          icon={groupedOption.icon}
                          itemSpacingClassName={cn((i || useAll) && 'mt-1')}
                          selected={selected?.includes(groupedOption.value)}
                          {...itemProps}
                        />
                      ))}
                    </Group>
                  ))}
                </>
              ) : (
                <Group {...groupProps}>
                  {useAll && allOption}

                  {options.map(
                    (option, i) =>
                      !('groupName' in option) && (
                        <Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          icon={option.icon}
                          itemSpacingClassName={cn((i || useAll) && 'mt-1')}
                          selected={selected?.includes(option.value)}
                          {...itemProps}
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
