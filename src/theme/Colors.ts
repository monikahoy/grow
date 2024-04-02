const BasicColors = {
  blueGreen: '#88C0D0',
  lightBlueGreen: '#CEE5EC',
  ligthBlack: '#2E3440',
  blueGrey: '#4C566A',
  blue: '#052D5F',
  darkBlue: '#010D1D',
  darkGrey: '#434C5E',
  lightGrey: '#abacaa',
  lightBlue: '#F8FBFF',
  white: '#FCFCFC',
  purple: '#6835F2',
  darkpurple: '#1A084D',
  lightpurple: '#DFD4FE',
  purpleGradient: '#7E51F8',
};

const NamedColors = {
  //brand: Colors.blueGreen,
  background: BasicColors.lightBlue,
  buttonBackground: BasicColors.purple,
  inactiveButtonBackground: BasicColors.lightpurple,
  border: BasicColors.lightGrey,
  // Text
  basicText: BasicColors.darkBlue,
  secondaryText: BasicColors.blue,
  headerText: BasicColors.darkpurple,
  placeholderText: BasicColors.lightGrey,
  inactiveButtonText: BasicColors.darkGrey,
};

const Colors = {
  ...BasicColors,
  ...NamedColors,
};

export default Colors;
