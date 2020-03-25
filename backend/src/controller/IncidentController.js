const connection = require('../database/connection');


module.exports = {
  
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    const [id] = await connection('incidents').insert({ ong_id, title, description, value });
    return res.json({ id })
  },
  async index(req, res) {
    const { page = 1 } = req.query;
    const countCases = await connection('incidents').count();
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)//esquema de paginação
      .offset((page - 1) * 5)//
      .select('incidents.*', 'ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf');

    res.header('x-total-count', countCases[0]['count(*)'])
    return res.json(incidents);
  },
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not authorized' });
    }
    await connection('incidents').where('id', id).delete();
    return res.status(204).send();
  }
}