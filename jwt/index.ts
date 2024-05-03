import JWT from 'jsonwebtoken';

JWT.sign(
  {
    userId: 123456,
  },
  'shhhh',
  { algorithm: 'HS256' },
  (err, token) => {
    console.log(`Token::::`, token);
  },
);

// header
// {
//   typ: 'JWT';
//   alg: 'HS256';
// }

// payload
// {
//     userId: '123456',
//     name: 'anhtaidang'
// }

// data =  base64urlEncode(header) + '.' + base64urlEncode(payload)

// token =  Hash(data, secret)
