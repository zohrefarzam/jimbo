import * as types from './types';

export const requestAllWeblog = (
  Limit,
  Offset,
  Id,
  Title,
  Video,
  Sound,
  Mini_Text,
  Text,
  Tag,
  Time,
) => ({
  type: types.ALL_LEARNING_REQUEST,
  Limit,
  Offset,
  Id,
  Title,
  Video,
  Sound,
  Mini_Text,
  Text,
  Tag,
  Time,
});
