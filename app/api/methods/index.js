// General api to access data
import ApiConstants, {ApiKey} from './ApiConstants';

export default async function api(
  path,
  params,
  token = null,
  method = 'post',
  basic = null,
) {
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...{ApiKey},
      ...(token && {Authorization: `Bearer ${token}`}),
      ...(basic && {Authorization: `Basic ${basic}`}),
    },
    method,
    ...(params && {body: JSON.stringify(params)}),
  };

  try {
    const r = await fetch(ApiConstants.BASE_URL + path, options);
    const data = await r.json();
    console.log('*** API Call Response: ***', {status: r.status, ...data});
    return {status: r.status, ...data};
  } catch (error) {
    return error;
  }
}

const createFormData = (photo, body, name) => {
  const data = new FormData();

  // data.append('File', {
  //   name: photo.fileName,
  //   type: photo.type,
  //   uri:
  //     Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  // });
  data.append(name, {
    uri: photo.path,
    type: photo.mime,
    name: 'photo',
  });
  if (body) {
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  }
  console.log('data', data);
  return data;
};

export async function uploadDocument(
  path,
  photo,
  params,
  token = null,
  method = 'post',
  name = 'File',
) {
  let options;
  options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...{ApiKey},
      ...(token && {Authorization: `Bearer ${token}`}),
    },
    method,
    body: createFormData(photo, params, name),
  };

  try {
    const r = await fetch(ApiConstants.BASE_URL + path, options);
    const data = await r.json();
    return {status: r.status, ...data};
  } catch (error) {
    return error;
  }
}
