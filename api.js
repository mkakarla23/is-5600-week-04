const path = require('path')
const products = require('./products')
const autoCatch = require('./lib/auto-catch')


/** 
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
 function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }

  /**
   * List all products
   * @param {object} req
   * @param {object} res
   */
  async function listProducts(req, res) {

    const { offset = 0, limit = 25, tag } = req.query;


    try {
       res.json(await products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      }))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
   }

  async function getProduct (req, res, next) {

    const { id } = req.params;

    try{
      const product = await products.get(id)
      if(!product){
        return next()

      }
      return res.json(product)

    } catch (err) {
        res.status(500).json({error: err.message})

    }


  }

  async function createProduct (req, res) {
    console.log('request body:', req.body)
    res.json(req.body)
  }



   module.exports = autoCatch ({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
   });