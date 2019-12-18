const { src, dest, watch } = require("gulp");
const minifyCSS = require("gulp-csso");
const postcss = require("gulp-postcss");

const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["dist/index.html"],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

/**
 * @param {boolean} purge Whether or not to purge the unused CSS styles
 */
function css(purge) {
  return src("styles/main.css")
    .pipe(
      postcss([
        require("tailwindcss"),
        require("autoprefixer"),
        ...(purge ? [purgecss] : [])
      ])
    )
    .pipe(minifyCSS())
    .pipe(dest("dist/css"));
}

exports.watch = function() {
  watch(["styles/*.css"], function(cb) {
    css(false);
    cb();
  });
};

// The default gulp task is used to build the CSS for prod,
// so make sure `purge` is true
exports.default = css.bind(this, true);
