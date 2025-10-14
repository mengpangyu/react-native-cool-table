import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expand_icon: {
    marginRight: 2,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#666',
  },
  rightArrow: {
    marginLeft: 4,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightArrowTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#999',
  },
  second_text: {
    fontSize: 11,
    color: '#929AA6',
  },
  text: {
    fontSize: 12,
    color: '#1F2733',
  },
  sort: {
    marginLeft: 4,
  },
});

export default styles;
