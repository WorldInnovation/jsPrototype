const webpack =require('webpack');
module.exports = {
    //path: path.resolve(__dirname, "./dist")
 /*   entry: {
        'build/application/bundle': './src/application', // will be  ./build/application/bundle.js,
        'build/library/bundle': './src/library`'// will be  ./build/library/bundle.js
    }, departments/mainController.js*/
    entry: './js/departments/mainController.js',
    output: {
        filename: './bandle.js'
    }

};
