import axios from "axios";

interface CustomerTokenResponse {
  data: {
    generateCustomerToken: {
      token: string;
    };
  };
}

export async function getCustomerToken(email: string, password: string): Promise<string> {
  const query = `
    mutation GetCustomerToken($email: String!, $password: String!) {
      generateCustomerToken(email: $email, password: $password) {
        token
      }
    }
  `;

  const variables = { email, password };

  const response = await axios.post<CustomerTokenResponse>("/api/magento/get-token", {
    query,
    variables,
  });

  return response.data.data.generateCustomerToken.token;
}
