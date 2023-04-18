import { domainRoot, settingsUrl } from "../constants/settings";

import { postData, getData } from "./index";

export const saveSettings = async (
  { username, password, address, phone, contact },
  action
) => {
  const data = { username, password, address, phone, contact, action };
  const path = `${domainRoot}${settingsUrl}`;
  return postData(path, data, true).then((res) => res.json());
};

export const getSettings = async () => {
  const path = `${domainRoot}${settingsUrl}`;
  return getData(path, {}, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};
