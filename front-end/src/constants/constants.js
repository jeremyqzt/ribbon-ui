export const SET_FIELDS_VENDOR = "VENDOR";
export const SET_FIELDS_SUBTOTAL = "SUBTOTAL";
export const SET_FIELDS_TOTAL = "TOTAL";
export const SET_FIELDS_DATE = "DATE";
export const SET_FIELDS_DESCRIPTION = "DESCRIPTION";

export const CHANGE_PASSWORD = 0;
export const CHANGE_CONTACT_EMAIL = 1;
export const CHANGE_CONTACT_PHONE = 2;
export const CHANGE_CONTACT_ADDRESS = 3;
export const CHANGE_CONTACT_CAN_CONTACT = 4;

export const RECEIPT_DATE_CREATED = 0;
export const RECEIPT_DATE = 1;
export const RECEIPT_VENDOR = 2;
export const RECEIPT_AMOUNT_ASC = 3;
export const RECEIPT_AMOUNT_DESC = 4;
export const RECEIPT_DATE_CREATED_EARLY = 5;
export const RECEIPT_DATE_EARLY = 6;

export const searchParams = [
  {
    name: "Date Created - Latest First",
    value: RECEIPT_DATE_CREATED,
  },
  {
    name: "Date Created - Earliest First",
    value: RECEIPT_DATE_CREATED_EARLY,
  },
  {
    name: "Receipt Date - Latest First",
    value: RECEIPT_DATE,
  },
  {
    name: "Receipt Date - Earliest First",
    value: RECEIPT_DATE_EARLY,
  },
  {
    name: "Vendor",
    value: RECEIPT_VENDOR,
  },
  {
    name: "Amount Ascending",
    value: RECEIPT_AMOUNT_ASC,
  },
  {
    name: "Amount Descending",
    value: RECEIPT_AMOUNT_DESC,
  },
];

export const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const UNCATEGORIZED = 1;
const PREPAY = 2;
const FOOD_AND_GROCERIES = 3;
const TAX_FEE_DUE = 4;
const INSURANCE = 5;
const INTEREST = 6;
const CLOTHING = 7;
const MEALS = 8;
const OFFICE = 9;
const MEDICAL = 10;
const UTILITIES = 11;
const CAR = 12;
const HOUSEHOLD = 13;
const CELLPHONE_INTERNET = 14;
const NON_GROCERY_FOOD = 15;
const DISCRETIONARY = 16;
const GIFTS = 17;

export const categories = [
  {
    name: "Uncategorized",
    value: UNCATEGORIZED,
  },
  {
    name: "Prepaid Expenses",
    value: PREPAY,
  },
  {
    name: "Groceries",
    value: FOOD_AND_GROCERIES,
  },
  {
    name: "Taxes",
    value: TAX_FEE_DUE,
  },
  {
    name: "Insurance",
    value: INSURANCE,
  },
  {
    name: "Interest Expense",
    value: INTEREST,
  },
  {
    name: "Cloth & Fashion",
    value: CLOTHING,
  },
  {
    name: "Meals",
    value: MEALS,
  },
  {
    name: "Office Expenses",
    value: OFFICE,
  },
  {
    name: "Medical Expenses",
    value: MEDICAL,
  },
  {
    name: "Utilities",
    value: UTILITIES,
  },
  {
    name: "Car Expenses",
    value: CAR,
  },
  {
    name: "Household Expenses",
    value: HOUSEHOLD,
  },
  {
    name: "Cellphone And Internet",
    value: CELLPHONE_INTERNET,
  },
  {
    name: "Other Food",
    value: NON_GROCERY_FOOD,
  },
  {
    name: "Discretionary",
    value: DISCRETIONARY,
  },
  {
    name: "Gifts",
    value: GIFTS,
  },
];

export const PRE_ENTRY = {
  pk: 184,
  alive: true,
  upload_date: "2023-03-18",
  receipt_date: "2023-03-18",
  name: "Quick Entry",
  description: "Description",
  uploaded_by: 12,
  bucket: 17,
  thumbnail: "",
  image_url: "",
  total_amount: 0,
  vendor: "",
  all_lines: "",
  sub_amount: 0,
  category: 1,
  set_fields: "{}",
};
