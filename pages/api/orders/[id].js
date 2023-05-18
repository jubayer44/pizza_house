import Orders from "../../../models/Orders";
import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
    const { method, query: {id}, cookies } = req;
    const token = cookies.token;

    await dbConnect();

    if (method === "GET") {
      
        try {
          const order = await Orders.findById(id);
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    if (method === "PUT") {
      if(!token || token !== process.env.TOKEN){
        return res.status(401).json("Not authenticated!")
      }
        try {
          const order = await Orders.findByIdAndUpdate(id, req.body, {new: true});
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
};

export default handler;