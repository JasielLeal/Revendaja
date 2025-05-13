// components/ui/CustomSelect.tsx
import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils' // ou substitua por sua função de merge de classes

type Option = {
    label: string
    value: string
}

interface CustomSelectProps {
    placeholder?: string
    options: Option[]
    value: string
    onValueChange: (value: string) => void
}

export function CustomSelect({
    placeholder = 'Selecione uma opção',
    options,
    value,
    onValueChange,
}: CustomSelectProps) {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
            >
                <Select.Value
                    placeholder={placeholder}
                    className="text-gray-400"
                />
                <Select.Icon>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="z-50 mt-1 rounded-md border border-gray-200 bg-white p-1 text-sm shadow-lg w-[var(--radix-select-trigger-width)]"
                    position="popper"
                >
                    <Select.Viewport className="max-h-60 overflow-auto w-full">
                        {options.map((option) => (
                            <Select.Item
                                key={option.value}
                                value={option.value}
                                className={cn(
                                    "relative flex cursor-pointer w-full select-none items-center rounded-md px-3 py-2 text-gray-700 focus:bg-blue-100 focus:outline-none data-[state=checked]:font-semibold"
                                )}
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute right-3">
                                    <Check className="h-4 w-4 text-blue-600" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
