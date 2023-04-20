import {
  domainRoot,
  bucketsUrl,
  activeBucketsUrl,
} from "../constants/settings";

import { postData, getData, postFormData } from "./index";

export const deactivateBucket = (bid) => {
  const data = { uid: bid };
  const path = `${domainRoot}${bucketsUrl}delete/`;
  return postData(path, data, true);
};

export const listBuckets = async () => {
  const data = {};
  const path = `${domainRoot}${bucketsUrl}`;
  return getData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const getActiveBucket = async () => {
  const data = {};
  const path = `${domainRoot}${activeBucketsUrl}`;
  return getData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const setActiveBucket = async (bucket) => {
  const data = { bucket };
  const path = `${domainRoot}${activeBucketsUrl}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const createBucket = async (
  name,
  description,
  create_date,
  image = null
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("create_date", create_date);
  formData.append("description", description);

  if (image) {
    formData.append("file", image);
  }
  const path = `${domainRoot}${bucketsUrl}`;
  return postFormData(path, formData, true).then((res) => res.json());
};
