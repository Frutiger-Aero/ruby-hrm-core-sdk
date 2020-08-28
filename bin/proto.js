const fs = require('fs');
const path = require('path');
const pbjs = require('protobufjs/cli/pbjs'); // or require("protobufjs/cli").pbjs / .pbts
const pbts = require('protobufjs/cli/pbts'); // or require("protobufjs/cli").pbjs / .pbts
const dir = path.join(__dirname, '../proto/');

const FILENAME = 'app.proto';
const FOLDER = 'generated';

pbjs.main(
  [
    '--target',
    'static-module',
    '--wrap',
    'commonjs',
    '--no-create',
    '--no-encode',
    '--no-decode',
    '--no-verify',
    '--no-convert',
    '--no-delimited',
    '--path',
    process.env.PWD,
    path.join(dir, process.env.MAIN_PROTO),
  ],
  function(err, output) {
    if (err) {
      throw err;
    }

    // do something with output
    if (!fs.existsSync(path.join(dir, FOLDER))) {
      fs.mkdirSync(path.join(dir, FOLDER));
    }

    fs.writeFileSync(path.join(dir, FOLDER, `${FILENAME}.js`), output);
    console.log('Generated ' + path.join(dir, FOLDER, `${FILENAME}.js`));

    pbts.main([path.join(dir, FOLDER, `${FILENAME}.js`)], function(
      err,
      output,
    ) {
      if (err) throw err;
      fs.writeFileSync(path.join(dir, FOLDER, `${FILENAME}.d.ts`), output);
      console.log('Generated ' + path.join(dir, FOLDER, `${FILENAME}.d.ts`));
    });
  },
);
