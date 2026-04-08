import Common "../types/common";
import Types "../types/users";
import List "mo:core/List";
import Time "mo:core/Time";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";

module {
  // Simple deterministic hash: fold chars with XOR + prime mixing, output hex
  public func hashPassword(password : Text) : Text {
    let prime : Nat32 = 31;
    var h : Nat32 = 5381;
    for (c in password.chars()) {
      h := ((h << 5) +% h) +% c.toNat32();
      h := h ^ (c.toNat32() *% prime);
    };
    let hexChars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    var result = "";
    var tmp = h.toNat();
    // Produce 8 hex chars
    var i = 0;
    while (i < 8) {
      let nibble = tmp % 16;
      result := hexChars[nibble] # result;
      tmp := tmp / 16;
      i += 1;
    };
    result
  };

  public func generateId(prefix : Text, counter : Nat) : Text {
    let n = counter;
    let padded = if (n < 10) { "00" # Nat32.fromNat(n).toNat().toText() }
                 else if (n < 100) { "0" # n.toText() }
                 else { n.toText() };
    prefix # "_" # padded
  };

  public func signup(
    users : List.List<Types.UserRecord>,
    owners : List.List<Types.OwnerRecord>,
    name : Text,
    phone : Text,
    password : Text,
    role : Common.UserRole,
    gpsLat : Float,
    gpsLng : Float,
    locationText : Text,
  ) : Common.Result<Types.UserRecord, Text> {
    // Check phone uniqueness in users
    let existsInUsers = users.find(func(u) { u.phone == phone });
    switch (existsInUsers) {
      case (?_) { return #err("Phone already registered") };
      case null {};
    };
    // Check phone uniqueness in owners
    let existsInOwners = owners.find(func(o) { o.phone == phone });
    switch (existsInOwners) {
      case (?_) { return #err("Phone already registered") };
      case null {};
    };
    // Admin phone check
    if (phone == "6381110664") {
      return #err("Phone not available for registration");
    };
    let counter = users.size() + owners.size() + 1;
    let id = generateId("user", counter);
    let now = Time.now();
    let newUser : Types.UserRecord = {
      id;
      name;
      phone;
      passwordHash = hashPassword(password);
      role;
      gpsLat;
      gpsLng;
      locationText;
      isBanned = false;
      createdAt = now;
      activityLog = [{ action = "signup"; timestamp = now }];
    };
    users.add(newUser);
    #ok(newUser)
  };

  public func signin(
    users : List.List<Types.UserRecord>,
    owners : List.List<Types.OwnerRecord>,
    phone : Text,
    password : Text,
  ) : Common.Result<Types.UserRecord, Text> {
    // Hardcoded admin
    if (phone == "6381110664" and password == "Theju@231025") {
      let adminRecord : Types.UserRecord = {
        id = "admin";
        name = "Founder Admin";
        phone = "6381110664";
        passwordHash = "";
        role = #admin;
        gpsLat = 11.9416;
        gpsLng = 79.8083;
        locationText = "Puducherry";
        isBanned = false;
        createdAt = 0;
        activityLog = [];
      };
      return #ok(adminRecord);
    };
    let hash = hashPassword(password);
    // Check users list
    switch (users.find(func(u) { u.phone == phone })) {
      case (?u) {
        if (u.passwordHash != hash) { return #err("Invalid credentials") };
        if (u.isBanned) { return #err("Account is banned") };
        // Log signin
        let now = Time.now();
        let entry : Common.ActivityEntry = { action = "signin"; timestamp = now };
        users.mapInPlace(func(rec) {
          if (rec.id == u.id) {
            { rec with activityLog = rec.activityLog.concat([entry]) }
          } else { rec }
        });
        return #ok(u)
      };
      case null {};
    };
    // Check owners list
    switch (owners.find(func(o) { o.phone == phone })) {
      case (?o) {
        if (o.passwordHash != hash) { return #err("Invalid credentials") };
        if (o.isBanned) { return #err("Account is banned") };
        let now = Time.now();
        let entry : Common.ActivityEntry = { action = "signin"; timestamp = now };
        owners.mapInPlace(func(rec) {
          if (rec.id == o.id) {
            { rec with activityLog = rec.activityLog.concat([entry]) }
          } else { rec }
        });
        // Return owner as UserRecord
        let asUser : Types.UserRecord = {
          id = o.id;
          name = o.name;
          phone = o.phone;
          passwordHash = o.passwordHash;
          role = o.role;
          gpsLat = o.gpsLat;
          gpsLng = o.gpsLng;
          locationText = o.locationText;
          isBanned = o.isBanned;
          createdAt = o.createdAt;
          activityLog = o.activityLog;
        };
        return #ok(asUser)
      };
      case null {};
    };
    #err("Invalid credentials")
  };

  public func getUserById(
    users : List.List<Types.UserRecord>,
    owners : List.List<Types.OwnerRecord>,
    id : Text,
  ) : ?Types.UserRecord {
    switch (users.find(func(u) { u.id == id })) {
      case (?u) { ?u };
      case null {
        switch (owners.find(func(o) { o.id == id })) {
          case (?o) {
            ?{
              id = o.id;
              name = o.name;
              phone = o.phone;
              passwordHash = o.passwordHash;
              role = o.role;
              gpsLat = o.gpsLat;
              gpsLng = o.gpsLng;
              locationText = o.locationText;
              isBanned = o.isBanned;
              createdAt = o.createdAt;
              activityLog = o.activityLog;
            }
          };
          case null { null };
        }
      };
    }
  };

  public func updateProfile(
    users : List.List<Types.UserRecord>,
    owners : List.List<Types.OwnerRecord>,
    id : Text,
    name : Text,
    locationText : Text,
    gpsLat : Float,
    gpsLng : Float,
  ) : Common.Result<(), Text> {
    var found = false;
    users.mapInPlace(func(u) {
      if (u.id == id) {
        found := true;
        { u with name; locationText; gpsLat; gpsLng }
      } else { u }
    });
    if (found) { return #ok(()) };
    owners.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with name; locationText; gpsLat; gpsLng }
      } else { o }
    });
    if (found) { #ok(()) } else { #err("User not found") }
  };

  public func logActivity(
    users : List.List<Types.UserRecord>,
    owners : List.List<Types.OwnerRecord>,
    userId : Text,
    action : Text,
  ) {
    let entry : Common.ActivityEntry = { action; timestamp = Time.now() };
    users.mapInPlace(func(u) {
      if (u.id == userId) {
        { u with activityLog = u.activityLog.concat([entry]) }
      } else { u }
    });
    owners.mapInPlace(func(o) {
      if (o.id == userId) {
        { o with activityLog = o.activityLog.concat([entry]) }
      } else { o }
    });
  };
};
