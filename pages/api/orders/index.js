import Orders from "../../../models/Orders";
import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
    const { method, cookies } = req;
    const token = cookies.token;

    await dbConnect();

    if (method === "GET") {
      // if(!token || token !== process.env.TOKEN){
      //   return res.status(401).json("Not authenticated!")
      // }
        try {
          const order = await Orders.find();
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    if (method === "POST") {
        try {
          const order = await Orders.create(req.body);
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
};

export default handler;