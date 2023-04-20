"use client";

const TESTING = process.env.TESTING;

export let domainRoot = "http://localhost:8000/";

if (TESTING === false) {
  domainRoot = "https://api.ribbonreceipts.com/";
}

export const authUrl = "auth/token/";
export const userCreateUrl = "user/create/";
export const userDeleteUrl = "user/delete/";
export const forgotPasswordUrl = "user/forgotPassword/";
export const resetPasswordUrl = "user/resetPassword/";
export const resetPasswordForm = "user/resetPasswordForm/";

export const bucketsUrl = "api/bucket/";
export const activeBucketsUrl = "api/active/";
export const receiptCreateUrl = "api/receipt/";
export const vendorUrl = "api/vendor/";

export const receiptUpdateUrl = "api/receipt/update/";
export const totalCostsUrl = "api/charts/total_costs/";
export const totalMonthlyCostsUrl = "api/charts/receipt_category_totals/";

export const averageCostsUrl = "api/charts/average_costs/";
export const receiptCountUrl = "api/charts/receipt_count/";
export const vendorCountUrl = "api/charts/vendor_count/";
export const receiptCategoryCountUrl = 'api/charts/receipt_category_count/'

export const settingsUrl = "api/settings/";
