const UglifyJS = require("uglify-js");

export const transform = (code, options) => {
    // const options = eval(`(${optionsString})`)
    const result = UglifyJS.minify(code, options);
    if (result.error) {
      throw result.error;
    } else {
      return result;
    }
};
