import { memo } from 'react';
import type { ChangeEvent } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './MaterialInput.module.scss';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear?: () => void;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  /** HTML-тип поля (например 'password') */
  type?: string;
};

export const MaterialInput = memo(({
  name,
  label,
  placeholder,
  value,
  onChange,
  onClear,
  multiline = false,
  rows,
  disabled = false,
  error = false,
  helperText = '',
  type = 'text',
}: Props) => {

  const clearChangeValueHandler = () => {
    if (value !== '') {
      if (onClear) {
        onClear();
      } else {
        onChange({ target: { value: '', name } } as ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const hasClearButton = Boolean(value) && !disabled;

  return (
    <TextField
      name={name}
      className={styles.wrapper}
      label={label}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      error={error}
      helperText={helperText}
      type={type}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
      }}
      slotProps={{
        input: {
          endAdornment: hasClearButton && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => clearChangeValueHandler()}
                edge="end"
                size="small"
                aria-label="Очистить поле"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
});