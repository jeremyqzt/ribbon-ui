import {
  domainRoot,
  receiptCreateUrl,
  receiptUpdateUrl,
  vendorUrl,
} from "../constants/settings";

import { postData, getData, postFormData, serialize } from "./index";

export const getReceipts = async (filter) => {
  const data = {};

  const path = `${domainRoot}${receiptCreateUrl}`;
  const fullPath = serialize(path, filter);

  return getData(fullPath, data, true)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => data);
};

export const getVendors = async () => {
  const data = {};

  const path = `${domainRoot}${vendorUrl}`;

  return getData(path, data, true)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => data);
};

export const addVendors = async (name) => {
  const data = {
    name,
  };

  const path = `${domainRoot}${vendorUrl}`;

  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const updateReceipts = async (update) => {
  const data = {
    ...update,
  };
  const path = `${domainRoot}${receiptUpdateUrl}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const deactivateReceipt = (rid) => {
  const data = { uid: rid };
  const path = `${domainRoot}${receiptCreateUrl}delete/`;
  return postData(path, data, true);
};

export const deleteVendor = async (uid) => {
  const data = { uid };

  const path = `${domainRoot}${vendorUrl}delete/`;

  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const postReceipt = async ({
  image,
  bucket,
  description,
  total,
  vendor,
  subtotal,
  category,
  setFields,
  JSONcrop,
}) => {
  const formData = new FormData();
  if (image) {
    formData.append("file", image);
  }

  formData.append("bucket", bucket);
  formData.append("subtotal", subtotal);
  formData.append("total", total);
  formData.append("vendor", vendor);
  formData.append("category", category);
  formData.append("description", description);
  formData.append("setFields", setFields);
  formData.append("crop", JSONcrop);
  const path = `${domainRoot}${receiptCreateUrl}`;
  return postFormData(path, formData, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};
