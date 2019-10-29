module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps')

  grunt.initConfig({
    screeps: {
      options: {
        server: {
          host: 'localhost',
          port: 21025,
          http: true
        },
        email: 'bob',
        password: 'testpassword',
        branch: 'default',
        ptr: false
      },
      dist: {
        src: ['dist/*.js']
      }
    }
  })
}
