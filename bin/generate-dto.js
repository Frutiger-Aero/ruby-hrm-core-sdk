const path = require("path");

const dir = path.join(__dirname, "../proto/");
 const protobuf = require("protobufjs");

protobuf.load(path.join(dir, "./shit.proto"), function(err, root) {
  if (err)
      throw err;
console.log(JSON.stringify(root, null, 4));
  var AwesomeMessage = root.lookupType("AwesomeMessage");

  var object = AwesomeMessage.toObject(message, {
});
console.log(JSON.stringify(object, null, 4));
})