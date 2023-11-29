import {
  domainRoot,
  authUrl,
  userCreateUrl,
  userDeleteUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
  resetPasswordForm,
  mfaUrl,
  mfaLogin,
  mfaDisable,
  mfaVerifyUrl,
  authV2Url,
  refreshUrl,
} from "../constants/settings";

export const postData = async (url = "", data = {}, auth = false) => {
  return serverCommContent(url, data, auth, "POST", "application/json");
};

export const postFormData = async (url = "", data = {}, auth = false) => {
  return serverComm(url, data, auth, "POST", "multipart/form-data");
};

export const getData = async (url = "", data = {}, auth = false) => {
  return serverCommContent(url, data, auth, "GET", "application/json");
};

export const serverCommContent = async (
  url = "",
  data = {},
  auth = false,
  method = "POST",
  contentType = "application/json"
) => {
  const authParam = auth
    ? { Authorization: `Bearer ${getCookie("access_token")}` }
    : {};

  const body =
    method === "POST"
      ? {
          body:
            contentType === "application/json" ? JSON.stringify(data) : data,
        }
      : {};

  return fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      ...authParam,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...body,
  });
};

export const serverComm = async (
  url = "",
  data = {},
  auth = false,
  method = "POST",
  contentType = "application/json"
) => {
  const authParam = auth
    ? { Authorization: `Bearer ${getCookie("access_token")}` }
    : {};

  const body =
    method === "POST"
      ? {
          body:
            contentType === "application/json" ? JSON.stringify(data) : data,
        }
      : {};

  return fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      ...authParam,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...body,
  });
};

export const signIn = async (username, password, navigate) => {
  const data = { username, password };
  const path = `${domainRoot}${authUrl}`;
  return postData(path, data)
    .then((res) => res.json())
    .then((res) => {
      if (res.access && res.refresh) {
        if (res.mfaRequired) {
          setCookie("username", username, 5 * 24);
          setCookieSeconds("access_token", res.access, 45);
          setCookieSeconds("refresh_token", res.refresh, 45);
          navigate("/mfaVerify");
        } else {
          setCookie("username", username, 5 * 24);
          setCookie("access_token", res.access, 5 * 24);
          setCookie("refresh_token", res.refresh, 5 * 24);
          navigate("/main");
        }
      } else {
        throw new Error("Incorrect Token");
      }
    });
};

export const refresh = async () => {
  const path = `${domainRoot}${refreshUrl}`;
  return postData(path)
    .then((res) => res.json())
    .then((res) => {
      if (res.access && res.refresh) {
        // setCookie("username", username, 5 * 24);
        setCookie("access_token", res.access, 5 * 24);
        setCookie("refresh_token", res.refresh, 5 * 24);
      } else {
        throw new Error("Incorrect Refresh? something happened");
      }
    });
};

export const signInV2 = async (username, password, navigate) => {
  const data = { username, password };
  const path = `${domainRoot}${authV2Url}`;
  return postData(path, data)
    .then((res) => res.json())
    .then((res) => {
      if (res.access && res.refresh) {
        setCookie("username", username, 5 * 24);
        setCookie("access_token", res.access, 5 * 24);
        setCookie("refresh_token", res.refresh, 5 * 24);
        navigate("/main");
      } else {
        throw new Error("Incorrect Token");
      }
    });
};

export const deleteAccount = async () => {
  const path = `${domainRoot}${userDeleteUrl}`;
  return postData(path, {}, true)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    })
    .then(() => {
      setCookie("username", "", -1);
      setCookie("access_token", "", -1);
      setCookie("refresh_token", "", -1);
      window.location.href = "/";
    });
};

export const signUp = async (username, password) => {
  const data = { username, password };
  const path = `${domainRoot}${userCreateUrl}`;
  return postData(path, data);
};

export const resetForm = async (username, description) => {
  const data = { username, description };
  const path = `${domainRoot}${resetPasswordForm}`;
  return postData(path, data);
};

export const forgotPassword = async (username, token, newPassword) => {
  const data = { username, token, newPassword };
  const path = `${domainRoot}${forgotPasswordUrl}`;
  return postData(path, data);
};

export const requestReset = async (username) => {
  const data = { username };
  const path = `${domainRoot}${resetPasswordUrl}`;
  return postData(path, data);
};

export const signOut = () => {
  setCookie("username", "", -1);
  setCookie("access_token", "", -1);
  setCookie("refresh_token", "", -1);
};

export const setCookie = (cname, cvalue, exHours) => {
  const d = new Date();
  d.setTime(d.getTime() + exHours * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const setCookieSeconds = (cname, cvalue, seconds) => {
  const d = new Date();
  d.setTime(d.getTime() + seconds * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const checkCookie = (name) => {
  let val = getCookie(name);
  if (val !== "") {
    return val;
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  const haveToken = checkCookie("access_token");
  const userValid = checkCookie("username");
  const isLoggedIn = Boolean(userValid) && Boolean(haveToken);
  return isLoggedIn;
};

export const getLogoUrl = (path) => {
  if (path.startsWith("http")) {
    return path;
  }
  return `${domainRoot}${path.substring(1)}`;
};

export const serialize = (url, obj) => {
  const toSerialize = new URL(url);
  toSerialize.search = new URLSearchParams(obj);
  return toSerialize.toString();
};

export const createMfa = async () => {
  const data = {};
  const path = `${domainRoot}${mfaUrl}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const isMfaEnabled = async () => {
  const data = {};
  const path = `${domainRoot}${mfaUrl}`;
  return getData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const verifyMfa = async (code) => {
  const data = { token: code };
  const path = `${domainRoot}${mfaVerifyUrl}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const disableMfa = async (code) => {
  const data = { token: code };
  const path = `${domainRoot}${mfaDisable}`;
  return postData(path, data, true).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
};

export const logInMfa = async (code) => {
  const data = { token: code };
  const path = `${domainRoot}${mfaLogin}`;
  return postData(path, data, true)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.access && res.refresh) {
        setCookie("access_token", res.access, 5 * 24);
        setCookie("refresh_token", res.refresh, 5 * 24);
        window.location.href = "/main";
      } else {
        throw new Error("Incorrect MFA Token");
      }
    });
};
