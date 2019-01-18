const UglifyJS = require("uglify-js");
const UglifyES = require("uglify-es");

export const transform = (code, options) => {
    const result = UglifyJS.minify(code, options);
    if (result.error) {
      throw result.error;
    } else {
      return result;
    }
};

export const transformES = (code, options) => {
    const result = UglifyES.minify(code, options);
    if (result.error) {
      throw result.error;
    } else {
      return result;
    }
};
