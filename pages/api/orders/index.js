import Orders from "../../../models/Orders";
import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
    const { method } = req;

    await dbConnect();

    if (method === "GET") {
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