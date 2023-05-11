export const fetchSetting = (params: any) => {
  return request.post("/api/setting", params);
};
