// $ mongo localhost:27017/atop init.js
db.users.findOneAndUpdate(
  { name: "admin" },
  {
    $set: {
      name: "admin",
      password: "default",
      role: "admin",
      tags: ["#admin"],
    },
  },
  { upsert: true }
);

db.tableSetting.findOneAndUpdate(
  { collection: "users" },
  {
    $set: {
      collection: "users",
      searchableFields: ["name", "tags", "role"],
      unique: ["name"],
    },
  },
  { upsert: true }
);

db.tableSetting.remove({});
db.tableSetting.insertMany([
  {
    collection: "users",
    searchableFields: ["name", "tags", "role"],
    unique: ["name"],
  },
  {
    collection: "atopDevices",
    searchableFields: ["name", "description", "mac", "eth1", "eth2"],
    unique: ["mac"],
  },
]);
