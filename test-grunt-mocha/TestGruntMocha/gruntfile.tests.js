module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['mochaTest']);
};