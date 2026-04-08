var BookingStatus = /* @__PURE__ */ ((BookingStatus2) => {
  BookingStatus2["pending"] = "pending";
  BookingStatus2["completed"] = "completed";
  BookingStatus2["accepted"] = "accepted";
  BookingStatus2["declined"] = "declined";
  return BookingStatus2;
})(BookingStatus || {});
var Category = /* @__PURE__ */ ((Category2) => {
  Category2["retail"] = "retail";
  Category2["food"] = "food";
  Category2["play"] = "play";
  Category2["stay"] = "stay";
  return Category2;
})(Category || {});
var SoundType = /* @__PURE__ */ ((SoundType2) => {
  SoundType2["alarm"] = "alarm";
  SoundType2["ping"] = "ping";
  SoundType2["silent"] = "silent";
  return SoundType2;
})(SoundType || {});
var TicketStatus = /* @__PURE__ */ ((TicketStatus2) => {
  TicketStatus2["resolved"] = "resolved";
  TicketStatus2["open"] = "open";
  return TicketStatus2;
})(TicketStatus || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["admin"] = "admin";
  UserRole2["owner"] = "owner";
  UserRole2["user"] = "user";
  return UserRole2;
})(UserRole || {});
export {
  BookingStatus as B,
  Category as C,
  SoundType as S,
  TicketStatus as T,
  UserRole as U
};
