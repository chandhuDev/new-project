export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.onetaphello.com'
    : 'http://localhost:3000'

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_51H4TYwGbsaabGvoszX4WcM9FOFLDUA72v58zRycnwvoqO1jHqiwQLhgnDtZGWBfkfdR6I5fZUlMPD3J24rVxCtUc002daZwL8g'
    : 'pk_test_51H4TYwGbsaabGvoszX4WcM9FOFLDUA72v58zRycnwvoqO1jHqiwQLhgnDtZGWBfkfdR6I5fZUlMPD3J24rVxCtUc002daZwL8g'
