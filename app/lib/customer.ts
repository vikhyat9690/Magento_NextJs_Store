import axios from "axios";

export async function getCustomer(id: number) {
  console.log(id)
  const query = `
    query GetCustomerById($id: Int!) {
      customerById(id: $id) {
        id
        firstname
        lastname
        email
        gender
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
  const id = res.data?.data?.customerLogin?.id;
  const customerData = await getCustomer(id);
  console.log(customerData)
  return customerData;
}
