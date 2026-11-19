import { memo } from 'react';

import Button from '@mui/material/Button';

import styles from './MaterialButton.module.scss';

type Props = {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  variant?: 'outlined' | 'contained' | 'text';
};

export const MaterialButton = memo(({
  name,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  variant = 'outlined',
}: Props) => (
  <Button
    className={styles.button}
    variant={variant}
    disabled={disabled}
    onClick={onClick}
    type={type}
    fullWidth={fullWidth}
  >
    {name}
  </Button>
));