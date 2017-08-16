const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('build', () => {
    gulp.src('./src/main.js')
    .pipe(webpack({
        watch : true,
        devtool : "source-map",
        output : {
            filename : 'app.js'
        },
        module : {
            loaders : [
                {
                    test : /.js$/,
                    exclude : /node_modules/,
                    loader : 'babel-loader',
                    query : {
                        presets : [
                            'es2015',
                            'react',
                            'flow'
                        ]
                    }

                }
            ]
        }
    }))
    .pipe(gulp.dest('./out'));
});

