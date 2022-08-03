import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-west-1_YSjxURS2a',
    ClientId: '6e4p9h8ju7tm6hi6409qsc3692'
};

export default new CognitoUserPool(poolData);