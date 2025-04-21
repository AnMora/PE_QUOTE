// import { getCollection } from "@/lib/db";

// export default async function handler(req, res) {
//   const collection = await getCollection('inputs'); // Cambia 'insumos' por el nombre de tu colección
//   if (req.method === 'GET') {
//     try {
//       const insumos = await collection.find({}).toArray();
//       res.status(200).json(insumos);
//     } catch (error) {
//       res.status(500).json({ error: 'Error al obtener insumos' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const nuevoInsumo = req.body;
//       const result = await collection.insertOne(nuevoInsumo);
//       res.status(201).json(result.ops[0]);
//     } catch (error) {
//       res.status(500).json({ error: 'Error al agregar insumo' });
//     }
//   } else if (req.method === 'DELETE') {
//     const { id } = req.query;
//     try {
//       await collection.deleteOne({ _id: new ObjectId(id) });
//       res.status(204).end();
//     } catch (error) {
//       res.status(500).json({ error: 'Error al eliminar insumo' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
//     res.status(405).end(`Método ${req.method} no permitido`);
//   }
// }