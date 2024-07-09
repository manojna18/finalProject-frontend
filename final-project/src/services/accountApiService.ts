import axios from "axios";
import Account from "../models/Account";

const baseUrl: string =
  "http://127.0.0.1:5001/final-project-e6810/us-central1/api";
export const getAccountInfo = (): Promise<Account> => {
  return axios
    .get(baseUrl)
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
