import { refreshToken } from "../../utils/index";
import { useEffect, useState } from "react";

export const Refresh = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    refreshToken()
      .then(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { children } = props;

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
