import Api from './index';
import ApiConstants from './ApiConstants';
export default function getAllWeblog(
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
) {
  const params = {
    Offset,
    ...(Id && {Id}),
    Limit,
    ...(Title && {Title}),
    ...(Video && {Video}),
    ...(Sound && {Sound}),
    ...(Mini_Text && {Mini_Text}),
    ...(Text && {Text}),
    ...(Tag && {Tag}),
    ...(Time && {Time}),
  };
  return Api(ApiConstants.weblog.get, params);
}
