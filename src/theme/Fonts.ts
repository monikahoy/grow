const BasicFonts = {
  MONTSERRAT_REGULAR: 'Montserrat-Regular',
  PACIFICO_REGULAR: 'Pacifico-Regular',
  MONTESERRAT_LIGHT: 'Montserrat-Light',
  MONTSERRAT_SEMIBOLD: 'Montserrat-SemiBold',
  MONTSERRAT_BOLD: 'Montserrat-Bold',
  OPEN_SANS_REGULAR: 'OpenSans-Regular',
  OPEN_SANS_SEMIBOLD: 'OpenSans-SemiBold',
};

const NamedFonts = {
  headerFont: BasicFonts.PACIFICO_REGULAR,
  titleFont: BasicFonts.MONTSERRAT_SEMIBOLD,
  subtitleFont: BasicFonts.MONTSERRAT_REGULAR,
  bodyFont: BasicFonts.MONTSERRAT_REGULAR,
  cardFont: BasicFonts.MONTSERRAT_REGULAR,
  buttonFont: BasicFonts.MONTSERRAT_SEMIBOLD,
};

const Fonts = {
  ...BasicFonts,
  ...NamedFonts,
};

export default Fonts;
