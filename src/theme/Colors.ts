const BasicColors = {
  blueGreen: '#88C0D0',
  lightBlueGreen: '#CEE5EC',
  ligthBlack: '#2E3440',
  blueGrey: '#4C566A',
  blue: '#5E81AC',
  darkGrey: '#434C5E',
  lightGrey: '#C8C8C8',
  lightBlue: '#D8DEE9',
  white: '#FCFCFC',
};

const NamedColors = {
  //brand: Colors.blueGreen,
  background: BasicColors.white,
  buttonBackground: BasicColors.blueGreen,
  inactiveButtonBackground: BasicColors.lightBlueGreen,
  border: BasicColors.lightBlue,
  // Text
  basicText: BasicColors.ligthBlack,
  secondaryText: BasicColors.blueGrey,
  headerText: BasicColors.blue,
  placeholderText: BasicColors.lightGrey,
  inactiveButtonText: BasicColors.darkGrey,
};

const Colors = {
  ...BasicColors,
  ...NamedColors,
};

export default Colors;
