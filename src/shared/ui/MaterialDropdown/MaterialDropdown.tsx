import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './MaterialDropdown.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

type Props = {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options?: string[];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  searchable?: boolean;
};

export const MaterialDropdown = memo(({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  error = false,
  helperText = '',
  fullWidth = true,
  size = 'medium',
  searchable = false,
}: Props) => {
  const labelId = `${id}-label`;
  const widthRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const hasClearButton = Boolean(value) && !disabled;

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText.trim()) return options;

    const lower = searchText.toLowerCase();
    return options.filter((opt) => String(opt).toLowerCase().includes(lower));
  }, [options, searchText, searchable]);

  const MenuProps = useMemo(() => ({
    disableAutoFocusItem: true,
    disableAutoFocus: true,
    disableEnforceFocus: true,
    disableRestoreFocus: true,
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
        width: menuWidth,
      },
    },
    MenuListProps: {
      disableListWrap: true,
    },
  }), [menuWidth]);

  const clearChangeValueHandler = useCallback(() => {
    if (value !== '') {
      onChange({ target: { value: '', name } } as SelectChangeEvent<string>);
      setSearchText('');
    }
  }, [value, onChange, name]);

  const handleOpen = useCallback(() => {
    const width = widthRef.current?.offsetWidth;
    if (width) setMenuWidth(width);
    setOpen(true);

    if (searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchable]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchText('');
  }, []);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  const handleSearchKeyDown = useCallback((event: KeyboardEvent<Element>) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  return (
    <div ref={widthRef} className={styles.wrapper}>
      <FormControl
        fullWidth={fullWidth}
        disabled={disabled}
        error={error}
        size={size}
      >
        <InputLabel id={labelId}>
          {label}
        </InputLabel>

        <Select
          labelId={labelId}
          id={id}
          value={value ?? ''}
          label={label}
          onChange={onChange}
          name={name}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          MenuProps={MenuProps}
        >
          {searchable && (
            <MenuItem
              disableRipple
              onKeyDown={handleSearchKeyDown}
              sx={{
                p: 0,
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: '#363636',
              }}
            >
              <input
                ref={searchInputRef}
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                placeholder="Поиск..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  outline: 'none',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  background: '#363636',
                  boxSizing: 'border-box',
                  color: 'white',
                }}
              />
            </MenuItem>
          )}

          {filteredOptions.length > 0
            ? filteredOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))
            : (
              <MenuItem disabled>
                Ничего не найдено
              </MenuItem>
            )}
        </Select>

        {hasClearButton && (
          <IconButton
            size="small"
            onClick={clearChangeValueHandler}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Очистить поле"
            sx={{
              position: 'absolute',
              right: 32,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              padding: '2px',
              color: 'action.active',
              '&:hover': { color: 'error.main' },
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}

        {helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
});