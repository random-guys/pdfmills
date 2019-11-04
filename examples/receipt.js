var { Context, pageBounds } = require('../dist/base');
var { Image, LineBreak, Text, Block } = require('../dist/drawables');
var { background, block, spaceBetween } = require('../dist/pdf');
var { save } = require('../dist/utils');
var path = require('path');

const assets = path.join(__dirname, 'assets');
const openSans = path.join(assets, 'fonts/OpenSans-Regular.ttf');
const openSansSemibold = path.join(assets, 'fonts/OpenSans-Semibold.ttf');
const goMoneyLogo = path.join(assets, 'img/logo.png');

const context = new Context(54, {
  font: openSans,
  fontSize: 8,
  color: 33
});

background(context, {
  ...pageBounds(),
  height: 284
});

block(context, [
  new Image(goMoneyLogo, 52, 52),
  new LineBreak(14),
  new Text('Transaction Statement', {
    font: openSansSemibold,
    fontSize: 22
  }),
  new LineBreak(46)
]);

spaceBetween(context, [
  new Block([new Text('Welcome'), new LineBreak(10), new Text('Home')]),
  new Block([new Text('Welcome'), new LineBreak(10), new Text('Home')])
]);

save(context.raw, 'output.pdf');