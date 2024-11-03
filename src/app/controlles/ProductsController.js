import * as yup from 'yup';
import Products from '../models/products';

class ProductsController {
    async store(request, response) {
        const schema = yup.object({
            name: yup.string().required(),
            price: yup.number().required(),
            category: yup.string().required()
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({ error: error.errors });
        }

        const { filename: path } = request.file;
        const { name, price, category } = request.body;

        const products = await Products.create({
            name,
            price,
            category,
            path,
        })



        return response.status(201).json(products);
    }

    async index(request, response) {
        const products = await Products.findAll();

        return response.json(products);
    }
}

export default new ProductsController();