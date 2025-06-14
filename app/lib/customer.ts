import axios from "axios";

export async function getCustomer(id: number) {
  const query = `
    query GetCustomerInfoById($id: Int!) {
      getCustomerInfoById(id: $id) {
        id
        firstname
        lastname
        email
        phone
        gender
        post_code
        dob
      }
    }
  `;
  const res = await axios.post("/api/magento/auth/me", {
    query,
    variables: { id },
  });

  return res.data;
}

export async function getCustomerAfterLogin(email: string, password: string) {
  const query = `
  query CustomerLogin($email: String!, $password: String!) {
    customerLogin(email: $email, password: $password) {
        id
    }
  }
  `;
  const res = await axios.post("/api/magento/auth/login/getId", {
    query,
    variables: {email, password},
  })
  console.log(res.data);
  const customerId = res.data;
}
