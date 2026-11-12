import type { ComponentType, CSSProperties } from 'react';

import styles from './Icons.module.scss';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const icons: Record<string, ComponentType> = {
  home: HomeOutlinedIcon,
  world: PublicOutlinedIcon,
  list: ListOutlinedIcon,
  setting: SettingsOutlinedIcon,
  add: AddOutlinedIcon,
  delete: DeleteOutlinedIcon,
  close: CloseOutlinedIcon,
  favorites_add: BookmarkAddOutlinedIcon,
  favorites_delete: BookmarkRemoveOutlinedIcon,
  download: DownloadOutlinedIcon,
  arrow_up: ArrowDropUpOutlinedIcon,
  arrow_down: ArrowDropDownOutlinedIcon,
  arrow_left: ArrowLeftOutlinedIcon,
  arrow_right: ArrowRightOutlinedIcon,
  person: PersonOutlinedIcon,
  admin_panel: AdminPanelSettingsOutlinedIcon,
};

type Props = {
  icon_name: string;
  style?: CSSProperties;
  cb?: () => void;
};

export const Icons = ({ icon_name, style, cb }: Props) => {
  const Icon = icons[icon_name];

  return (
    <div
      className={styles.wrapper}
      onClick={cb}
      style={style}
    >
      {Icon ? <Icon /> : null}
    </div>
  );
}