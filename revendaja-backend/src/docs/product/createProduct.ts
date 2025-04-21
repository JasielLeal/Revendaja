/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Criação de um produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - normalPrice
 *               - suggestedPrice
 *               - barcode
 *               - brand
 *               - category
 *               - company
 *               - image
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Malbec X
 *               normalPrice:
 *                 type: string
 *                 example: 123456
 *               suggestedPrice:
 *                 type: string
 *                 example: 123456
 *               barcode:
 *                 type: string
 *                 example: 12345632345
 *               brand:
 *                 type: string
 *                 example: Natura
 *               category:
 *                type: string
 *                example: Maquiagem
 *               company:
 *                type: string
 *                example: Natura
 *               image:
 *                type: string
 *                format: binary
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
