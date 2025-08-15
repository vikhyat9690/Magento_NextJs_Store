import CashierLogin from './CashierLogin.graphql';
import { gql } from '@apollo/client';

export const CASHIER_LOGIN_QUERY = gql`
query CashierLogin ($email: String!, $password: String!) {
    cashierLogin(email: $email, password: $password) {
        id
        firstname
        lastname
        email
        telephone
        outlet
        cashier_image
        is_active
        token
    }
}
`