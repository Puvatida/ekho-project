import axios from "axios";

export function reportPost(targetId, reasonOfReport) {
  return axios.post(
    "http://localhost:9000/api/reports/post",
    {
      targetId,
      reasonOfReport,
    },
    {
      withCredentials: true,
    }
  );
}