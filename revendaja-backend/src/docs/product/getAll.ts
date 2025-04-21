/**
 * @swagger
 * /products/getall:
 *   get:
 *     summary: Retorna uma lista paginada de produtos
 *     tags: [Produto]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página atual
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Malbec"
 *         description: Termo de busca (nome do produto, marca etc.)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           example: "categoria=Natura"
 *         description: Filtro aplicado (pode variar conforme o backend aceitar)
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *       400:
 *         description: Parâmetros inválidos
 */
