import dbConnect from "../../../util/mongo";
import Products from "../../../models/Products";

export default async function handler(req, res) {
    const { method, query: {id}, cookies} = req;
    const token = cookies.token;
  
    console.log(id);
    
  
    dbConnect();
  
    
  if (method === "GET") {
    try {
      const product = await Products.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  };


  if (method === "DELETE") {
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not authenticated!")
    }

    try {
      const products = await Products.findByIdAndDelete(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  };

};