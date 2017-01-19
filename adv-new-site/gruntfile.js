module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["build"],
    less: {
      options: {
        paths: ["src"]
      },
      src: {
        expand: true,
        cwd: "src/style",
        src: ["index.less"],
        ext: ".css",
        dest: "build/stage"
      }
    },
    cssmin: {
      compress: {
        files: {
          "build/dist/style.min.css": ["build/stage/**/*.css"]
        }
      }
    },
    svgstore: {
      options: {
        svg: {
          viewbox: "0 0 100 100",
          style: "display: none",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }
      },
      svgicons: {
        files: {
          "build/dist/spritesheet.svg": ["src/images/**/*.svg"]
        }
      }
    },
    ts: {
      default: {
        src: "src/scripts/**/*.ts",
        outDir: "build/stage",
        options: {
          target: "es5"
        }
      }
    },
    browserify: {
      options: {
        external: "angular"
      },
      default: {
        files: {
          "build/stage/app.browserified.js": "build/stage/**/*.js"
        }
      }
    },
    uglify: {
      default: {
        files: {
          "build/dist/app.min.js": ["build/stage/app.browserified.js"]
        }
      }
    },
    includeSource: {
      options: {
        basePath: "build/dist"
      },
      default: {
        files: {
          "build/dist/index.html": "src/index.tpl.html"
        }
      }
    },
    copy: {
      default: {
        src: "src/host.js",
        dest: "build/dist/host.js"
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-include-source");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-copy");

  // grunt.registerTask("default", ["clean", "less", "cssmin", "svgstore", "ts", "browserify", "uglify", "includeSource", "copy"]);
  grunt.registerTask("default", ["clean", "less", "cssmin", "svgstore", "ts", "browserify", "uglify", "includeSource", "copy"]);

};
