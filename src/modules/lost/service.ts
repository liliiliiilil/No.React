export const fetchLost = (params: any) => {
  return request.post("/api/lost", params);
};
