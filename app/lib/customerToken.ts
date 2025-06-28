import axios from "axios";

interface CustomerTokenResponse {
  token: {
    data: {
      generateCustomerToken: {
        token: string;
      };
    };
  }
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

  const response = await axios.post<CustomerTokenResponse>("/api/magento/auth/login", {
    query,
    variables,
  });
  return response.data.token?.data?.generateCustomerToken?.token;
}
