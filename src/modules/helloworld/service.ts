export default {
  showhelloworld: () => {
    return request.post("/showhelloworld").catch(() => "hi!");
  },
};
