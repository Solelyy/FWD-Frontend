'use client'

import { useEffect, useId, useState } from 'react'

import { LoaderCircleIcon, SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void
}

const SearchBar = ({value, onChange}: SearchBarProps) => {
  const [settledValue, setSettledValue] = useState(value)

  const id = useId();

  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => {
        setSettledValue(value)
      }, 500)

      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setSettledValue("")
    }, 0)

    return () => clearTimeout(timer)
  }, [value])

  const isLoading = value !== settledValue

  return (
    <div className='w-full max-w-xs gap-2 sm:min-w-64'>
      <Label htmlFor={id}></Label>
      <div className='relative'>
        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
          <SearchIcon className='size-4' />
          <span className='sr-only'>Search</span>
        </div>
        <Input
          id={id}
          type='search'
          placeholder='Search by ID or name...'
          value={value}
          onChange={e => onChange(e.target.value)}
          className='peer h-9 rounded-lg border-border/80 bg-muted/20 px-9 shadow-none transition-colors focus-visible:bg-background [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
        />
        {isLoading && (
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <LoaderCircleIcon className='size-4 animate-spin' />
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar;