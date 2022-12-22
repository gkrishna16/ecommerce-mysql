import Axios from "axios";

const BASE_URL = "http://localhost:5002";

export const publicRequest = Axios.create({
  baseURL: BASE_URL,
});

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6IjAiLCJpYXQiOjE2NzExNzcxNTQsImV4cCI6MTY3MTQzNjM1NH0.uQDcL8wKD_TxlMFZUdWjPPrn_RUSMZlE55ApS5Yorxg`;

export const userRequest = Axios.create({
  baseURL: BASE_URL,
  header: {
    token: { token: `Bearer ${token}` },
  },
});
