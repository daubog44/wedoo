import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import { AppIcon } from '../../lib/icons'
import { cn } from '../../lib/site-utils'

type SearchFieldProps = {
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  value: string
}

export function SearchField({
  className,
  onChange,
  placeholder,
  value,
}: SearchFieldProps) {
  return (
    <label
      className={cn(
        'flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-[0_20px_45px_-35px_rgba(16,25,36,0.55)]',
        className,
      )}
    >
      <AppIcon className="text-xl text-slate-400" name="search-line" />
      <input
        className="w-full border-none bg-transparent text-sm text-brand-ink outline-none placeholder:text-slate-400"
        onChange={onChange}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </label>
  )
}

type FieldShellProps = {
  children: ReactNode
  helper?: string
  label: string
}

export function FieldShell({ children, helper, label }: FieldShellProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-brand-ink">{label}</span>
      {children}
      {helper ? <span className="text-xs text-slate-500">{helper}</span> : null}
    </label>
  )
}

export function TextField(
  props: InputHTMLAttributes<HTMLInputElement> & {
    helper?: string
    label: string
  },
) {
  const { className, helper, label, ...inputProps } = props

  return (
    <FieldShell helper={helper} label={label}>
      <input
        className={cn(
          'rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm text-brand-ink outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-violet',
          className,
        )}
        {...inputProps}
      />
    </FieldShell>
  )
}

export function TextAreaField(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    helper?: string
    label: string
  },
) {
  const { className, helper, label, ...inputProps } = props

  return (
    <FieldShell helper={helper} label={label}>
      <textarea
        className={cn(
          'min-h-32 rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm text-brand-ink outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-violet',
          className,
        )}
        {...inputProps}
      />
    </FieldShell>
  )
}
