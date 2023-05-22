import cookie from "cookie";
// import NextCors from 'nextjs-cors';

const handlers = async (req, res) => {
  const { method } = req;

//   await NextCors(req, res, {
//     // Options
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     origin: '*',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//  });

//  // Rest of the API logic
//  res.json({ message: 'Hello NextJs Cors!' });




  if (method === "POST") {
    const { userName, password } = req.body;
    console.log("userName", userName, "password", password);
    console.log("env", process.env.USER, "password", process.env.PASSWORD);

    if (
        userName === process.env.USER &&
      password === process.env.PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("SuccessFull");
    }
    else {
        res.status(400).json("Wrong Credentials!");
      }
  }
};

export default (handlers);
