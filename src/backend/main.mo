import UserTypes "types/users";
import ListingTypes "types/listings";
import BookingTypes "types/bookings";
import SupportTypes "types/support";
import PlatformTypes "types/platform";
import Common "types/common";
import UserLib "lib/users";
import List "mo:core/List";
import Time "mo:core/Time";

import AuthMixin "mixins/auth-api";
import OwnerMixin "mixins/owner-api";
import AdminMixin "mixins/admin-api";
import FoodMixin "mixins/food-api";
import StayMixin "mixins/stay-api";
import PlayMixin "mixins/play-api";
import RetailMixin "mixins/retail-api";
import BookingsMixin "mixins/bookings-api";
import TicketsMixin "mixins/tickets-api";
import CategoriesMixin "mixins/categories-api";
import NotificationsMixin "mixins/notifications-api";



actor {
  // --- User & Owner state ---
  let users = List.empty<UserTypes.UserRecord>();
  let owners = List.empty<UserTypes.OwnerRecord>();
  let userCounter = { var count : Nat = 0 };

  // --- Listing state ---
  let foodItems = List.empty<ListingTypes.FoodItem>();
  let foodCounter = { var count : Nat = 0 };

  let stayRooms = List.empty<ListingTypes.StayRoom>();
  let stayCounter = { var count : Nat = 0 };

  let playSlots = List.empty<ListingTypes.PlaySlot>();
  let playCounter = { var count : Nat = 0 };

  let retailItems = List.empty<ListingTypes.RetailItem>();
  let retailCounter = { var count : Nat = 0 };

  // --- Bookings state ---
  let bookings = List.empty<BookingTypes.Booking>();
  let bookingCounter = { var count : Nat = 0 };

  // --- Support state ---
  let tickets = List.empty<SupportTypes.Ticket>();
  let ticketCounter = { var count : Nat = 0 };

  // --- Platform state ---
  let categories = List.empty<PlatformTypes.CategoryEntry>();
  let categoryCounter = { var count : Nat = 0 };

  let notifications = List.empty<PlatformTypes.Notification>();
  let notificationCounter = { var count : Nat = 0 };

  // --- Seed flag ---
  var seeded : Bool = false;

  // --- Seed data on first run ---
  func seedData() {
    if (seeded) { return };
    seeded := true;
    let now = Time.now();
    let pwHash = UserLib.hashPassword("owner123");
    let userPwHash = UserLib.hashPassword("user123");

    // Seed owners
    let owner1 : UserTypes.OwnerRecord = {
      id = "owner1";
      name = "Ravi Kumar";
      phone = "9876543210";
      passwordHash = pwHash;
      role = #owner;
      gpsLat = 11.9416;
      gpsLng = 79.8083;
      locationText = "Puducherry";
      isBanned = false;
      createdAt = now;
      activityLog = [];
      businessName = "Ravi's Biryani House";
      category = #food;
      upiId = "ravi@paytm";
      isVerified = true;
      isActive = true;
    };
    let owner2 : UserTypes.OwnerRecord = {
      id = "owner2";
      name = "Priya Stays";
      phone = "9876543211";
      passwordHash = pwHash;
      role = #owner;
      gpsLat = 11.9300;
      gpsLng = 79.8360;
      locationText = "Puducherry";
      isBanned = false;
      createdAt = now;
      activityLog = [];
      businessName = "Priya Beach Stays";
      category = #stay;
      upiId = "priya@gpay";
      isVerified = true;
      isActive = true;
    };
    let owner3 : UserTypes.OwnerRecord = {
      id = "owner3";
      name = "Chennai Turfs";
      phone = "9876543212";
      passwordHash = pwHash;
      role = #owner;
      gpsLat = 11.9500;
      gpsLng = 79.8100;
      locationText = "Puducherry";
      isBanned = false;
      createdAt = now;
      activityLog = [];
      businessName = "PondyOne Sports Arena";
      category = #play;
      upiId = "turf@paytm";
      isVerified = true;
      isActive = true;
    };
    let owner4 : UserTypes.OwnerRecord = {
      id = "owner4";
      name = "Kumar Stores";
      phone = "9876543213";
      passwordHash = pwHash;
      role = #owner;
      gpsLat = 11.9416;
      gpsLng = 79.8083;
      locationText = "Puducherry";
      isBanned = false;
      createdAt = now;
      activityLog = [];
      businessName = "Kumar's Daily Needs";
      category = #retail;
      upiId = "kumar@upi";
      isVerified = true;
      isActive = true;
    };
    owners.add(owner1);
    owners.add(owner2);
    owners.add(owner3);
    owners.add(owner4);

    // Seed sample user
    let user1 : UserTypes.UserRecord = {
      id = "user1";
      name = "John Doe";
      phone = "9999888877";
      passwordHash = userPwHash;
      role = #user;
      gpsLat = 11.9416;
      gpsLng = 79.8083;
      locationText = "Puducherry";
      isBanned = false;
      createdAt = now;
      activityLog = [];
    };
    users.add(user1);

    // Seed food items for owner1
    let foods : [(Text, Nat, Bool, Text)] = [
      ("Chicken Biryani", 300, false, "Fragrant basmati rice with tender chicken"),
      ("Veg Biryani", 220, true, "Aromatic basmati rice with seasonal vegetables"),
      ("Butter Chicken", 280, false, "Creamy tomato-based chicken curry"),
      ("Masala Dosa", 80, true, "Crispy rice crepe with spiced potato filling"),
      ("Filter Coffee", 40, true, "South Indian style filter coffee"),
    ];
    var fi = 0;
    for ((itemName, price, isVeg, desc) in foods.vals()) {
      fi += 1;
      let padded = if (fi < 10) { "00" # fi.toText() } else if (fi < 100) { "0" # fi.toText() } else { fi.toText() };
      let item : ListingTypes.FoodItem = {
        id = "food_" # padded;
        ownerId = "owner1";
        itemName;
        priceInr = price;
        isVeg;
        description = desc;
        isAvailable = true;
      };
      foodItems.add(item);
    };
    foodCounter.count := fi;

    // Seed stay rooms for owner2
    let rooms : [(Text, [Text], Nat)] = [
      ("Sea View Room", ["WiFi", "AC", "Sea View", "Breakfast"], 1500),
      ("Garden Room", ["WiFi", "Fan", "Garden View"], 1200),
      ("Suite", ["WiFi", "AC", "Sea View", "Jacuzzi", "Breakfast", "Mini Bar"], 2500),
    ];
    var si = 0;
    for ((roomName, amenities, price) in rooms.vals()) {
      si += 1;
      let padded = if (si < 10) { "00" # si.toText() } else if (si < 100) { "0" # si.toText() } else { si.toText() };
      let room : ListingTypes.StayRoom = {
        id = "stay_" # padded;
        ownerId = "owner2";
        roomName;
        amenities;
        pricePerNight = price;
        isAvailable = true;
        bookedDates = [];
      };
      stayRooms.add(room);
    };
    stayCounter.count := si;

    // Seed play slots for owner3 (6AM to 11PM = 17 slots)
    let hours : [Text] = [
      "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
      "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
      "18:00", "19:00", "20:00", "21:00", "22:00"
    ];
    var pi = 0;
    for (hour in hours.vals()) {
      pi += 1;
      let padded = if (pi < 10) { "00" # pi.toText() } else if (pi < 100) { "0" # pi.toText() } else { pi.toText() };
      let isBooked = pi % 2 == 0; // alternating
      let slot : ListingTypes.PlaySlot = {
        id = "play_" # padded;
        ownerId = "owner3";
        slotTime = hour;
        surfaceType = "Artificial Turf";
        hourlyRate = 500;
        description = "";
        isBooked;
        bookedByUserId = if (isBooked) { ?"user1" } else { null };
      };
      playSlots.add(slot);
    };
    playCounter.count := pi;

    // Seed retail items for owner4
    let retailData : [(Text, Nat, Text, Nat)] = [
      ("Rice 5kg", 350, "Groceries", 20),
      ("Paracetamol", 25, "Meds", 100),
      ("Legos", 800, "Toys", 5),
    ];
    var ri = 0;
    for ((itemName, price, cat, qty) in retailData.vals()) {
      ri += 1;
      let padded = if (ri < 10) { "00" # ri.toText() } else if (ri < 100) { "0" # ri.toText() } else { ri.toText() };
      let item : ListingTypes.RetailItem = {
        id = "retail_" # padded;
        ownerId = "owner4";
        itemName;
        priceInr = price;
        category = cat;
        inStock = qty > 0;
        quantity = qty;
      };
      retailItems.add(item);
    };
    retailCounter.count := ri;

    // Seed categories
    let catData : [(Text, Text, Common.Category, [Text])] = [
      ("Food", "🍔", #food, ["biryani", "food", "restaurant", "eat", "dosa"]),
      ("Stay", "🏨", #stay, ["room", "hotel", "stay", "accommodation"]),
      ("Play", "⚽", #play, ["cricket", "turf", "sports", "football"]),
      ("Retail", "🛒", #retail, ["grocery", "medicine", "toys", "shopping"]),
    ];
    var ci = 0;
    for ((name, emoji, tableType, keywords) in catData.vals()) {
      ci += 1;
      let padded = if (ci < 10) { "00" # ci.toText() } else if (ci < 100) { "0" # ci.toText() } else { ci.toText() };
      let entry : PlatformTypes.CategoryEntry = {
        id = "cat_" # padded;
        name;
        iconEmoji = emoji;
        tableType;
        isActive = true;
        searchKeywords = keywords;
      };
      categories.add(entry);
    };
    categoryCounter.count := ci;
  };

  // Run seed on actor initialization
  seedData();

  // --- Mixin inclusions ---
  include AuthMixin(users, owners, userCounter);
  include OwnerMixin(users, owners);
  include AdminMixin(users, owners, bookings);
  include FoodMixin(foodItems, foodCounter);
  include StayMixin(stayRooms, stayCounter);
  include PlayMixin(playSlots, playCounter);
  include RetailMixin(retailItems, retailCounter);
  include BookingsMixin(bookings, bookingCounter);
  include TicketsMixin(tickets, ticketCounter);
  include CategoriesMixin(categories, categoryCounter);
  include NotificationsMixin(notifications, notificationCounter);
};
