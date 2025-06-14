import { gql } from '@apollo/client';

export const GET_CUSTOMER_INFO = gql`
    query GetCustomerInfo {
        getCustomerInfo {
            id
            firstname
            lastname
            email
            phone
        }
    }
`;