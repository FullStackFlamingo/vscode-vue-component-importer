module.exports = {
  get REGEX_SCRIPT_TAG_BEGIN() {
    return /<script>/g;
  },
  get REGEX_SCRIPT_TAG_END() {
    return /<\/script>/g;
  },
  get REGEX_IMPORT_STATEMENT() {
    return /^[\s]*?import.+["'`].+["'`].*;/g;
  },
  get REGEX_COMPONENTS_PROP() {
    return /components *: *{/g;
  },
  get REGEX_EXPORT_STATEMENT() {
    return /export *default *{/g;
  },
};
