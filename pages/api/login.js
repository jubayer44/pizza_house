import cookie from "cookie";

const handlers = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { userName, password } = req.body;
    console.log(process.env.USER);
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

export default handlers;
