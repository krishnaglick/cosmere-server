
const webpack = require('webpack');
const prebuild = require('pre-build-webpack');
const path = require('path');
const fs = require('fs');
const glob = require('globby');
const sass = require('node-sass');
const _ = require('lodash');

module.exports = {
  entry: path.resolve('./client/app/app.js'),
  output: {
    path: path.resolve('./static/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        compact: true
      }
    }]
  },
  plugins: [
    new prebuild(() => {
      const cpArgs = [
        '-r',
        path.resolve('./client/index.html'),
        path.resolve('./static')
      ];
      require('child_process').execFile('cp', cpArgs);
    }),
    new prebuild(() => {
      const actionTemplate = fs.readFileSync(path.resolve(__dirname + '/app/templates/actions.js'), { encoding: 'UTF8' });
      const actions = _.filter(_.map(glob.sync('./client/app/actions/**/*.js'), path => './' + path.split('./client/app/actions/')[1]), p => p.indexOf('index') === -1);
      const actionsFile = actionTemplate.replace(`'actionsReplacer'`, _.map(actions, a => `require('${a}')`).join(',\n  '));
      fs.writeFileSync(path.resolve(__dirname + '/app/actions/index.js'), actionsFile);
    }),
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname + '/app/actions/index.js')
    ]),
    new prebuild(() => {
      try {
        const { css } = sass.renderSync({
          file: path.resolve('./client/app/styles/index.scss')
        });
        fs.writeFileSync(path.resolve('./static/app.css'), css);
      }
      catch(x) {
        console.warn('Sass error: ', x);
      }
    })
  ]
};
