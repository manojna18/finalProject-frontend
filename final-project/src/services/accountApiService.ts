import axios from "axios";
import Account from "../models/Account";

const baseUrl: string = import.meta.env.VITE_API_LINK || "";

export const getAccountInfo = (id: string): Promise<Account> => {
  return axios
    .get(baseUrl + "/" + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addAccount = (accountInfo: Account): Promise<Account> => {
  console.log(accountInfo);
  return axios
    .post(baseUrl, accountInfo)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const editAccount = (accountInfo: Account): Promise<Account> => {
  return axios
    .put(baseUrl + "/" + accountInfo._id, accountInfo)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log(err));
};
