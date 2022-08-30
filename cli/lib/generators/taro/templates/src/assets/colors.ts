import styles from './styles/colors.scss'

export type GlobalColorsType =
  | 'primaryColor'
  | 'warningColor'
  | 'tagColor'
  | 'icon1Color'
  | 'icon2Color'
  | 'borderColor'
  | 'bgColor'
  | 'bgColor2'
  | 'titleColor'
  | 'textColor'
  | 'tipColor'
  | 'noticeColor'
  | 'errorColor'

export default styles as Record<GlobalColorsType, string>
