import {t} from 'i18next';
import {View, Image, Text, Pressable, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {formatDate} from '../utils/utils';
import {PlantUpdate} from '../utils/models';

type PlantUpdateProps = PlantUpdate & {
  showDeleteIcon: boolean;
  onAddNote: (id: string) => void;
  onDelete: (id: string) => void;
};

const PlantUpdateItem = ({
  id,
  createdAt,
  picture,
  noteEntry,
  showDeleteIcon = true,
  onAddNote,
  onDelete,
}: PlantUpdateProps) => {
  return (
    <View style={styles.container}>
      {picture && (
        <Pressable onPress={() => onAddNote(id)} style={styles.imagePressable}>
          <Image source={{uri: picture.url}} style={styles.image} />
        </Pressable>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.date}>{formatDate(createdAt.toDate())}</Text>
        <View style={styles.flexStyle}>
          <Pressable onPress={() => onAddNote(id)} hitSlop={30}>
            <Text style={styles.note} numberOfLines={6}>
              {noteEntry ? noteEntry : `${'📔'} ${t('noteEntry.add')}`}
            </Text>
          </Pressable>
          {showDeleteIcon && (
            <Pressable onPress={() => onDelete(id)}>
              <Image
                source={require('../../assets/icons/icon_delete.png')}
                style={styles.deleteIcon}
                tintColor={Colors.darkpurple}
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default PlantUpdateItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  flexStyle: {
    justifyContent: 'space-between',
    flex: 1,
  },
  imagePressable: {
    width: '50%',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  date: {
    color: Colors.secondaryText,
    fontFamily: Fonts.subtitleFont,
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    color: Colors.secondaryText,
    fontFamily: Fonts.subtitleFont,
    fontSize: 16,
    overflow: 'hidden',
  },
  deleteIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
    alignSelf: 'flex-end',
  },
});
