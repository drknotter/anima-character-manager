function check(arg, msg) {
  if (!arg) {
    throw {'message': msg};
  }
}